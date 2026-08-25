/**
 * Lead model, shared by the client forms and the /api/lead pipeline. One Zod
 * schema validates every submission; the `source` field is the canonical
 * attribution (prompt 06 table) and drives both validation and the office email
 * subject. Personal fields are optional individually but the schema refines that
 * at least one contact route is present, because a lead nobody can reply to is
 * not a lead.
 */
import { z } from 'zod'

/** Canonical lead sources. Every form declares exactly one. */
export const LEAD_SOURCES = [
  'valuation_sales',
  'valuation_lettings',
  'property_enquiry',
  'tenant_register',
  'maintenance',
  'search_alert',
  'campaign_landlords',
  'contact',
] as const

export type LeadSource = (typeof LEAD_SOURCES)[number]

/** Human label per source, for the office email and logs. */
export const SOURCE_LABEL: Record<LeadSource, string> = {
  valuation_sales: 'Sales valuation',
  valuation_lettings: 'Rental valuation',
  property_enquiry: 'Property enquiry',
  tenant_register: 'Tenant registration',
  maintenance: 'Maintenance request',
  search_alert: 'Search alert (no current match)',
  campaign_landlords: 'Landlord campaign',
  contact: 'General contact',
}

/**
 * The exact marketing-consent wording, versioned. Prompt 13 requires the wording
 * version to be stored with every lead, because proving what someone consented
 * to is the whole point of recording it.
 */
export const CONSENT_WORDING =
  'I am happy for Pied-à-Terre Property to email me occasionally about services that may be relevant. I can unsubscribe at any time.'
export const CONSENT_VERSION = '2026-08-01'

/** Bots complete a form in under three seconds; humans do not. */
export const MIN_ELAPSED_MS = 3000

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// UK numbers: spaces allowed, +44 or leading zero, 10 to 11 digits of content.
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/

export const LeadSchema = z
  .object({
    source: z.enum(LEAD_SOURCES),
    /** Coarse type, retained for the daily log and back-compat. */
    kind: z.enum(['valuation', 'enquiry', 'registration', 'maintenance', 'contact']).optional(),
    path: z.enum(['sales', 'lettings']).optional(),
    name: z.string().trim().min(2, 'Enter your name.').max(120),
    email: z.string().trim().regex(EMAIL, 'Enter a valid email address.').max(200).optional().or(z.literal('')),
    phone: z.string().trim().regex(PHONE, 'Enter a valid UK phone number.').max(40).optional().or(z.literal('')),
    postcode: z.string().trim().max(80).optional(),
    propertyType: z.string().trim().max(80).optional(),
    bedrooms: z.string().trim().max(40).optional(),
    timeframe: z.string().trim().max(80).optional(),
    message: z.string().trim().max(4000).optional(),
    /** Property enquiry context. */
    propertyRef: z.string().trim().max(120).optional(),
    propertyAddress: z.string().trim().max(200).optional(),
    propertySlug: z.string().trim().max(120).optional(),
    /** Arbitrary extra structured fields (registration criteria, maintenance). */
    extra: z.record(z.string(), z.string().max(2000)).optional(),
    /** Marketing consent, separate from the enquiry itself. */
    consentMarketing: z.boolean().optional(),
    /** UTM attribution captured on landing, attached at submit. */
    utm: z
      .object({
        source: z.string().max(120).optional(),
        medium: z.string().max(120).optional(),
        campaign: z.string().max(120).optional(),
        content: z.string().max(120).optional(),
      })
      .optional(),
    /** Page the lead came from and the referrer, for the office email. */
    pagePath: z.string().max(300).optional(),
    referrer: z.string().max(500).optional(),
    /** Milliseconds the form was on screen. Under MIN_ELAPSED_MS is a bot. */
    elapsedMs: z.number().nonnegative().optional(),
    /** Honeypot. Must be empty; bots fill hidden fields. */
    company: z.string().max(0).optional().or(z.literal('')),
  })
  .refine((d) => Boolean((d.email && d.email !== '') || (d.phone && d.phone !== '')), {
    message: 'Leave an email or a phone number so we can reply.',
    path: ['email'],
  })

export type LeadInput = z.infer<typeof LeadSchema>

/** Office email subject built for a phone lock screen: "New sales valuation: PO8, 3 bed, Lovedean". */
export function leadSubject(lead: LeadInput): string {
  const label = SOURCE_LABEL[lead.source]
  const bits = [
    lead.postcode,
    lead.bedrooms ? `${lead.bedrooms} bed` : undefined,
    lead.propertyAddress,
  ].filter(Boolean)
  const tail = bits.length ? `: ${bits.join(', ')}` : lead.name ? `: ${lead.name}` : ''
  return `New ${label.toLowerCase()}${tail}`
}
