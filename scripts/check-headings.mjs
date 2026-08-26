#!/usr/bin/env node
/**
 * Heading hierarchy guard (prompt 11 F, acceptance 9).
 *
 * Runs against the built HTML in .next/server/app after a production build, and
 * fails if any prerendered page emits more than one h1 or skips a heading level
 * (for example an h2 followed directly by an h4). Correct heading order is both
 * an accessibility requirement and an SEO one, so a regression should break the
 * build rather than ship.
 *
 * Dynamic routes that are not prerendered to HTML are not covered here; those are
 * checked in the browser during QA.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const BUILD_DIR = join(ROOT, '.next', 'server', 'app')

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

function headingsOf(html) {
  const matches = [...html.matchAll(/<h([1-6])\b/gi)]
  return matches.map((m) => Number(m[1]))
}

const files = walk(BUILD_DIR, [])
if (files.length === 0) {
  console.error('check-headings: no built HTML found. Run "next build" first.')
  process.exit(1)
}

const problems = []
for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const levels = headingsOf(html)
  const rel = relative(ROOT, file)

  const h1s = levels.filter((l) => l === 1).length
  if (h1s !== 1) {
    problems.push(`${rel}: expected exactly one h1, found ${h1s}`)
  }

  // No skipped levels: each heading may go one deeper than the deepest seen, and
  // any depth back up to the top is fine.
  let deepest = 0
  for (const level of levels) {
    if (deepest > 0 && level > deepest + 1) {
      problems.push(`${rel}: heading level jumps from h${deepest} to h${level} (skipped a level)`)
      break
    }
    deepest = Math.max(deepest, level)
  }
}

if (problems.length) {
  console.error(`check-headings: ${problems.length} problem(s) found:`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}

console.log(`check-headings: clean across ${files.length} prerendered pages.`)
