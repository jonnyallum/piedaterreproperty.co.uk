/**
 * Google reviews data layer (prompt 10). Server-only. The API key never reaches
 * the browser: every function here runs on the server, and the key is read from
 * a non-public environment variable.
 *
 * Behaviour:
 * - Live fetch from the Google Places Details endpoint, cached for 12 hours with
 *   the Next.js data cache, tagged so a new review can be pulled on demand.
 * - On any failure, non-200, missing key or empty result, fall back to the
 *   committed snapshot in content/reviews/fallback.json. The caller never sees an
 *   error and the component never renders an error state.
 * - On a successful live fetch, best-effort write the snapshot back to
 *   fallback.json so the stored fallback stays current. This is a no-op on a
 *   read-only filesystem (for example Vercel at runtime), which is expected: the
 *   durable fallback is the committed file, refreshed at build or via the
 *   revalidation route.
 *
 * We never fabricate, edit or reorder review text. The normaliser only reshapes
 * what Google returns.
 *
 * This module is server-only by construction: it is never imported by a client
 * component, it reads a non-public env var, and it uses node:fs. Keeping it out
 * of the client graph is what keeps the API key out of the browser bundle.
 */
import { z } from 'zod'
import fallback from '@/content/reviews/fallback.json'

/** 12 hours, in seconds. */
export const REVIEWS_REVALIDATE = 43200
export const REVIEWS_TAG = 'reviews'

export interface Review {
  /** Stable-ish key for React: author + time. Google gives no id. */
  key: string
  authorName: string
  authorPhotoUrl: string | null
  rating: number
  /** Google's own phrasing, for example "a month ago". */
  relativeTime: string
  /** ISO date derived from the unix time Google returns. */
  date: string
  text: string
  /** Link to this review, or the profile, on Google. */
  url: string
}

export interface ReviewsPayload {
  rating: number | null
  total: number
  reviews: Review[]
  /** ISO timestamp of the data, or null when there is nothing yet. */
  fetchedAt: string | null
  /** Where the data came from, for diagnostics and the revalidation route. */
  source: 'live' | 'fallback'
}

const GooglePlaceSchema = z.object({
  result: z
    .object({
      rating: z.number().optional(),
      user_ratings_total: z.number().optional(),
      url: z.string().optional(),
      reviews: z
        .array(
          z.object({
            author_name: z.string(),
            profile_photo_url: z.string().optional(),
            rating: z.number(),
            relative_time_description: z.string(),
            time: z.number(),
            text: z.string(),
            author_url: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
  status: z.string(),
  error_message: z.string().optional(),
})

function isoFromUnix(seconds: number): string {
  return new Date(seconds * 1000).toISOString().slice(0, 10)
}

function readFallback(): ReviewsPayload {
  const parsed = fallback as {
    rating: number | null
    total: number
    reviews: Review[]
    fetchedAt: string | null
  }
  return {
    rating: parsed.rating,
    total: parsed.total ?? parsed.reviews.length,
    reviews: parsed.reviews ?? [],
    fetchedAt: parsed.fetchedAt,
    source: 'fallback',
  }
}

/**
 * Best-effort persistence of a fresh snapshot. Wrapped so a read-only filesystem
 * never turns a successful fetch into a failure. Only runs on the server.
 */
async function persistFallback(payload: ReviewsPayload): Promise<void> {
  try {
    const { writeFile } = await import('node:fs/promises')
    const { join } = await import('node:path')
    const file = join(process.cwd(), 'content', 'reviews', 'fallback.json')
    const body = {
      note: 'Auto-updated snapshot of the last successful Google Places fetch. Only ever real reviews.',
      fetchedAt: payload.fetchedAt,
      rating: payload.rating,
      total: payload.total,
      reviews: payload.reviews,
    }
    await writeFile(file, `${JSON.stringify(body, null, 2)}\n`, 'utf8')
  } catch {
    // Read-only filesystem in production is expected. The committed file stands.
  }
}

/**
 * Fetch and normalise reviews. Always resolves: on any problem it returns the
 * stored fallback rather than throwing, so no caller has to handle an error.
 */
export async function getReviews(): Promise<ReviewsPayload> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return readFallback()

  try {
    const fields = 'rating,user_ratings_total,url,reviews'
    const endpoint = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    endpoint.searchParams.set('place_id', placeId)
    endpoint.searchParams.set('fields', fields)
    endpoint.searchParams.set('reviews_sort', 'newest')
    endpoint.searchParams.set('key', key)

    const res = await fetch(endpoint, {
      next: { revalidate: REVIEWS_REVALIDATE, tags: [REVIEWS_TAG] },
    })
    if (!res.ok) return readFallback()

    const json = GooglePlaceSchema.safeParse(await res.json())
    if (!json.success || json.data.status !== 'OK' || !json.data.result) {
      return readFallback()
    }

    const r = json.data.result
    const reviews: Review[] = (r.reviews ?? []).map((rv) => ({
      key: `${rv.author_name}-${rv.time}`,
      authorName: rv.author_name,
      authorPhotoUrl: rv.profile_photo_url ?? null,
      rating: rv.rating,
      relativeTime: rv.relative_time_description,
      date: isoFromUnix(rv.time),
      text: rv.text,
      url: rv.author_url ?? r.url ?? googleWriteReviewUrl(placeId),
    }))

    // A successful call with no reviews still counts as live, but we keep the
    // richer of the two so the rail never goes backwards to empty.
    if (reviews.length === 0) return readFallback()

    const payload: ReviewsPayload = {
      rating: r.rating ?? null,
      total: r.user_ratings_total ?? reviews.length,
      reviews,
      fetchedAt: new Date().toISOString(),
      source: 'live',
    }
    await persistFallback(payload)
    return payload
  } catch {
    return readFallback()
  }
}

/** The Google "write a review" deep link for the configured place. */
export function googleWriteReviewUrl(placeId = process.env.GOOGLE_PLACE_ID ?? ''): string {
  return placeId
    ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
    : ''
}
