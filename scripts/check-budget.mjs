#!/usr/bin/env node
/**
 * JavaScript budget guard (prompt 12 E, and the master gate "initial JS shipped,
 * home page, under 120KB gzipped").
 *
 * Runs against the app build manifest after a production build and fails if a
 * budgeted route ships more first-load JavaScript than its ceiling. This turns
 * the budget from a number in a document into something a regression breaks.
 *
 * Measure: the gzipped size of every JavaScript file a route loads on first
 * paint, summed. Each chunk is a separate HTTP response compressed on its own,
 * so the per-file gzip sum is a faithful estimate of the bytes on the wire.
 * gzip uses zlib's default level; the figure is reproducible from this script.
 *
 * Only the two routes the brief constrains are enforced. Every other route is
 * printed for information so a creeping regression is visible before it matters.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const ROOT = process.cwd()
const MANIFEST = join(ROOT, '.next', 'app-build-manifest.json')

// Ceilings in kilobytes of gzipped first-load JS, keyed by manifest route.
const BUDGETS = new Map([
  ['/page', 120], // home
  ['/properties/[slug]/page', 140], // property detail
])

let manifest
try {
  manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
} catch {
  console.error('check-budget: no .next/app-build-manifest.json. Run "next build" first.')
  process.exit(1)
}

const KB = 1024

function sizesFor(files) {
  let raw = 0
  let gz = 0
  for (const file of files) {
    const full = join(ROOT, '.next', file)
    try {
      const buf = readFileSync(full)
      raw += buf.length
      gz += gzipSync(buf).length
    } catch {
      // A referenced chunk missing on disk means a broken build; count it as
      // zero and let the build output surface the real error.
    }
  }
  return { raw, gz }
}

/** Readable label from a manifest key like "/properties/[slug]/page". */
function label(key) {
  return key.replace(/\/(page|route)$/, '') || '/'
}

const rows = []
for (const [key, files] of Object.entries(manifest.pages)) {
  if (!Array.isArray(files)) continue
  // Only navigable pages ship first-load JS to a browser. Route handlers (api,
  // sitemap, robots, opengraph-image) and the shared layout do not.
  if (!key.endsWith('/page')) continue
  const { raw, gz } = sizesFor(files)
  const budget = BUDGETS.get(key)
  rows.push({ key, label: label(key), raw, gz, budget })
}

// Heaviest first, so the report leads with what matters.
rows.sort((a, b) => b.gz - a.gz)

let failed = 0
console.log('check-budget: first-load JS per route (gzipped)\n')
for (const r of rows) {
  const gzKb = (r.gz / KB).toFixed(1)
  const rawKb = (r.raw / KB).toFixed(1)
  let note = ''
  if (r.budget != null) {
    const over = r.gz / KB > r.budget
    note = over ? `  OVER budget ${r.budget}kB` : `  within budget ${r.budget}kB`
    if (over) failed++
  }
  console.log(
    `  ${r.label.padEnd(34)} ${gzKb.padStart(7)}kB gzip  (${rawKb.padStart(7)}kB raw)${note}`
  )
}

if (failed > 0) {
  console.error(`\ncheck-budget: ${failed} route(s) over budget. Build blocked.`)
  process.exit(1)
}
console.log('\ncheck-budget: all budgeted routes within their ceiling.')
