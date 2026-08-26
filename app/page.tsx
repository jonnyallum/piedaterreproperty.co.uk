import type { Metadata } from 'next'
import Link from 'next/link'
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { Icon } from '@/components/primitives/Icon'
import { Arch } from '@/components/primitives/Arch'
import { HeroSearch } from '@/components/lead/HeroSearch'
import { DualPath } from '@/components/marketing/DualPath'
import { StatsBand } from '@/components/marketing/StatsBand'
import { SalesFeature } from '@/components/marketing/SalesFeature'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { Marquee } from '@/components/marketing/Marquee'
import { Faq } from '@/components/marketing/Faq'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { JsonLd } from '@/components/seo/JsonLd'
import { AREAS } from '@/content/areas'
import { HOME_FAQS } from '@/content/faqs'
import { SITE, COVERAGE, yearsTrading } from '@/lib/site'
import { inWords } from '@/lib/format'
import { realEstateAgentJsonLd, faqPageJsonLd, pageMeta } from '@/lib/seo'

/**
 * Home metadata. The canonical, robots and social card come from pageMeta so the
 * home page is pinned to the production domain like every other page. The title
 * is set absolute, bypassing the brand template, to the primary target query.
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: 'Estate and letting agents in Havant, Portsmouth and Emsworth',
    description:
      'Independent estate and letting agents on the Solent coast since 2011. Selling, letting and managing homes in Havant, Portsmouth, Waterlooville, Emsworth and Hayling Island.',
    path: '/',
  }),
  title: {
    absolute: 'Estate and letting agents in Havant, Portsmouth and Emsworth | Pied-à-Terre Property',
  },
}

/*
 * Hero headline options, in the house voice. The strongest is implemented; the
 * rest are here for Charisma to choose from (tracked in ASSET_REQUEST_LIST):
 *   - "Fifteen years on this coastline."   (implemented)
 *   - "A foot on the ground, from Portchester to Hayling."
 *   - "We know these streets. All of them."
 *   - "Selling or letting, with people who live here too."
 *   - "The agent your landlord already trusts."
 */

