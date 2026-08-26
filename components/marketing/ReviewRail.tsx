'use client'

/**
 * ReviewRail (prompt 10). A slow, continuous, horizontally scrolling rail of
 * real Google reviews. The component the client specifically asked for.
 *
 * Motion and performance:
 * - One duplicated track animated with transform: translate3d only, GPU
 *   composited, looping seamlessly at -50%. No left, margin or layout animation.
 * - Pauses on hover and on focus within (CSS), and stops entirely under
 *   prefers-reduced-motion, where the region becomes a manually scrollable row.
 *
 * Accessibility:
 * - The rail is a labelled region and is keyboard scrollable (tabIndex 0,
 *   overflow-x auto). It never traps focus.
 * - The real track is a list; the duplicate is aria-hidden, so a screen reader
 *   reads each review once, as static text, with the rating as "N out of 5".
 * - Long text truncates with a "read full review" link to Google rather than an
 *   in-card expander that would break the loop geometry.
 *
 * The whole rail is one tracked interaction: review_rail_engaged fires once on
 * the first hover, focus or scroll.
 */
import { useRef } from 'react'
import { Stars } from './Stars'
import { Icon } from '@/components/primitives/Icon'
import { longDate } from '@/lib/format'
import { track } from '@/lib/analytics'
import type { Review } from '@/lib/reviews'

const MAX_CHARS = 260

interface ReviewRailProps {
  reviews: Review[]
  /** The overall Google rating, shown in the region label for context. */
  rating: number | null
}

function truncate(text: string): { shown: string; clipped: boolean } {
  if (text.length <= MAX_CHARS) return { shown: text, clipped: false }
  const cut = text.slice(0, MAX_CHARS)
  const lastSpace = cut.lastIndexOf(' ')
  return { shown: `${cut.slice(0, lastSpace > 0 ? lastSpace : MAX_CHARS).trimEnd()}…`, clipped: true }
}

function Initial({ name }: { name: string }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-well font-display text-body text-ink"
      aria-hidden="true"
    >
      {name.trim().charAt(0).toUpperCase() || '?'}
    </span>
  )
}

function Card({ review }: { review: Review }) {
  const { shown, clipped } = truncate(review.text)
  return (
    <figure className="review-card">
      <div className="flex items-center gap-3">
        {review.authorPhotoUrl ? (
          // A Google Places avatar is a remote, per-review URL; next/image would
          // need Google's avatar host whitelisted and would proxy a third-party
          // thumbnail for no gain. It is tiny, below the fold, lazy and async,
          // with fixed dimensions so it holds its space.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.authorPhotoUrl}
            alt=""
            loading="lazy"
            decoding="async"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <Initial name={review.authorName} />
        )}
        <div className="min-w-0">
          <figcaption className="truncate text-body font-medium text-ink">
            {review.authorName}
          </figcaption>
          <time dateTime={review.date} className="text-small text-ink-soft">
            {longDate(review.date)}
          </time>
        </div>
      </div>

      <Stars value={review.rating} className="mt-4 h-4" />

      <blockquote className="mt-3 text-body text-ink-soft">{shown}</blockquote>

      {clipped ? (
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-small font-medium text-sales-ink hover:underline"
        >
          Read full review on Google
          <Icon name="arrow-up-right" className="h-4 w-4" />
        </a>
      ) : null}
    </figure>
  )
}

export function ReviewRail({ reviews, rating }: ReviewRailProps) {
  const engaged = useRef(false)

  // The rail is meaningless with nothing in it, so render nothing rather than an
  // empty animated strip. The page decides what to show in that case.
  if (reviews.length === 0) return null

  function engage() {
    if (engaged.current) return
    engaged.current = true
    track('review_rail_engaged', { count: reviews.length })
  }

  const label = rating
    ? `What our clients say, rated ${rating.toFixed(1)} out of 5 on Google`
    : 'What our clients say on Google'

  return (
    <div
      className="review-rail"
      role="region"
      aria-label={label}
      // A keyboard-scrollable region must be focusable so keyboard users can
      // scroll it; this is the axe-recommended pattern, not a violation.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onMouseEnter={engage}
      onFocus={engage}
      onScroll={engage}
    >
      {/* One animated wrapper translating -50% for a seamless loop. It holds the
          real list plus an aria-hidden duplicate, so screen readers read the
          reviews once and the loop still has no visible seam. */}
      <div className="review-rail-track">
        <ul className="review-rail-list">
          {reviews.map((review) => (
            <li key={review.key}>
              <Card review={review} />
            </li>
          ))}
        </ul>
        <ul className="review-rail-list" aria-hidden="true">
          {reviews.map((review) => (
            <li key={`dup-${review.key}`}>
              <Card review={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
