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
    // Honest pre-launch state: no fabricated reviews, no error, and a clear route
    // to Google. Fills in automatically once the Place ID and key are live.
    return (
      <div className="rounded-md border border-brass/40 bg-well p-8 md:p-10">
        <h2 className="text-h2">Sourced from Google, verbatim</h2>
        <p className="measure mt-4 text-body text-ink-soft">
          Our reviews are published straight from our Google Business Profile so you can trust they
          are genuine and unedited. The live feed and overall rating are being connected and will
          appear here in full. Until then, the most reliable place to read and leave a review is
          Google itself.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {googleProfile ? (
            <a href={googleProfile} target="_blank" rel="noopener noreferrer" className="btn btn-sales">
              <Icon name="arrow-up-right" className="h-5 w-5" />
              Read reviews on Google
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-sm border border-brass/40 bg-ground px-4 py-2 text-small text-ink-soft">
              <Icon name="clock" className="h-4 w-4 text-brass" />
              Google Business Profile link awaiting confirmation before launch
            </span>
          )}
          {writeUrl ? (
            <a href="/review" className="btn btn-secondary">
              Leave a review
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
        {googleProfile ? (
          <a
            href={googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-body font-medium text-sales-ink hover:underline"
          >
            Read all on Google
            <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
        ) : null}
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
