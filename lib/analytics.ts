/**
 * Typed analytics events. GA4 is loaded and gated behind cookie consent in
 * prompt 11; until a consented GA4 tag exists, these calls are safe no-ops.
 * Components import the typed helpers so event names never drift.
 */

export type AnalyticsEvent =
  | 'valuation_start'
  | 'valuation_step'
  | 'valuation_submit'
  | 'lead_submit'
  | 'call_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'property_enquiry'
  | 'search_submit'
  | 'nav_cta_click'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Push a typed event. No-ops on the server and before consent grants gtag. */
export function track(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params })
  }
}
