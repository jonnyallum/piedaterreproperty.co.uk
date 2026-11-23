import { randomUUID } from 'node:crypto'
import { CONSENT_VERSION, type LeadInput, type LeadSource } from '@/lib/leads'

/**
 * Durable lead store. The server-only Supabase table is the primary record; the
 * old NDJSON file remains a local fallback only. No browser key is used.
 */

type Route = {
  owner: string
  prefix: string
  enquiryType: string
  stage: string
}

const ROUTES: Record<LeadSource, Route> = {
  valuation_sales: { owner: 'Charisma Smith', prefix: 'S', enquiryType: 'sales_valuation', stage: 'blocked_compliance' },
  campaign_landlords: { owner: 'Charisma Smith', prefix: 'S', enquiryType: 'landlord_acquisition', stage: 'blocked_compliance' },
  valuation_lettings: { owner: 'Lettings team', prefix: 'L', enquiryType: 'letting_valuation', stage: 'new' },
  property_enquiry: { owner: 'Lettings team', prefix: 'L', enquiryType: 'lettings_viewing', stage: 'new' },
  tenant_register: { owner: 'Lettings team', prefix: 'L', enquiryType: 'tenant_registration', stage: 'new' },
  search_alert: { owner: 'Lettings team', prefix: 'L', enquiryType: 'tenant_nurture', stage: 'nurture' },
  maintenance: { owner: 'Property management', prefix: 'M', enquiryType: 'maintenance', stage: 'new' },
  contact: { owner: 'Office', prefix: 'C', enquiryType: 'general_contact', stage: 'new' },
}

export type LeadStoreResult = {
  reference: string
  duplicate: boolean
  stored: boolean
}

export type LeadStore = {
  save(lead: LeadInput): Promise<LeadStoreResult>
}

function normalisePhone(value?: string): string | null {
  if (!value) return null
  const digits = value.replace(/[^\d+]/g, '')
  return digits || null
}

function newReference(prefix: string): string {
  const year = new Date().getUTCFullYear()
  const suffix = randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `PDT-${prefix}-${year}-${suffix}`
}

function slaDueAt(): string {
  return new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
}

export class SupabaseLeadStore implements LeadStore {
  constructor(
    private readonly url: string,
    private readonly key: string,
    private readonly clientId: string
  ) {}

  private readHeaders(): Record<string, string> {
    return { apikey: this.key, authorization: `Bearer ${this.key}` }
  }

  private async findDuplicate(lead: LeadInput): Promise<string | null> {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const params = new URLSearchParams({
      select: 'reference',
      client_id: `eq.${this.clientId}`,
      source: `eq.${lead.source}`,
      created_at: `gte.${since}`,
      limit: '1',
    })
    const email = lead.email?.trim().toLowerCase()
    const phone = normalisePhone(lead.phone)
    if (email) params.set('email', `eq.${email}`)
    else if (phone) params.set('phone', `eq.${phone}`)
    else return null
    if (lead.propertyRef) params.set('property_ref', `eq.${lead.propertyRef}`)

    const response = await fetch(`${this.url}/rest/v1/piedaterre_enquiries?${params.toString()}`, {
      headers: this.readHeaders(),
    })
    if (!response.ok) return null
    const rows = (await response.json()) as Array<{ reference?: string }>
    return rows[0]?.reference ?? null
  }

  async save(lead: LeadInput): Promise<LeadStoreResult> {
    const duplicate = await this.findDuplicate(lead)
    if (duplicate) return { reference: duplicate, duplicate: true, stored: true }

    const route = ROUTES[lead.source]
    const reference = newReference(route.prefix)
    const row = {
      reference,
      client_id: this.clientId,
      source: lead.source,
      enquiry_type: route.enquiryType,
      status: 'new',
      stage: route.stage,
      name: lead.name,
      email: lead.email?.trim().toLowerCase() || null,
      phone: lead.phone || null,
      postcode: lead.postcode || null,
      property_ref: lead.propertyRef || null,
      property_address: lead.propertyAddress || null,
      property_slug: lead.propertySlug || null,
      message: lead.message || null,
      consent_marketing: Boolean(lead.consentMarketing),
      consent_version: lead.consentMarketing ? CONSENT_VERSION : null,
      consent_at: lead.consentMarketing ? new Date().toISOString() : null,
      utm: lead.utm ?? null,
      page_path: lead.pagePath || null,
      referrer: lead.referrer || null,
      owner: route.owner,
      sla_due_at: slaDueAt(),
      raw: {
        source: lead.source,
        pagePath: lead.pagePath,
        referrer: lead.referrer,
        extra: lead.extra ?? null,
      },
    }

    const response = await fetch(`${this.url}/rest/v1/piedaterre_enquiries`, {
      method: 'POST',
      headers: { ...this.readHeaders(), 'content-type': 'application/json', prefer: 'return=representation' },
      body: JSON.stringify(row),
    })
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 200)
      throw new Error(`lead store ${response.status}: ${detail}`)
    }
    const created = (await response.json()) as Array<{ reference?: string }>
    return { reference: created[0]?.reference ?? reference, duplicate: false, stored: true }
  }
}

/**
 * Returns null when the store is not configured. The API route then keeps the
 * existing NDJSON fallback for local development. Production must set all three
 * server-only variables before the durable path is claimed.
 */
export function createLeadStore(env: NodeJS.ProcessEnv = process.env): LeadStore | null {
  const url = env.LEAD_STORE_SUPABASE_URL
  const key = env.LEAD_STORE_SUPABASE_SERVICE_KEY
  const clientId = env.LEAD_STORE_CLIENT_ID
  if (!url || !key || !clientId) return null
  return new SupabaseLeadStore(url.replace(/\/$/, ''), key, clientId)
}
