/**
 * Measurement taxonomy (Pied-à-Terre mission T09). Pure and self-contained, with no
 * imports, so scripts/check-measurement.mjs can compile and test it on its own.
 *
 * Every event belongs to exactly one stage, so reports can tell a property view from
 * contact intent, a lead from a booking, and a tenant's maintenance request from a
 * sales lead:
 *
 *   view     a visitor looked at a specific property
 *   engage   browsing and form progress that is not yet contact
 *   intent   a click on a phone, WhatsApp or email route; intent, not a confirmed enquiry
 *   lead     an enquiry the server accepted
 *   booking  a valuation appointment the server accepted
 *   service  an existing tenant's maintenance request; never counted as a lead
 *
 * Lead, booking and service events fire only after the server returns 200 with ok:true.
 * Nothing is sent without analytics consent, and every parameter is allow-listed per
 * event and screened for personal data before it leaves the page.
 */

export type MeasurementStage = 'view' | 'engage' | 'intent' | 'lead' | 'booking' | 'service'

export type ParamName = 'path' | 'source' | 'location' | 'property' | 'count'

export interface EventDefinition {
  stage: MeasurementStage
  /** Counted as a GA4 key event. Only accepted leads and bookings qualify. */
  keyEvent: boolean
  params: readonly ParamName[]
  description: string
}

export const EVENT_DICTIONARY = {
  property_view: { stage: 'view', keyEvent: false, params: ['property'], description: 'A property detail page was viewed' },
  search_performed: { stage: 'engage', keyEvent: false, params: [], description: 'A property search was run' },
  search_empty: { stage: 'engage', keyEvent: false, params: [], description: 'A property search returned nothing' },
  review_rail_engaged: { stage: 'engage', keyEvent: false, params: ['count'], description: 'The reviews rail was scrolled' },
  review_link_click: { stage: 'engage', keyEvent: false, params: ['location'], description: 'The leave-a-review link was followed' },
  nav_cta_click: { stage: 'engage', keyEvent: false, params: ['location'], description: 'A navigation call to action was clicked' },
  valuation_start: { stage: 'engage', keyEvent: false, params: ['path', 'source'], description: 'The valuation form was started' },
  valuation_step_2: { stage: 'engage', keyEvent: false, params: ['path'], description: 'The valuation form reached step 2' },
  valuation_step_3: { stage: 'engage', keyEvent: false, params: ['path'], description: 'The valuation form reached step 3' },
  call_click: { stage: 'intent', keyEvent: false, params: ['location'], description: 'A phone link was clicked' },
  whatsapp_click: { stage: 'intent', keyEvent: false, params: ['location'], description: 'A WhatsApp link was clicked' },
  email_click: { stage: 'intent', keyEvent: false, params: ['location'], description: 'An email link was clicked' },
  enquiry_submit: { stage: 'lead', keyEvent: true, params: ['source', 'property'], description: 'A property enquiry was accepted by the server' },
  contact_submit: { stage: 'lead', keyEvent: true, params: ['source'], description: 'A contact form was accepted by the server' },
  tenant_register_submit: { stage: 'lead', keyEvent: true, params: ['source'], description: 'A tenant registration or search alert was accepted by the server' },
  valuation_submit: { stage: 'booking', keyEvent: true, params: ['path', 'source'], description: 'A valuation booking was accepted by the server' },
  maintenance_submit: { stage: 'service', keyEvent: false, params: ['source'], description: 'A maintenance request was accepted by the server' },
} as const satisfies Record<string, EventDefinition>

export type AnalyticsEvent = keyof typeof EVENT_DICTIONARY

export type EventParams = Record<string, string | number | boolean | undefined>

/** What leaves the page: the event, its stage and only allow-listed, screened parameters. */
export interface MeasuredEvent {
  event: AnalyticsEvent
  stage: MeasurementStage
  params: Partial<Record<ParamName, string | number | boolean>>
  /** Parameter names removed, for the developer warning; never their values. */
  dropped: string[]
}

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/
// Seven or more digits once spaces, dashes, dots, brackets and a leading + are removed.
const PHONE = /(?:\+?\d[\s().-]*){7,}/
// UK postcode, full or outward-and-inward form.
const POSTCODE = /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i
const MAX_VALUE = 120

/** True when a value could carry personal data and must not be sent. */
export function looksPersonal(value: string): boolean {
  return EMAIL.test(value) || PHONE.test(value) || POSTCODE.test(value) || value.length > MAX_VALUE
}

/**
 * Keep only the parameters this event allows, and drop any value that looks like an
 * email, phone number or postcode. Path values lose their query string, which is
 * where personal data most often rides.
 */
export function measure(event: AnalyticsEvent, params: EventParams = {}): MeasuredEvent {
  const def: EventDefinition = EVENT_DICTIONARY[event]
  const allowed = new Set<string>(def.params)
  const out: MeasuredEvent['params'] = {}
  const dropped: string[] = []
  for (const [name, raw] of Object.entries(params)) {
    if (raw === undefined) continue
    if (!allowed.has(name)) {
      dropped.push(name)
      continue
    }
    let value = raw
    if (typeof value === 'string') {
      if (name === 'path') value = value.split(/[?#]/)[0] ?? ''
      if (looksPersonal(value)) {
        dropped.push(name)
        continue
      }
    }
    out[name as ParamName] = value
  }
  return { event, stage: def.stage, params: out, dropped }
}

/**
 * Consent decision from the stored value (the `pt-consent` browser storage entry).
 * Only an explicit analytics grant at the current consent version permits sending.
 */
export function analyticsConsented(stored: string | null, version: number): boolean {
  if (!stored) return false
  try {
    const parsed = JSON.parse(stored) as { version?: unknown; analytics?: unknown }
    return parsed.version === version && parsed.analytics === true
  } catch {
    return false
  }
}

/** Events that count as GA4 key events, derived from the dictionary so they cannot drift. */
export const KEY_EVENTS = (Object.keys(EVENT_DICTIONARY) as AnalyticsEvent[]).filter(
  (e) => EVENT_DICTIONARY[e].keyEvent
)
