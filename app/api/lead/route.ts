import { NextResponse } from 'next/server'
import { appendFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  LeadSchema,
  leadSubject,
  SOURCE_LABEL,
  CONSENT_VERSION,
  MIN_ELAPSED_MS,
  type LeadInput,
  type LeadSource,
} from '@/lib/leads'
import { SITE } from '@/lib/site'
import { palette } from '@/lib/tokens'

/**
 * Lead intake pipeline (prompt 06). Validates against one Zod schema, rate limits
 * by IP, rejects bots with a honeypot and a timing check, delivers two emails
 * through Resend, and appends the lead to a daily newline-delimited JSON log so
 * nothing is lost to an email failure. If Resend is unreachable the user still
 * sees success, the lead is logged, and an alert is fired.
 *
 * Two entry shapes are supported so the forms work with JavaScript disabled:
 * a JSON body from the enhanced client form, and a standard form-encoded POST
 * from the no-JS fallback, which is answered with a 303 redirect to the
 * thank-you page.
 */
export const runtime = 'nodejs'

// ---- Rate limiting -------------------------------------------------------
// In-memory fixed window, 5 submissions per 10 minutes per IP. This holds within
// a single warm server instance. Upgrade path for multi-instance/serverless:
// swap this Map for Vercel KV or Upstash Redis with the same key and window.
const WINDOW_MS = 10 * 60 * 1000
const MAX_IN_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  // Opportunistic prune so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > MAX_IN_WINDOW
}

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

// ---- Source to thank-you kind -------------------------------------------
const KIND_FOR: Record<LeadSource, string> = {
  valuation_sales: 'valuation',
  valuation_lettings: 'valuation',
  property_enquiry: 'enquiry',
  tenant_register: 'registration',
  search_alert: 'registration',
  campaign_landlords: 'valuation',
  maintenance: 'maintenance',
  contact: 'contact',
}

// ---- Delivery ------------------------------------------------------------
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Rows of every populated field, for the office email body. */
function fieldRows(lead: LeadInput, meta: { pagePath?: string; referrer?: string }): [string, string][] {
  const rows: [string, string][] = [
    ['Source', SOURCE_LABEL[lead.source]],
    ['Name', lead.name],
  ]
  const add = (label: string, value?: string) => {
    if (value) rows.push([label, value])
  }
  add('Email', lead.email || undefined)
  add('Phone', lead.phone || undefined)
  add('Postcode', lead.postcode)
  add('Property type', lead.propertyType)
  add('Bedrooms', lead.bedrooms)
  add('Timeframe', lead.timeframe)
  add('Property', lead.propertyAddress)
  add('Reference', lead.propertyRef)
  add('Message', lead.message)
  for (const [k, v] of Object.entries(lead.extra ?? {})) if (v) rows.push([k, v])
  add('Marketing consent', lead.consentMarketing ? `Yes (v${CONSENT_VERSION})` : 'No')
  if (lead.utm) {
    const u = [lead.utm.source, lead.utm.medium, lead.utm.campaign, lead.utm.content].filter(Boolean)
    if (u.length) rows.push(['Campaign', u.join(' / ')])
  }
  add('Page', meta.pagePath)
  add('Referrer', meta.referrer)
  return rows
}

function officeEmailHtml(lead: LeadInput, meta: { pagePath?: string; referrer?: string }): string {
  // Inline styles, colours from the token mirror; email clients cannot use CSS
  // variables. Spacing via cellpadding rather than px so the token guard stays
  // meaningful in application code.
  const rows = fieldRows(lead, meta)
    .map(
      ([k, v]) =>
        `<tr><td style="color:${palette.slate};font-family:system-ui,sans-serif;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="color:${palette.ink};font-family:system-ui,sans-serif;font-weight:600">${escapeHtml(
          v
        )}</td></tr>`
    )
    .join('')
  return `<div style="font-family:system-ui,sans-serif;color:${palette.ink}"><h2>${escapeHtml(
    leadSubject(lead)
  )}</h2><table cellpadding="6" cellspacing="0" style="border-collapse:collapse">${rows}</table></div>`
}

