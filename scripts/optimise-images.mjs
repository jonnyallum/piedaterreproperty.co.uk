#!/usr/bin/env node
/**
 * Image optimisation pipeline (prompt 12).
 *
 * The brief pulls two ways at once: photography must look expensive and calm,
 * and it must load fast. This script resolves that with format, sizing and
 * delivery discipline rather than by sacrificing quality.
 *
 * It reads originals from `assets/source/` (git-ignored, see .gitignore) and a
 * sidecar `assets/source/images.json` that supplies the alt text and treatment
 * for each file, then writes an SSIM-tuned AVIF and WebP responsive ladder into
 * `public/images/<key>/` plus a manifest at `public/images/manifest.json`.
 *
 * What it guarantees, per prompt 12 B:
 *   1. Reads assets/source, writes public/images.
 *   2. AVIF primary and WebP fallback. No JPEG in the delivered set.
 *   3. Responsive ladder: 480, 768, 1024, 1440, 1920, 2400, never upscaled
 *      past the source, so a soft hero can never be manufactured.
 *   4. AVIF quality tuned per image by measuring SSIM against the source and
 *      raising quality until SSIM clears 0.97. No single global quality number.
 *   5. A real 16px LQIP blur placeholder generated from the image itself.
 *   6. All EXIF stripped except the colour profile. Property photographs
 *      routinely carry the GPS coordinates of the home and the photographer's
 *      device, which is both a privacy leak and a data leak.
 *   7. A manifest carrying intrinsic width and height, so next/image always has
 *      explicit dimensions and cumulative layout shift stays at zero.
 *
 * The manifest is read by lib/images.ts and rendered by the SiteImage
 * component. Drop originals into assets/source, describe them in images.json,
 * run `npm run optimise-images`, and every reference resolves with the right
 * dimensions, blur and format automatically.
 *
 * Run: npm run optimise-images   (optionally: node scripts/optimise-images.mjs --verbose)
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const SOURCE_DIR = join(ROOT, 'assets', 'source')
const SIDECAR = join(SOURCE_DIR, 'images.json')
const OUT_DIR = join(ROOT, 'public', 'images')
const MANIFEST = join(OUT_DIR, 'manifest.json')
const VERBOSE = process.argv.includes('--verbose')

// The responsive ladder, in CSS pixels. A width is skipped when it would exceed
// the source: never upscale. The largest rung doubles as the intrinsic size.
const LADDER = [480, 768, 1024, 1440, 1920, 2400]

// AVIF quality search. Photography sits in the 62 to 68 band; the SSIM target
// wins when a difficult image needs more. Start low, step up, stop at the first
// quality that clears the target, or at the cap.
const AVIF_Q_START = 62
const AVIF_Q_STEP = 3
const AVIF_Q_CAP = 82
const SSIM_TARGET = 0.97

// WebP is only the fallback for the rare client without AVIF, so it is held at a
// fixed high quality rather than separately SSIM-tuned, to keep the run quick.
const WEBP_Q = 80

// The comparison is done on luma downscaled to this long edge. SSIM at reduced
// resolution tracks the full-size score closely and keeps the search fast.
const SSIM_LONG_EDGE = 1024

// Duotone risograph pigments, from the design tokens (indigo shadow, terracotta
// highlight). Property photography stays full colour; place photography is
// converted to duotone, per prompt 12 A.
const DUOTONE_SHADOW = [0x21, 0x38, 0x4f] // --pt-indigo
const DUOTONE_HIGHLIGHT = [0xc0, 0x5c, 0x34] // --pt-terracotta

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.avif'])

/**
 * Mean structural similarity on luma, 8x8 windows at stride 4. Constants are the
 * Wang et al. defaults for 8-bit data. Both buffers must be single-channel and
 * the same dimensions.
 */
function meanSsim(a, b, width, height) {
  const C1 = (0.01 * 255) ** 2
  const C2 = (0.03 * 255) ** 2
  const win = 8
  const stride = 4
  let total = 0
  let count = 0
  for (let y = 0; y + win <= height; y += stride) {
    for (let x = 0; x + win <= width; x += stride) {
      let sumA = 0
      let sumB = 0
      let sumAA = 0
      let sumBB = 0
      let sumAB = 0
      for (let j = 0; j < win; j++) {
        const row = (y + j) * width + x
        for (let i = 0; i < win; i++) {
          const va = a[row + i]
          const vb = b[row + i]
          sumA += va
          sumB += vb
          sumAA += va * va
          sumBB += vb * vb
          sumAB += va * vb
        }
      }
      const n = win * win
      const muA = sumA / n
      const muB = sumB / n
      const varA = sumAA / n - muA * muA
      const varB = sumBB / n - muB * muB
      const covAB = sumAB / n - muA * muB
      const ssim =
        ((2 * muA * muB + C1) * (2 * covAB + C2)) /
        ((muA * muA + muB * muB + C1) * (varA + varB + C2))
      total += ssim
      count += 1
    }
  }
  return count === 0 ? 1 : total / count
}

