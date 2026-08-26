import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE } from '@/lib/site'
import { pageMeta, realEstateAgentJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Reviews',
  description:
    'What landlords and tenants say about Pied-à-Terre Property. Reviews are shown exactly as they appear on Google, never edited, shortened or reordered.',
  path: '/reviews',
})

/**
 * Reviews page. The live Google Places feed and the aggregate rating are wired
 * in prompt 10; this page is the shell that renders them and is deliberately
 * honest until then. We never fabricate, edit, shorten or reorder a review, so
 * with no live feed yet the page shows how reviews will be sourced rather than
 * inventing any. The moment the Places integration lands, real reviews render
 * here verbatim with reviewer name and date.
 */
export default function ReviewsPage() {
  const hasGoogleProfile = Boolean(SITE.urls.googleBusiness)

  return (
    <>
      <JsonLd data={realEstateAgentJsonLd()} />

      <PageHero
        tone="neutral"
        eyebrow="Reviews"
        trail={[{ name: 'Reviews', path: '/reviews' }]}
        title={
          <>
            In our clients&rsquo; <em className="italic text-sales-ink">own</em> words.
          </>
        }
        lead="We show reviews exactly as they appear on Google, with the reviewer's name and date, never edited, shortened or reordered. What you read here is what they wrote."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="rounded-md border border-brass/40 bg-well p-8 md:p-10">
          <Eyebrow>Live reviews</Eyebrow>
          <h2 className="mt-3 text-h2">Sourced from Google, verbatim</h2>
          <p className="measure mt-4 text-body text-ink-soft">
            Our reviews are published straight from our Google Business Profile so you can trust
            they are genuine and unedited. The live feed and overall rating are being connected
            and will appear here in full. Until then, the most reliable place to read and leave a
            review is Google itself.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {hasGoogleProfile ? (
              <>
                <a
                  href={SITE.urls.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sales"
                >
                  <Icon name="arrow-up-right" className="h-5 w-5" />
                  Read reviews on Google
                </a>
                <a
                  href={SITE.urls.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Leave a review
                </a>
              </>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-sm border border-brass/40 bg-ground px-4 py-2 text-small text-ink-soft">
                <Icon name="clock" className="h-4 w-4 text-brass" />
                Google Business Profile link awaiting confirmation before launch
              </span>
            )}
          </div>
        </div>

        <p className="measure mt-8 text-small text-ink-soft">
          We do not select or filter which reviews appear. When the feed is live, every review
          Google returns is shown here, most recent first, with the option to filter by what they
          mention: selling, letting or maintenance.
        </p>
      </section>

      <section className="border-t border-brass/30 bg-oat">
        <div className="mx-auto max-w-content px-6 py-16 md:px-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-h3">Would you rather hear it from us first?</h2>
              <p className="measure mt-2 text-body text-ink-soft">
                Read what we actually do, and why landlords stay with us for a decade and more.
              </p>
            </div>
            <Link href="/about" className="btn btn-secondary">
              About the firm
            </Link>
          </div>
        </div>
      </section>

      <ValuationBand
        tone="lettings"
        heading="Join the landlords who stayed"
        copy="A free, honest valuation from a firm you can check up on. No obligation."
        cta="Book a valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
