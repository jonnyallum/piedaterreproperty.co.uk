#!/usr/bin/env node
/**
 * Extended hyphen guard.
 *
 * Fails the build if any of these codepoints appear in the source:
 *   U+2012 figure dash
 *   U+2013 en dash
 *   U+2014 em dash
 *   U+2015 horizontal bar
 *
 * The house style forbids all four. Rewrite the sentence, or use a comma, a
 * colon, a full stop, brackets, or the word "to" for ranges.
 *
 * The banned codepoints are referenced numerically below so this script does
 * not trip on its own source. Box drawing characters (U+2500 and up) are not
 * dashes and are deliberately not matched.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOT = process.cwd()
const SCAN_DIRS = ['app', 'components', 'content', 'lib']
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.json', '.md'])

// Build the banned set by codepoint so the literal glyphs never enter this file.
const BANNED = new Map([
  [0x2012, 'U+2012 figure dash'],
  [0x2013, 'U+2013 en dash'],
  [0x2014, 'U+2014 em dash'],
  [0x2015, 'U+2015 horizontal bar'],
])

/** @param {string} dir @param {string[]} out */
function walk(dir, out) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next' || entry === '.git') continue
    const full = join(dir, entry)
    const s = statSync(full)
    if (s.isDirectory()) walk(full, out)
    else if (SCAN_EXT.has(extname(full))) out.push(full)
  }
  return out
}

const files = []
for (const d of SCAN_DIRS) walk(join(ROOT, d), files)
// Also scan any markdown in the repo root.
for (const entry of readdirSync(ROOT)) {
  if (extname(entry) === '.md') files.push(join(ROOT, entry))
}

let hits = 0
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    for (let c = 0; c < line.length; c++) {
      const code = line.codePointAt(c)
      if (BANNED.has(code)) {
        hits++
        const rel = file.replace(ROOT + '\\', '').replace(ROOT + '/', '')
        console.error(`${rel}:${i + 1}  ${BANNED.get(code)}  ->  ${line.trim()}`)
      }
    }
  }
}

if (hits > 0) {
  console.error(`\ncheck-dashes: found ${hits} extended hyphen(s). Build blocked.`)
  process.exit(1)
}
console.log(`check-dashes: clean across ${files.length} files.`)
