#!/usr/bin/env node
/**
 * Token discipline guard.
 *
 * After the token layer exists, no hardcoded hex colour and no px value may
 * appear in application code. Colours and sizes resolve from CSS custom
 * properties in app/globals.css or from the typed mirror in lib/tokens.ts.
 *
 * Sanctioned homes for raw values (excluded from the scan):
 *   - app/globals.css        the single token definition file
 *   - lib/tokens.ts          the generated typed mirror for JavaScript
 *
 * Runtime-computed transforms such as `translateY(${offset}px)` are allowed
 * because no literal design digit precedes the unit.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const ROOT = process.cwd()
const SCAN_DIRS = ['app', 'components', 'lib']
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.css'])
const EXCLUDE_BASENAMES = new Set(['globals.css', 'tokens.ts'])

const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/
const PX = /[0-9]px\b/

/**
 * Strip comments so prose that merely mentions "px" or a hex value is not
 * flagged. Handles // line comments (but not the // in a URL scheme) and
 * /* block *​/ comments spanning lines. Returns the code-only text of a line.
 */
function stripComments(line, state) {
  let out = ''
  let i = 0
  while (i < line.length) {
    if (state.inBlock) {
      const end = line.indexOf('*/', i)
      if (end === -1) return out
      state.inBlock = false
      i = end + 2
      continue
    }
    if (line.startsWith('/*', i)) {
      state.inBlock = true
      i += 2
      continue
    }
    if (line.startsWith('//', i) && line[i - 1] !== ':') {
      return out
    }
    out += line[i]
    i += 1
  }
  return out
}

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
    else if (SCAN_EXT.has(extname(full)) && !EXCLUDE_BASENAMES.has(basename(full)))
      out.push(full)
  }
  return out
}

const files = []
for (const d of SCAN_DIRS) walk(join(ROOT, d), files)

let hits = 0
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  const state = { inBlock: false }
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const line = stripComments(raw, state)
    const rel = file.replace(ROOT + '\\', '').replace(ROOT + '/', '')
    if (HEX.test(line)) {
      hits++
      console.error(`${rel}:${i + 1}  hardcoded hex  ->  ${line.trim()}`)
    }
    if (PX.test(line)) {
      hits++
      console.error(`${rel}:${i + 1}  hardcoded px   ->  ${line.trim()}`)
    }
  }
}

if (hits > 0) {
  console.error(`\ncheck-tokens: found ${hits} hardcoded value(s) outside the token layer.`)
  process.exit(1)
}
console.log(`check-tokens: clean across ${files.length} files.`)
