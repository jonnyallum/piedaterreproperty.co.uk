import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { ReviewsSection } from '@/components/marketing/ReviewsSection'
import { CredentialStrip } from '@/components/marketing/CredentialStrip'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { JsonLd } from '@/components/seo/JsonLd'
import { getReviews } from '@/lib/reviews'
import { pageMeta, realEstateAgentJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Reviews',
  description:
    'What landlords and tenants say about Pied-à-Terre Property. Reviews are shown exactly as they appear on Google, never edited, shortened or reordered.',
  path: '/reviews',
})

/**
 * Reviews page (prompt 08 shell, prompt 10 live). Renders the scrolling rail of
 * real Google reviews and the aggregate rating when there is data, or an honest
 * "sourced from Google" state when there is not yet. The AggregateRating schema
 * is only emitted with genuine figures behind it.
 */
export default async function ReviewsPage() {
  const { rating, total } = await getReviews()
  const aggregate = rating != null && total > 0 ? { rating, total } : undefined

  return (
    <>
      <JsonLd data={realEstateAgentJsonLd(aggregate ? { aggregate } : undefined)} />

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
        <ReviewsSection heading="What landlords and tenants say" />

        <p className="measure mt-8 text-small text-ink-soft">
          We do not select or filter which reviews appear. Every review Google returns is available
          on our Google profile, most recent first.
        </p>
      </section>

      <section className="border-t-[length:var(--pane-gap)] border-night bg-oat">
        <div className="mx-auto max-w-content px-6 py-16 md:px-8">
          <Eyebrow>Regulated and accountable</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-h2">
            Trust is more than a <em className="italic text-sales-ink">rating</em>.
          </h2>
          <p className="measure mt-3 text-body text-ink-soft">
            Reviews tell you what it is like to work with us. These tell you your money and your
            property are safe while you do.
          </p>
          <CredentialStrip className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" />
          <p className="mt-6 text-small text-ink-soft">
            Each of these is explained in plain English, with our reference numbers, on the{' '}
            <Link href="/about#credentials" className="text-sales-ink underline underline-offset-4">
              about page
            </Link>
            .
          </p>
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
