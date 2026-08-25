import { NextResponse } from 'next/server'

/**
 * Lead intake. Validates and accepts valuation and enquiry submissions.
 *
 * Email delivery through Resend, WhatsApp deep-link handoff, the review-ask
 * automation and richer server-side tracking are wired in prompt 06. Until a
 * RESEND_API_KEY is configured the lead is validated and acknowledged, and a
 * server log records it, so the funnel works end to end in every environment.
 */

export interface LeadPayload {
  kind: 'valuation' | 'enquiry'
  path: 'sales' | 'lettings'
  source?: string
  name: string
  email: string
  phone: string
  postcode?: string
  propertyType?: string
  bedrooms?: string
  timeframe?: string
  message?: string
  // Honeypot: must be empty. Bots fill hidden fields.
  company?: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// UK numbers: allow spaces, +44, leading zero, 10 to 11 digits of content.
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/

function invalid(reason: string) {
  return NextResponse.json({ ok: false, error: reason }, { status: 400 })
}

export async function POST(request: Request) {
  let body: Partial<LeadPayload>
  try {
    body = (await request.json()) as Partial<LeadPayload>
  } catch {
    return invalid('Malformed request.')
  }

  // Silently accept and drop honeypot hits so bots get no signal.
  if (body.company) return NextResponse.json({ ok: true })

  if (body.kind !== 'valuation' && body.kind !== 'enquiry') return invalid('Unknown kind.')
  if (body.path !== 'sales' && body.path !== 'lettings') return invalid('Unknown path.')
  if (!body.name || body.name.trim().length < 2) return invalid('Please enter your name.')
  if (!body.email || !EMAIL.test(body.email)) return invalid('Please enter a valid email.')
  if (!body.phone || !PHONE.test(body.phone.trim()))
    return invalid('Please enter a valid UK phone number.')

  // Prompt 06: deliver to LEAD_TO_EMAIL via Resend and queue the review ask.
  if (process.env.RESEND_API_KEY) {
    // Wired in prompt 06.
  } else {
    console.info('[lead] received', {
      kind: body.kind,
      path: body.path,
      source: body.source ?? 'site',
    })
  }

  return NextResponse.json({ ok: true })
}