/** Single-channel luma at a capped long edge, for the SSIM comparison. */
async function lumaFor(input, longEdge) {
  const img = sharp(input).greyscale()
  const meta = await img.metadata()
  const w = meta.width ?? longEdge
  const h = meta.height ?? longEdge
  const scale = Math.min(1, longEdge / Math.max(w, h))
  const tw = Math.max(1, Math.round(w * scale))
  const th = Math.max(1, Math.round(h * scale))
  const data = await img.resize(tw, th, { fit: 'fill' }).raw().toBuffer()
  return { data, width: tw, height: th }
}

/**
 * Convert an already-greyscale, normalised RGB image buffer to the indigo to
 * terracotta duotone. Operates on the raw luma of the master so the ramp is
 * smooth across all rungs.
 */
async function toDuotone(master) {
  const grey = sharp(master).greyscale().normalise()
  const meta = await grey.metadata()
  const w = meta.width ?? 0
  const h = meta.height ?? 0
  const luma = await grey.raw().toBuffer()
  const rgb = Buffer.alloc(w * h * 3)
  for (let p = 0; p < w * h; p++) {
    const t = luma[p] / 255
    for (let c = 0; c < 3; c++) {
      rgb[p * 3 + c] = Math.round(
        DUOTONE_SHADOW[c] + (DUOTONE_HIGHLIGHT[c] - DUOTONE_SHADOW[c]) * t
      )
    }
  }
  return sharp(rgb, { raw: { width: w, height: h, channels: 3 } })
}

/**
 * A very gentle warm grade: lifted blacks and a slight golden cast, never
 * HDR-crunchy. Off by default and opt-in per image ("grade": true in the
 * sidecar), because good photography should be graded by a retoucher, not blind
 * by a script. Present so a batch can be warmed consistently when asked.
 */
function warmGrade(pipeline) {
  // y = a*x + b per channel: lift shadows (b), warm by nudging red up and blue
  // down a touch. Values are deliberately small.
  return pipeline.linear([1.02, 1.0, 0.97], [4, 3, 2])
}