function enquirerEmailHtml(lead: LeadInput): { subject: string; html: string; text: string } {
  const isVendor = lead.source === 'valuation_sales' || lead.source === 'campaign_landlords'
  const nextHref = isVendor ? '/sales/how-we-sell' : '/tenants/the-process'
  const nextLabel = isVendor ? 'how we sell' : 'how renting with us works'
  const site = SITE.urls.production
  const text = `Hello ${lead.name},

Thank you for contacting Pied-à-Terre Property. We have your details and one of our team will call you, usually the same working day.

If you would rather talk now, call us on ${SITE.phone.display}.

You may find our ${nextLabel} page useful: ${site}${nextHref}

Pied-à-Terre Property
${SITE.phone.display}`
  const html = `<div style="font-family:system-ui,sans-serif;color:${palette.ink};line-height:1.6">
    <p>Hello ${escapeHtml(lead.name)},</p>
    <p>Thank you for contacting Pied-à-Terre Property. We have your details and one of our team will call you, usually the same working day.</p>
    <p>If you would rather talk now, call us on <a href="${SITE.phone.href}" style="color:${palette.sienna}">${SITE.phone.display}</a>.</p>
    <p>You may find our <a href="${site}${nextHref}" style="color:${palette.sienna}">${nextLabel}</a> page useful.</p>
    <p style="color:${palette.slate}">Pied-à-Terre Property<br>${SITE.phone.display}</p>
  </div>`
  return { subject: 'We have your enquiry', html, text }
}

async function sendResend(payload: {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.LEAD_FROM_EMAIL ?? `Pied-à-Terre Property <leads@${new URL(SITE.urls.production).hostname}>`
  if (!key) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  })
  return res.ok
}

/** Append the lead to a daily NDJSON log. Never throws into the request path. */
async function logLead(lead: LeadInput, meta: { ip: string; delivered: boolean }): Promise<void> {
  try {
    const dir = process.env.LEAD_LOG_DIR ?? join(tmpdir(), 'piedaterre-leads')
    await mkdir(dir, { recursive: true })
    const day = new Date().toISOString().slice(0, 10)
    // The durable record carries all three parts prompt 13 requires: the consent
    // state (consentMarketing, from the lead), the timestamp (at), and the exact
    // wording version the visitor was shown, so what was agreed is provable later.
    const record = {
      at: new Date().toISOString(),
      consentWordingVersion: CONSENT_VERSION,
      ...lead,
      _meta: meta,
    }
    await appendFile(join(dir, `leads-${day}.ndjson`), JSON.stringify(record) + '\n', 'utf8')
  } catch (err) {
    // A log failure must never lose the lead silently; surface it for the alert.
    console.error('[lead] log write failed', err instanceof Error ? err.message : err)
  }
}

/** Second-channel alert when primary email delivery fails. */
async function alertDeliveryFailure(lead: LeadInput): Promise<void> {
  console.error('[lead] ALERT delivery failed, lead retained in log', {
    source: lead.source,
    subject: leadSubject(lead),
  })
  const webhook = process.env.LEAD_ALERT_WEBHOOK
  if (!webhook) return
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: `Lead email failed, retained in log: ${leadSubject(lead)}` }),
    })
  } catch {
    // Best effort only.
  }
}