export default function HomePage() {
  const years = inWords(yearsTrading())
  const Years = years.charAt(0).toUpperCase() + years.slice(1)

  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), faqPageJsonLd(HOME_FAQS)]} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden surface-harbour-dusk text-on-dark">
        <Grain fixed={false} photo />
        <div
          className="relative mx-auto w-full max-w-content px-6 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44"
          style={{ zIndex: 'var(--z-content)' }}
        >
          <Reveal>
            <Eyebrow tone="on-dark">Lettings . Management . Sales . Solent coast</Eyebrow>
          </Reveal>
          <Reveal as="h1" delay={80} className="mt-5 max-w-4xl text-display">
            {Years} years on <em className="italic text-ochre">this</em> coastline.
          </Reveal>
          <Reveal delay={160} className="mt-6 max-w-xl text-lead text-on-dark/90">
            An independent firm that knows every street from Portchester to Hayling. We
            let, manage and now sell homes across the five towns of this harbour coast,
            with {SITE.managedHomesCopy} in our care.
          </Reveal>

          <Reveal delay={240} className="mt-10">
            <DualPath />
          </Reveal>
        </div>
      </section>

      {/* Hero search, overlapping the hero by roughly 80px */}
      <div className="relative mx-auto -mt-16 w-full max-w-content px-6 md:px-8" style={{ zIndex: 'var(--z-raised)' }}>
        <HeroSearch />
      </div>

      {/* 2. Credibility band */}
      <StatsBand />

      {/* 3. Sales department feature */}
      <SalesFeature />

      {/* 4. Featured properties, register-interest fallback while sales stock is
          empty. Replaced by the Sticky Arch Stack once the property data model
          from prompt 05 carries live listings. */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="grid items-center gap-10 rounded-md border border-brass/40 bg-well p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <Eyebrow>Fresh instructions weekly</Eyebrow>
            <h2 className="mt-3 text-h2">
              Be the first to see what we bring to <em className="italic text-sales-ink">market</em>.
            </h2>
            <p className="measure mt-4 text-lead text-ink-soft">
              New homes to buy and to rent are added every week. Tell us what you are
              looking for and where, and we will send the right ones before they reach the
              portals.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/tenants/register" className="btn btn-lettings">
                Register for lettings
              </Link>
              <Link href="/properties" className="btn btn-secondary">
                Browse current properties
              </Link>
            </div>
          </div>
          <Arch variant="full" className="relative aspect-[4/5] surface-tide">
            <Grain fixed={false} photo />
            <span
              className="absolute bottom-5 left-5 right-5 text-small text-on-dark/85"
              style={{ zIndex: 'var(--z-content)' }}
            >
              Property photography is added with each new instruction.
            </span>
          </Arch>
        </div>
      </section>

      {/* 5. The founder's story. Draft copy in the house voice, for Charisma to
          approve or rewrite. No biographical detail is invented. */}
      <section className="bg-oat">
        <div className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-[5fr_7fr] md:px-8">
          <Arch variant="full" className="relative aspect-[4/5] w-full surface-harbour-dusk">
            <Grain fixed={false} photo />
            <span
              className="absolute bottom-5 left-5 right-5"
              style={{ zIndex: 'var(--z-content)' }}
            >
              <span className="eyebrow text-on-dark/80">Founder and director</span>
              <span className="mt-1 block text-h3 text-on-dark">{SITE.director}</span>
            </span>
          </Arch>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 text-h2">
              A foot on the ground, kept for the <em className="italic text-sales-ink">long</em> term.
            </h2>
            <p className="dropcap measure mt-6 text-body text-ink">
              Pied-à-Terre means a foot on the ground: a small place you keep for the times
              you need to be somewhere. It is the right name for a firm that has stayed on
              one stretch of coast for {years} years rather than chasing growth across a
              county. We learned these towns by working them, one landlord and one home at
              a time.
            </p>
            <p className="measure mt-4 text-body text-ink-soft">
              That is what {years} years on a single patch teaches you: which streets let in
              a week, what a harbour view is really worth, and who to call when a boiler
              fails on a Friday. It is knowledge you cannot buy in from a call centre, and
              it is why landlords stay with us for a decade and more.
            </p>
            <p className="measure mt-4 text-body text-ink-soft">
              [Placeholder for Charisma to approve or rewrite: the specific reason the firm
              was founded, and what she wants a first-time vendor to know before they pick
              up the phone. No detail invented here.]
            </p>
            <p className="signature mt-6 text-h2">{SITE.director}</p>
          </div>
        </div>
      </section>

      {/* 6. Areas we cover */}
      <section className="py-24">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <Eyebrow>Areas we cover</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-h2">
            Five towns, known <em className="italic text-sales-ink">street by street</em>.
          </h2>
        </div>
        <Marquee items={COVERAGE.primary} className="my-12" />
        <div className="mx-auto grid max-w-content gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group rounded-md border border-brass/40 bg-ground p-6 transition-colors hover:bg-well"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-h3">{area.name}</h3>
                <Icon
                  name="arrow-up-right"
                  className="h-5 w-5 text-brass transition-transform group-hover:translate-x-0.5"
                />
              </div>
              <p className="measure mt-2 text-small text-ink-soft">{area.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Reviews. The live Google rail is wired in prompt 10. Until then we do
          not fabricate reviews; we point to the real profile. */}
      <section className="bg-ink text-on-dark">
        <div className="mx-auto flex max-w-content flex-col items-start gap-4 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <Eyebrow tone="on-dark">What our clients say</Eyebrow>
            <p className="mt-3 max-w-xl text-lead text-on-dark/90">
              Our reviews are public on our Google Business Profile, gathered from real
              landlords and tenants across the years.
            </p>
          </div>
          {SITE.urls.googleBusiness ? (
            <Link href={SITE.urls.googleBusiness} className="btn btn-secondary btn-invert">
              Read our Google reviews
            </Link>
          ) : (
            <Link href="/reviews" className="btn btn-secondary btn-invert">
              Read our reviews
            </Link>
          )}
        </div>
      </section>

      {/* 8. How it works */}
      <HowItWorks />

      {/* 9. FAQ preview */}
      <section className="bg-oat">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Good questions</Eyebrow>
              <h2 className="mt-3 text-h2">The things people ask us first</h2>
            </div>
            <Link href="/faqs" className="btn btn-ghost">
              All questions
            </Link>
          </div>
          <div className="mt-10">
            <Faq items={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* 10. Valuation CTA band */}
      <ValuationBand />
    </>
  )
}