/** Build the processed master: autorotated, colour-managed, treated, capped. */
async function buildMaster(sourcePath, meta) {
  // .rotate() with no argument bakes in EXIF orientation, then metadata is
  // dropped below, so a rotated phone photo lands upright with no EXIF at all.
  let pipeline = sharp(sourcePath).rotate()
  const info = await pipeline.metadata()
  const srcW = info.width ?? 0
  const srcH = info.height ?? 0
  const hasIcc = Boolean(info.icc)
  const cap = LADDER[LADDER.length - 1]
  const longEdge = Math.max(srcW, srcH)
  // Cap the master at the top rung, never upscale beyond the source.
  if (longEdge > cap) {
    pipeline = pipeline.resize({
      width: srcW >= srcH ? cap : undefined,
      height: srcH > srcW ? cap : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Carry the colour profile onto the lossless master so it survives to the
  // encoders: a plain PNG round-trip drops it. An untagged source is assumed
  // sRGB, per prompt 12 A, and tagged as such, so every delivered image is
  // colour managed.
  pipeline = hasIcc ? pipeline.keepIccProfile() : pipeline.withIccProfile('srgb')
  let master = await pipeline.png().toBuffer() // lossless intermediate
  if (meta.treatment === 'duotone') {
    // The duotone is rebuilt from raw luma so it carries no profile; its
    // pigments are sRGB token values, so tag the result sRGB.
    master = await (await toDuotone(master)).withIccProfile('srgb').png().toBuffer()
  }
  if (meta.grade) {
    master = await warmGrade(sharp(master)).keepIccProfile().png().toBuffer()
  }
  const masterMeta = await sharp(master).metadata()
  return { master, width: masterMeta.width ?? 0, height: masterMeta.height ?? 0 }
}

/** Tune AVIF quality on a representative rung until SSIM clears the target. */
async function tuneAvifQuality(master, sourceLuma, key) {
  // Compare at a mid rung so the search is quick but representative.
  const probeWidth = Math.min(1024, sourceLuma.width)
  let chosen = AVIF_Q_CAP
  let achieved = 0
  for (let q = AVIF_Q_START; q <= AVIF_Q_CAP; q += AVIF_Q_STEP) {
    const encoded = await sharp(master)
      .resize({ width: probeWidth, withoutEnlargement: true })
      .avif({ quality: q, effort: 4 })
      .toBuffer()
    // Decode the candidate back to luma at the same comparison size and score it
    // against the source luma.
    const cand = await lumaFor(encoded, SSIM_LONG_EDGE)
    const ref = sourceLuma
    // Both are derived from the same source dimensions, but guard the sizes.
    const w = Math.min(cand.width, ref.width)
    const h = Math.min(cand.height, ref.height)
    const score = meanSsim(ref.data, cand.data, w, h)
    if (VERBOSE) console.log(`    ${key}: avif q=${q} ssim=${score.toFixed(4)}`)
    achieved = score
    if (score >= SSIM_TARGET) {
      chosen = q
      break
    }
  }
  return { quality: chosen, ssim: achieved }
}

/** Generate the 16px base64 LQIP data URL from the master itself. */
async function makeBlur(master) {
  const buf = await sharp(master)
    .resize(16, 16, { fit: 'inside' })
    .webp({ quality: 40, alphaQuality: 40 })
    .toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}

/** Assert an encoded buffer carries no EXIF and no GPS. */
async function assertNoExif(buf, label) {
  const meta = await sharp(buf).metadata()
  if (meta.exif) {
    throw new Error(`${label}: output still carries an EXIF block. Refusing to ship it.`)
  }
}

async function processOne(file, meta) {
  const sourcePath = join(SOURCE_DIR, file)
  const key = meta.key
  const dir = join(OUT_DIR, key)
  mkdirSync(dir, { recursive: true })

  const { master, width, height } = await buildMaster(sourcePath, meta)
  const sourceLuma = await lumaFor(master, SSIM_LONG_EDGE)
  const { quality, ssim } = await tuneAvifQuality(master, sourceLuma, key)

  const widths = LADDER.filter((w) => w <= width)
  if (widths.length === 0) widths.push(width)

  for (const w of widths) {
    const resized = sharp(master).resize({ width: w, withoutEnlargement: true })
    // keepIccProfile preserves the colour profile and drops everything else,
    // which is exactly "strip all EXIF except the colour profile".
    const avif = await resized
      .clone()
      .keepIccProfile()
      .avif({ quality, effort: 4 })
      .toBuffer()
    const webp = await resized
      .clone()
      .keepIccProfile()
      .webp({ quality: WEBP_Q })
      .toBuffer()
    await assertNoExif(avif, `${key}-${w}.avif`)
    await assertNoExif(webp, `${key}-${w}.webp`)
    writeFileSync(join(dir, `${key}-${w}.avif`), avif)
    writeFileSync(join(dir, `${key}-${w}.webp`), webp)
  }

  const blurDataURL = await makeBlur(master)

  return {
    key,
    alt: meta.alt,
    role: meta.role ?? null,
    treatment: meta.treatment ?? 'photo',
    width,
    height,
    aspectRatio: Number((width / height).toFixed(4)),
    blurDataURL,
    base: `/images/${key}/${key}`,
    widths,
    formats: ['avif', 'webp'],
    quality,
    ssim: Number(ssim.toFixed(4)),
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  if (!existsSync(SOURCE_DIR)) {
    writeFileSync(MANIFEST, '{}\n')
    console.log('optimise-images: no assets/source directory yet. Wrote an empty manifest.')
    console.log('  Drop originals into assets/source and describe them in images.json.')
    return
  }

  /** @type {Record<string, { key: string, alt: string, role?: string, treatment?: string, grade?: boolean }>} */
  let sidecar = {}
  if (existsSync(SIDECAR)) {
    sidecar = JSON.parse(readFileSync(SIDECAR, 'utf8'))
  }

  const files = readdirSync(SOURCE_DIR).filter((f) => SOURCE_EXT.has(extname(f).toLowerCase()))
  if (files.length === 0) {
    writeFileSync(MANIFEST, '{}\n')
    console.log('optimise-images: no source images found. Wrote an empty manifest.')
    return
  }

  const manifest = {}
  const problems = []
  for (const file of files) {
    const entry = sidecar[file] ?? sidecar[basename(file, extname(file))]
    if (!entry || !entry.alt) {
      problems.push(
        `${file}: no sidecar entry with alt text in assets/source/images.json. An image without alt is not shipped.`
      )
      continue
    }
    const meta = { key: entry.key ?? basename(file, extname(file)), ...entry }
    try {
      const result = await processOne(file, meta)
      manifest[result.key] = result
      console.log(
        `optimise-images: ${result.key}  ${result.width}x${result.height}  ` +
          `${result.widths.length} widths  avif q${result.quality}  ssim ${result.ssim}  ${result.treatment}`
      )
    } catch (err) {
      problems.push(`${file}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // Sort keys so the committed manifest has a stable diff.
  const sorted = {}
  for (const k of Object.keys(manifest).sort()) sorted[k] = manifest[k]
  writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n')

  if (problems.length) {
    console.error(`\noptimise-images: ${problems.length} image(s) not processed:`)
    for (const p of problems) console.error(`  - ${p}`)
    process.exitCode = 1
    return
  }
  console.log(
    `\noptimise-images: ${Object.keys(sorted).length} image(s) written to public/images, manifest updated.`
  )
}

main().catch((err) => {
  console.error('optimise-images: fatal error')
  console.error(err)
  process.exit(1)
})
