/**
 * Typed analytics events. GA4 is loaded with Consent Mode v2 in denied state and
 * only sends after consent (prompt 11 and 13); until then these calls are safe
 * no-ops. Components import the typed helpers so event names never drift, and no
 * string literal is ever fired from a component.
 *
 * Personal data is never a parameter here. Parameters carry context (path, step,
 * location, source), never a name, email, phone or address.
 */

export type AnalyticsEvent =
  // Valuation funnel
  | 'valuation_start'
  | 'valuation_step_2'
  | 'valuation_step_3'
  | 'valuation_submit'
  // Other lead submissions
  | 'enquiry_submit'
  | 'tenant_register_submit'
  | 'maintenance_submit'
  | 'contact_submit'
  // Human routes
  | 'call_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'nav_cta_click'
  // Discovery
  | 'property_view'
  | 'search_performed'
  | 'search_empty'
  | 'review_rail_engaged'
  | 'review_link_click'

/**
 * Events marked as GA4 conversions. Referenced by the analytics configuration in
 * prompt 11 so the list lives in one typed place, not in the GA console alone.
 */
export const CONVERSION_EVENTS: readonly AnalyticsEvent[] = [
  'valuation_submit',
  'enquiry_submit',
  'call_click',
  'whatsapp_click',
] as const

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