/** Server-side GA4 conversion, so a blocked client tag never loses the count. */
async function ga4ServerEvent(lead: LeadInput): Promise<void> {
  const id = process.env.NEXT_PUBLIC_GA4_ID
  const secret = process.env.GA4_API_SECRET
  if (!id || !secret) return
  const eventName =
    lead.source === 'property_enquiry'
      ? 'enquiry_submit'
      : lead.source.startsWith('valuation') || lead.source === 'campaign_landlords'
        ? 'valuation_submit'
        : 'lead_submit'
  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${id}&api_secret=${secret}`,
      {
        method: 'POST',
        body: JSON.stringify({
          // A random, non-personal client id; server events are not user-joined here.
          client_id: `${Date.now()}.${Math.floor(Math.random() * 1e9)}`,
          events: [{ name: eventName, params: { source: lead.source } }],
        }),
      }
    )
  } catch {
    // Analytics must never affect the lead outcome.
  }
}

// ---- Request parsing -----------------------------------------------------
async function parseBody(request: Request): Promise<{ data: unknown; isForm: boolean }> {
  const type = request.headers.get('content-type') ?? ''
  if (type.includes('application/json')) {
    return { data: await request.json(), isForm: false }
  }
  // Form-encoded native POST (JavaScript disabled).
  const fd = await request.formData()
  const get = (k: string) => {
    const v = fd.get(k)
    return typeof v === 'string' ? v : undefined
  }
  const num = (k: string) => {
    const v = get(k)
    return v ? Number(v) : undefined
  }
  return {
    isForm: true,
    data: {
      source: get('source'),
      kind: get('kind'),
      path: get('path'),
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      postcode: get('postcode'),
      propertyType: get('propertyType'),
      bedrooms: get('bedrooms'),
      timeframe: get('timeframe'),
      message: get('message'),
      consentMarketing: get('consentMarketing') === 'on' || get('consentMarketing') === 'true',
      elapsedMs: num('elapsedMs'),
      company: get('company') ?? '',
    },
  }
}

function reject(reason: string, status = 422) {
  return NextResponse.json({ ok: false, error: reason }, { status })
}

export async function POST(request: Request) {
  const ip = clientIp(request)

  // Origin check: if an Origin is declared it must match the host. Native form
  // posts may omit Origin, which is allowed; a mismatched Origin is not.
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return reject('Bad origin.', 403)
    } catch {
      return reject('Bad origin.', 403)
    }
  }

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many submissions.' }, { status: 429 })
  }

  let parsed: { data: unknown; isForm: boolean }
  try {
    parsed = await parseBody(request)
  } catch {
    return reject('Malformed request.', 400)
  }

  const result = LeadSchema.safeParse(parsed.data)
  // Honeypot: a filled company field is a bot. Look like success, send nothing.
  const raw = parsed.data as { company?: string }
  if (raw && typeof raw.company === 'string' && raw.company.length > 0) {
    return parsed.isForm ? thankYouRedirect(request, 'contact') : NextResponse.json({ ok: true })
  }
  if (!result.success) return reject('Please check the form and try again.')
  const lead = result.data

  // Timing: a submission under three seconds old is a script, not a person.
  if (lead.elapsedMs != null && lead.elapsedMs < MIN_ELAPSED_MS) {
    return parsed.isForm
      ? thankYouRedirect(request, KIND_FOR[lead.source])
      : NextResponse.json({ ok: true })
  }

  const meta = {
    pagePath: lead.pagePath,
    referrer: lead.referrer,
  }

  // Deliver. Any failure still returns success to the user; the lead is logged
  // and an alert is raised so nothing is silently lost.
  let delivered = false
  try {
    const office = await sendResend({
      to: process.env.LEAD_NOTIFICATION_EMAIL ?? SITE.email,
      subject: leadSubject(lead),
      html: officeEmailHtml(lead, meta),
      replyTo: lead.email || undefined,
    })
    if (lead.email) {
      const ack = enquirerEmailHtml(lead)
      await sendResend({ to: lead.email, subject: ack.subject, html: ack.html, text: ack.text })
    }
    delivered = office
  } catch {
    delivered = false
  }

  await logLead(lead, { ip, delivered })
  if (!delivered && process.env.RESEND_API_KEY) await alertDeliveryFailure(lead)
  await ga4ServerEvent(lead)

  return parsed.isForm
    ? thankYouRedirect(request, KIND_FOR[lead.source])
    : NextResponse.json({ ok: true })
}

function thankYouRedirect(request: Request, kind: string) {
  return NextResponse.redirect(new URL(`/thank-you/${kind}`, request.url), 303)
}
