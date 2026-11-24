// Measurement taxonomy check (mission T09). Compiles lib/measurement.ts with the
// repository's own TypeScript, then asserts the stage model, the key-event rule,
// the personal-data screen and the consent gate, each with a negative case. It also
// scans every track('...') call in the source so a new event or parameter cannot
// bypass the dictionary. Runs on Node 20 with no extra dependencies.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const source = readFileSync(join(root, 'lib/measurement.ts'), 'utf8')
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const m = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))

let failures = 0
function check(ok, message) {
  if (!ok) {
    failures++
    console.error('FAIL ' + message)
  }
}

const dict = m.EVENT_DICTIONARY
const events = Object.keys(dict)
const STAGES = ['view', 'engage', 'intent', 'lead', 'booking', 'service']

// 1. Stages: every event has a known stage; view, lead and booking are distinct and populated.
for (const e of events) check(STAGES.includes(dict[e].stage), `${e} has unknown stage ${dict[e].stage}`)
for (const s of ['view', 'lead', 'booking']) check(events.some((e) => dict[e].stage === s), `no event in stage ${s}`)
check(dict.property_view.stage === 'view', 'property_view is not view')
check(dict.enquiry_submit.stage === 'lead', 'enquiry_submit is not lead')
check(dict.valuation_submit.stage === 'booking', 'valuation_submit is not booking')
check(dict.maintenance_submit.stage === 'service', 'maintenance must not count as a lead')

// 2. Key events are exactly accepted leads and bookings. Intent clicks are not key events.
const expectedKeys = events.filter((e) => ['lead', 'booking'].includes(dict[e].stage)).sort()
check(JSON.stringify([...m.KEY_EVENTS].sort()) === JSON.stringify(expectedKeys), 'key events are not exactly lead and booking')
for (const e of ['call_click', 'whatsapp_click', 'email_click']) check(!m.KEY_EVENTS.includes(e), `${e} must not be a key event`)

// 3. Parameters: allow-listed per event, unknown ones dropped.
const extra = m.measure('enquiry_submit', { source: 'property_enquiry', property: 'let-west-street-fareham', name: 'Jane' })
check(extra.params.source === 'property_enquiry' && extra.params.property === 'let-west-street-fareham', 'allowed params were not kept')
check(!('name' in extra.params) && extra.dropped.includes('name'), 'an unlisted parameter was not dropped (negative case)')
check(m.measure('enquiry_submit', {}).stage === 'lead', 'stage not attached')

// 4. Personal data screen, each detector proven on a bad value (negative cases).
const pii = {
  email: 'jane@example.com',
  phone: '+44 7700 900123',
  phoneLocal: '023 9226 1234',
  postcode: 'PO7 5AB',
  postcodeTight: 'po75ab',
  long: 'x'.repeat(121),
}
for (const [kind, value] of Object.entries(pii)) {
  const r = m.measure('contact_submit', { source: value })
  check(!('source' in r.params), `${kind} value leaked through the screen`)
}
check(m.measure('contact_submit', { source: 'contact' }).params.source === 'contact', 'a clean value was wrongly dropped')
const withQuery = m.measure('valuation_submit', { path: '/sales?email=jane@example.com', source: 'hero' })
check(withQuery.params.path === '/sales', 'query string was not stripped from path')

// 5. Consent gate: only an explicit grant at the current version sends.
const v = 1
check(m.analyticsConsented(null, v) === false, 'no stored consent must not send')
check(m.analyticsConsented('not json', v) === false, 'malformed consent must not send')
check(m.analyticsConsented(JSON.stringify({ version: 1, analytics: false }), v) === false, 'declined consent must not send')
check(m.analyticsConsented(JSON.stringify({ version: 0, analytics: true }), v) === false, 'old-version consent must not send')
check(m.analyticsConsented(JSON.stringify({ version: 1, analytics: 'yes' }), v) === false, 'non-boolean grant must not send')
check(m.analyticsConsented(JSON.stringify({ version: 1, analytics: true }), v) === true, 'a real grant was refused')

// 6. Every track() call in the source names a dictionary event and only its allowed parameters.
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(name)) out.push(p)
  }
  return out
}
let calls = 0
for (const file of [...walk(join(root, 'app')), ...walk(join(root, 'components'))]) {
  const text = readFileSync(file, 'utf8')
  for (const match of text.matchAll(/track\(\s*(['"])([a-z0-9_]+)\1\s*(?:,\s*\{([^}]*)\})?/g)) {
    calls++
    const [, , event, body] = match
    if (!dict[event]) {
      check(false, `${file}: track('${event}') is not in the dictionary`)
      continue
    }
    // Keys only: the text before each colon, or a shorthand property such as `{ path }`.
    const names = (body ?? '')
      .split(',')
      .map((seg) => seg.split(':')[0].trim())
      .filter((k) => /^[A-Za-z_]+$/.test(k))
    for (const n of names) check(dict[event].params.includes(n), `${file}: ${event} sends unlisted parameter ${n}`)
  }
}
check(calls >= 15, `expected at least 15 track() calls in the source, found ${calls}`)

// 7. MEASUREMENT.md lists every event with the same stage and key-event flag as the code.
const doc = readFileSync(join(root, 'MEASUREMENT.md'), 'utf8')
const rows = new Map(
  [...doc.matchAll(/^\| `([a-z0-9_]+)` \| ([a-z]+) \| (yes|no) \|/gm)].map((r) => [r[1], { stage: r[2], key: r[3] === 'yes' }])
)
check(rows.size === events.length, `MEASUREMENT.md lists ${rows.size} events, the code has ${events.length}`)
for (const e of events) {
  const row = rows.get(e)
  check(row !== undefined && row.stage === dict[e].stage && row.key === dict[e].keyEvent, `MEASUREMENT.md disagrees with the code on ${e}`)
}

if (failures > 0) {
  console.error(`check-measurement: ${failures} failure(s)`)
  process.exit(1)
}
console.log(`check-measurement: ${events.length} events, ${calls} track() calls, all checks pass`)
