import type { Metadata } from 'next'
import { ReviewRedirect } from './ReviewRedirect'
import { googleWriteReviewUrl } from '@/lib/reviews'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Leave a review',
  description: 'Leave a review for Pied-à-Terre Property on Google.',
  path: '/review',
  noindex: true,
})

/**
 * /review (prompt 10 C). A short, memorable link for business cards, email
 * signatures and board QR codes that sends people straight to the Google review
 * form. The destination is resolved on the server from the Place ID, so the
 * short link is stable even though the underlying Google URL is long. The click
 * is tracked, and there is a plain link fallback for anyone without JavaScript.
 */
export default function ReviewPage() {
  const target = googleWriteReviewUrl()
  return <ReviewRedirect target={target} phone={SITE.phone.display} phoneHref={SITE.phone.href} />
}
