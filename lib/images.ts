/**
 * Typed reader over the image manifest that `scripts/optimise-images.mjs`
 * writes to `public/images/manifest.json`. It is the single source of intrinsic
 * dimensions, blur placeholders and the responsive ladder, so any image the site
 * renders through the SiteImage component always has explicit width and height
 * and cumulative layout shift stays at zero (prompt 12 B, item 7).
 *
 * The manifest is empty until real photography is processed. Every lookup
 * returns undefined for an unknown key, so a page can render an honest fallback
 * (a gradient scene, a placeholder) rather than a broken image, exactly as the
 * site does today while it waits on the assets tracked in ASSET_REQUEST_LIST.
 */
import manifestJson from '@/public/images/manifest.json'

export interface ImageAsset {
  key: string
  alt: string
  role: string | null
  treatment: 'photo' | 'duotone'
  /** Intrinsic width and height of the largest rung, for the aspect box. */
  width: number
  height: number
  aspectRatio: number
  /** 16px base64 LQIP data URL, generated from the image itself. */
  blurDataURL: string
  /** URL stem, so a file is `${base}-${width}.${format}`. */
  base: string
  widths: number[]
  formats: string[]
  /** The AVIF quality the SSIM search settled on, kept for reporting. */
  quality: number
  ssim: number
}

// The imported JSON is `{}` until the pipeline runs; cast it to the resolved
// shape. With an empty manifest every lookup simply misses.
const manifest = manifestJson as Record<string, ImageAsset>

/** The asset for a key, or undefined if it has not been processed yet. */
export function getImage(key: string): ImageAsset | undefined {
  return manifest[key]
}

/** Whether a processed asset exists for a key. */
export function hasImage(key: string): boolean {
  return Object.prototype.hasOwnProperty.call(manifest, key)
}

/** A width-descriptor srcset for one format, for a <source srcSet>. */
export function srcSet(image: ImageAsset, format: 'avif' | 'webp'): string {
  return image.widths.map((w) => `${image.base}-${w}.${format} ${w}w`).join(', ')
}

/** The largest rung of a format, for the <img> element's own src. */
export function fallbackSrc(image: ImageAsset, format: 'avif' | 'webp' = 'webp'): string {
  const largest = image.widths[image.widths.length - 1] ?? image.width
  return `${image.base}-${largest}.${format}`
}
