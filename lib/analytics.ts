/**
 * Typed analytics events. The taxonomy, stages and parameter rules live in
 * lib/measurement.ts (mission T09); this file is the browser side.
 *
 * Consent-safe by construction: nothing is pushed until the visitor has granted
 * analytics consent at the current consent version. Consent Mode v2 alone would
 * still let a loaded tag send cookieless pings while consent is denied, so the
 * gate is here, before the tag ever sees an event.
 *
 * Personal data is never a parameter. Each event accepts only its allow-listed
 * parameters, and any value that looks like an email, phone number or postcode is
 * dropped before sending.
 */
import { CONSENT_VERSION, STORAGE_KEY } from '@/lib/consent'
import {
  EVENT_DICTIONARY,
  KEY_EVENTS,
  analyticsConsented,
  measure,
  type AnalyticsEvent,
  type EventParams,
  type MeasuredEvent,
} from '@/lib/measurement'

export type { AnalyticsEvent, MeasurementStage } from '@/lib/measurement'
export { EVENT_DICTIONARY }

/**
 * Events marked as GA4 key events. Only accepted leads and bookings: phone and
 * WhatsApp clicks are contact intent, not confirmed enquiries.
 */
export const CONVERSION_EVENTS: readonly AnalyticsEvent[] = KEY_EVENTS

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function consented(): boolean {
  try {
    return analyticsConsented(window.localStorage.getItem(STORAGE_KEY), CONSENT_VERSION)
  } catch {
    return false
  }
}

/**
 * Send a typed event with its stage. Returns what was sent, or null when nothing
 * was sent (server render, or no analytics consent).
 */
export function track(event: AnalyticsEvent, params: EventParams = {}): MeasuredEvent | null {
  if (typeof window === 'undefined') return null
  if (!consented()) return null
  const measured = measure(event, params)
  if (measured.dropped.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn(`analytics: dropped parameters from ${event}: ${measured.dropped.join(', ')}`)
  }
  const payload = { stage: measured.stage, ...measured.params }
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload)
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload })
  }
  return measured
}
