/**
 * Opening-hours logic. A pure calculator so it can be unit-reasoned and reused,
 * driven entirely by the hours in lib/site. Nothing kills a call more reliably
 * than not knowing whether anyone will answer, so every call route can show a
 * live open or closed state computed from this.
 */
import { SITE } from '@/lib/site'

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

function toMinutes(hhmm: string): number {
  const parts = hhmm.split(':')
  return Number(parts[0] ?? 0) * 60 + Number(parts[1] ?? 0)
}

/** "09:00" to "9am", "17:30" to "5:30pm". */
export function formatTime(hhmm: string): string {
  const parts = hhmm.split(':')
  const h = Number(parts[0] ?? 0)
  const m = Number(parts[1] ?? 0)
  const period = h >= 12 ? 'pm' : 'am'
  const h12 = ((h + 11) % 12) + 1
  return m === 0 ? `${h12}${period}` : `${h12}:${String(m).padStart(2, '0')}${period}`
}

export interface OpenState {
  open: boolean
  label: string
}

/** Compute the open or closed state and the next transition, for a given time. */
export function computeOpenState(now: Date, hours = SITE.openingHours): OpenState {
  const dow = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  const today = hours.find((h) => h.day === DAYS[dow])

  if (today && today.open && today.close) {
    const o = toMinutes(today.open)
    const c = toMinutes(today.close)
    if (mins >= o && mins < c) return { open: true, label: `Open now until ${formatTime(today.close)}` }
    if (mins < o) return { open: false, label: `Opens today at ${formatTime(today.open)}` }
  }

  for (let i = 1; i <= 7; i++) {
    const day = DAYS[(dow + i) % 7]
    const h = hours.find((x) => x.day === day)
    if (h && h.open && h.close) {
      const when = i === 1 ? 'tomorrow' : day
      return { open: false, label: `Closed, opens ${when} at ${formatTime(h.open)}` }
    }
  }
  return { open: false, label: 'Closed' }
}
