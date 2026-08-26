import { NextResponse } from 'next/server'
import { appendFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { findCampaign } from '@/content/campaigns/links'

/**
 * Campaign short-link resolver (prompt 14 A and D). A printed or posted asset
 * points at a short human URL, /l/<slug>. This looks the slug up in the campaign
 * registry, applies its UTM parameters server side, logs the hit, and redirects
 * to the real landing page. The visitor lands with utm_* on the URL, which the
 * UtmCapture component then stores so the eventual lead is attributed.
 *
 * An unknown slug redirects to the sales hub rather than a 404, so a mistyped or
 * retired code never dead-ends a real person holding a leaflet.
 */
export const runtime = 'nodejs'

/** Append the hit to a daily NDJSON log. Never throws into the request path. */
async function logHit(entry: Record<string, unknown>): Promise<void> {
  try {
    const dir = process.env.CAMPAIGN_LOG_DIR ?? join(tmpdir(), 'piedaterre-campaigns')
    await mkdir(dir, { recursive: true })
    const day = new Date().toISOString().slice(0, 10)
    await appendFile(join(dir, `hits-${day}.ndjson`), JSON.stringify(entry) + '\n', 'utf8')
  } catch (err) {
    console.error('[campaign] hit log failed', err instanceof Error ? err.message : err)
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ campaign: string }> }) {
  const { campaign: slug } = await params
  const campaign = findCampaign(slug)
  const destination = campaign?.destination ?? '/sales'
  const url = new URL(destination, request.url)

  if (campaign) {
    url.searchParams.set('utm_source', campaign.utm.source)
    url.searchParams.set('utm_medium', campaign.utm.medium)
    url.searchParams.set('utm_campaign', campaign.utm.campaign)
    if (campaign.utm.content) url.searchParams.set('utm_content', campaign.utm.content)
  }

  await logHit({
    at: new Date().toISOString(),
    slug,
    matched: Boolean(campaign),
    destination,
    label: campaign?.label ?? null,
    referrer: request.headers.get('referer'),
    ua: request.headers.get('user-agent'),
  })

  // Temporary redirect: a campaign destination may change, so it is never cached
  // as permanent.
  return NextResponse.redirect(url, 307)
}
