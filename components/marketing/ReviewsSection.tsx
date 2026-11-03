/**
 * ReviewsSection (prompt 10). Server component that fetches the cached reviews
 * payload and renders the aggregate rating and the scrolling rail when there are
 * real reviews, or an honest "sourced from Google" state when there are not yet.
 * It never renders an error and never fabricates a review.
 *
 * Because the fetch is cached (12 hours, tagged), rendering this in more than one
 * place does no extra external work.
 */
import { Stars } from './Stars'
import { ReviewRail } from './ReviewRail'
import { GoogleReviewBadge } from './GoogleReviewBadge'
import { Icon } from '@/components/primitives/Icon'
import { getReviews, googleWriteReviewUrl } from '@/lib/reviews'
import { SITE } from '@/lib/site'

interface ReviewsSectionProps {
  /** Heading for the block. */
  heading?: string
}

export async function ReviewsSection({ heading = 'What our clients say' }: ReviewsSectionProps) {
  const { reviews, rating, total } = await getReviews()
  const googleProfile = SITE.urls.googleBusiness
  const writeUrl = googleWriteReviewUrl()

  if (reviews.length === 0) {
    // Honest state: no fabricated review text, and direct routes to the verified
    // Google profile and review form while the Places feed is being connected.
    return (
      <div className="border-[length:var(--pane-gap)] border-ink bg-ochre p-8 text-bone md:p-10">
        <h2 className="text-h2">See what our customers said on Google</h2>
        <p className="measure mt-4 text-body text-ink-soft">
          Our public Google profile is the source of truth: genuine feedback, published under each
          customer&rsquo;s own name and never rewritten by us.
        </p>
        <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {writeUrl ? <GoogleReviewBadge href={writeUrl} /> : null}
          {googleProfile ? (
            <a
              href={googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-small font-medium text-sales-ink hover:underline"
            >
              See what our customers said on Google
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-h2">{heading}</h2>
          {rating != null ? (
            <div className="mt-3 flex items-center gap-3">
              <Stars value={rating} className="h-5" />
              <span className="tabular text-body text-ink">
                {rating.toFixed(1)} out of 5
                <span className="text-ink-soft"> from {total.toLocaleString('en-GB')} reviews</span>
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-3">
          {writeUrl ? <GoogleReviewBadge href={writeUrl} /> : null}
          {googleProfile ? (
            <a
              href={googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-small font-medium text-sales-ink hover:underline"
            >
              See all Google reviews
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-small text-ink-soft">
        Shown exactly as written on Google. The rail cycles through the reviews Google makes
        available. Read every review, most recent first, on our Google profile.
      </p>

      <div className="mt-8">
        <ReviewRail reviews={reviews} rating={rating} />
      </div>
    </div>
  )
}
