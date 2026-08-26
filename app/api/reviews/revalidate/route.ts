/**
 * On-demand review revalidation (prompt 10). Lets the office pull a brand-new
 * Google review immediately rather than waiting for the 12-hour cache to expire.
 *
 * Protected by a shared secret so it cannot be triggered anonymously. Call with
 * POST and either an Authorization: Bearer <secret> header or ?secret=<secret>.
 * On success it drops the cached reviews and warms the cache with a fresh fetch.
 */
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { REVIEWS_TAG, getReviews } from '@/lib/reviews'

export const runtime = 'nodejs'

function authorised(request: Request): boolean {
  const secret = process.env.REVIEWS_REVALIDATE_SECRET
  if (!secret) return false
  const header = request.headers.get('authorization')
  const bearer = header?.toLowerCase().startsWith('bearer ')
    ? header.slice(7).trim()
    : undefined
  const query = new URL(request.url).searchParams.get('secret') ?? undefined
  return bearer === secret || query === secret
}

export async function POST(request: Request) {
  if (!authorised(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 })
  }
  revalidateTag(REVIEWS_TAG)
  const payload = await getReviews()
  return NextResponse.json({ ok: true, source: payload.source, total: payload.total })
}
