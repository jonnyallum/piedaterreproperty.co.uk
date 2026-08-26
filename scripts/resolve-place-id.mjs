#!/usr/bin/env node
/**
 * Resolve the Google Place ID for the reviews rail.
 *
 * The app reads GOOGLE_PLACE_ID (a ChIJ... id) and calls the legacy Places
 * Details API. A ChIJ id is not a secret, but it has to be looked up once. This
 * reads GOOGLE_PLACES_API_KEY from .env.local, asks the legacy Find Place From
 * Text endpoint for the business, and prints the candidate place ids plus a
 * ready-to-append env line. It never prints the key.
 *
 * Run from the repo root after the key is in .env.local:
 *   node scripts/resolve-place-id.mjs
 * Then paste the printed GOOGLE_PLACE_ID line into .env.local and restart.
 *
 * The endpoint used matches lib/reviews.ts (legacy Places API), so if this
 * resolves, the reviews rail will work with the same key and API enablement.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Repo root, so .env.local resolves regardless of the shell's working directory.
const ENV_LOCAL = join(dirname(fileURLToPath(import.meta.url)), '..', '.env.local')

// The business, from the handover. Public facts, safe to hardcode.
const QUERY = 'Pied-a-terre Property Portchester'
const BIAS = 'point:50.8619771,-0.9676462' // near the Business Profile pin

function readKeyFromEnvLocal() {
  let text
  try {
    text = readFileSync(ENV_LOCAL, 'utf8')
  } catch {
    console.error('resolve-place-id: .env.local not found. Wire GOOGLE_PLACES_API_KEY first.')
    process.exit(1)
  }
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (trimmed.startsWith('#') || !trimmed.includes('=')) continue
    const [k, ...rest] = trimmed.split('=')
    if (k.trim() === 'GOOGLE_PLACES_API_KEY') {
      return rest.join('=').trim().replace(/^['"]|['"]$/g, '')
    }
  }
  console.error('resolve-place-id: GOOGLE_PLACES_API_KEY not set in .env.local.')
  process.exit(1)
}

async function main() {
  const key = readKeyFromEnvLocal()
  if (!key) {
    console.error('resolve-place-id: GOOGLE_PLACES_API_KEY is empty.')
    process.exit(1)
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json')
  url.searchParams.set('input', QUERY)
  url.searchParams.set('inputtype', 'textquery')
  url.searchParams.set('fields', 'place_id,name,formatted_address')
  url.searchParams.set('locationbias', BIAS)
  url.searchParams.set('key', key)

  const res = await fetch(url)
  const data = await res.json()

  if (data.status === 'REQUEST_DENIED') {
    console.error(
      'resolve-place-id: REQUEST_DENIED. Enable the legacy "Places API" and billing on the key, then retry.'
    )
    console.error('  Google message: ' + (data.error_message ?? '(none)'))
    process.exit(2)
  }
  if (data.status !== 'OK' || !data.candidates?.length) {
    console.error('resolve-place-id: no match (status ' + data.status + ').')
    console.error('  Try editing QUERY at the top of this script, or use the Place ID Finder.')
    process.exit(2)
  }

  console.log('Candidate(s) found:\n')
  for (const c of data.candidates) {
    console.log('  place_id:  ' + c.place_id)
    console.log('  name:      ' + (c.name ?? '(none)'))
    console.log('  address:   ' + (c.formatted_address ?? '(none)'))
    console.log('')
  }
  const best = data.candidates[0]
  console.log('If the first candidate is the right business, append this line to .env.local:\n')
  console.log('GOOGLE_PLACE_ID=' + best.place_id)
}

main().catch((err) => {
  console.error('resolve-place-id: request failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
