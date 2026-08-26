#!/usr/bin/env node
/**
 * Unconfirmed-marker guard (prompt 15 A).
 *
 * The content loaders already refuse to render a string that carries an
 * unconfirmed-figure marker, so a page cannot ship one. This is the belt and
 * braces: it scans the built HTML and fails if the literal marker reached a
 * published page, in case a future page renders text through a path that does
 * not go via a guarded loader. Runs after a production build, like
 * check-headings.
 *
 * The marker is assembled from pieces so this script never trips a scan of its
 * own source.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const BUILD_DIR = join(ROOT, '.next', 'server', 'app')
const MARKER = '[' + 'CONFIRM' + ']'

function walk(dir, out) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const name of entries) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (name.endsWith('.html')) out.push(full)
  }
  return out
}

const files = walk(BUILD_DIR, [])
if (files.length === 0) {
  console.error('check-confirm: no built HTML found. Run "next build" first.')
  process.exit(1)
}

const hits = []
for (const file of files) {
  const html = readFileSync(file, 'utf8')
  if (html.includes(MARKER)) hits.push(relative(ROOT, file))
}

if (hits.length) {
  console.error(`check-confirm: ${hits.length} page(s) shipped an unconfirmed marker:`)
  for (const h of hits) console.error(`  - ${h}`)
  process.exit(1)
}

console.log(`check-confirm: clean across ${files.length} prerendered pages.`)
