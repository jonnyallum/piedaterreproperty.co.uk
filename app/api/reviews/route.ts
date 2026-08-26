/**
 * Reviews API (prompt 10). Returns the normalised reviews payload as JSON, always
 * from the server so the Google API key never reaches the browser. The heavy
 * lifting and the 12-hour cache live in lib/reviews; this route just exposes the
 * result to anything that wants it client-side without touching the key.
 */
import { NextResponse } from 'next/server'
import { getReviews } from '@/lib/reviews'

export const runtime = 'nodejs'

export async function GET() {
  const payload = await getReviews()
  // The payload is already cached upstream by the tagged fetch; this response
  // may be served fresh each time but does no external work when cached.
  return NextResponse.json(payload)
}
