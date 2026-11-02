import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { Icon } from '@/components/primitives/Icon'
import { Arch } from '@/components/primitives/Arch'
import { HeroSearch } from '@/components/lead/HeroSearch'
import { PropertyCard } from '@/components/property/PropertyCard'
import { StatsBand } from '@/components/marketing/StatsBand'
import { SalesFeature } from '@/components/marketing/SalesFeature'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { ReviewsSection } from '@/components/marketing/ReviewsSection'
import { Faq } from '@/components/marketing/Faq'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { JsonLd } from '@/components/seo/JsonLd'
import { AREAS } from '@/content/areas'
import { HOME_FAQS } from '@/content/faqs'
import { SITE, COVERAGE, yearsTrading } from '@/lib/site'
import { inWords } from '@/lib/format'
import { realEstateAgentJsonLd, faqPageJsonLd, pageMeta } from '@/lib/seo'
import { featuredProperties } from '@/lib/properties'

/**
 * Home metadata. The canonical, robots and social card come from pageMeta so the
 * home page is pinned to the production domain like every other page. The title
 * is set absolute, bypassing the brand template, to the primary target query.
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: 'Estate and letting agents across the South Coast and Hampshire',
    description:
      'Independent estate and letting agents across the South Coast and Hampshire since 2011, from Southampton and Fareham to Portsmouth, Havant and Chichester.',
    path: '/',
  }),
  title: {
    absolute: 'Estate and letting agents across the South Coast and Hampshire | Pied-à-Terre Property',
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
  const featured = featuredProperties(3)

  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), faqPageJsonLd(HOME_FAQS)]} />

      {/* 1. Hero: calm paper ground, a tall arched photograph of a real home we
          look after, and the search pill overlapping it. */}
      <section className="relative">
        <div className="mx-auto grid w-full max-w-content items-end gap-12 px-6 pb-28 pt-28 md:px-8 md:pb-32 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="font-bold text-sales-ink">
                Independent / Portchester / Since 2011
              </Eyebrow>
            </Reveal>
            <h1 className="mt-6 text-display">
              A foot on <em className="italic text-sales">the ground</em> of the Solent.
            </h1>
            <Reveal delay={160} className="mt-8 max-w-xl text-lead text-ink-soft">
              We sell, let and look after homes from Southampton to Chichester. Local
              knowledge, one steady team, and {years} years of relationships on this coast.
            </Reveal>
            <Reveal delay={220} className="mt-10 flex flex-wrap gap-4">
              <Link href="/sales/free-valuation" className="btn btn-sales">
                Value my home
              </Link>
              <Link href="/properties" className="btn btn-secondary">
                Explore homes
              </Link>
            </Reveal>
            <Reveal delay={280} className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-brass/40 pt-6">
              <p className="text-small text-ink-soft">
                <span className="font-display text-h2 tabular text-ink">{Years}</span>
                <span className="mt-1 block">years trading locally</span>
              </p>
              <p className="text-small text-ink-soft">
                <span className="font-display text-h3 tabular text-ink">{SITE.managedHomesCopy}</span>
                <span className="mt-1 block">trusted to our care</span>
              </p>
            </Reveal>
          </div>
          <Arch variant="full" className="home-hero-arch relative aspect-[4/5] w-full bg-well">
            <Image
              src="/images/archive/portfolio__15__monarch-close-waterlooville.jpg"
              alt="Detached red-brick home on Monarch Close, Waterlooville"
              fill
              priority
              sizes="(max-width: 64rem) 100vw, 46vw"
              className="object-cover"
            />
            <span className="absolute bottom-5 left-5 rounded-full bg-ground px-4 py-2 text-small font-bold text-ink">
              Monarch Close, Waterlooville
            </span>
          </Arch>
        </div>
      </section>

      {/* Hero search, overlapping the hero */}
      <div className="relative mx-auto -mt-16 w-full max-w-content px-6 md:px-8" style={{ zIndex: 'var(--z-raised)' }}>
        <HeroSearch />
      </div>

      {/* 2. Credibility band */}
      <StatsBand />

      {/* 3. Sales department feature */}
      <SalesFeature />

      {/* 4. Real property photography from Pied-à-Terre's own archive. */}
      <section className="surface-paper py-28">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Homes in our care</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-h1">
                Real homes. Real <em className="italic text-sales-ink">local</em> work.
              </h2>
              <p className="measure mt-4 text-lead text-ink-soft">
                A selection from our property archive, photographed on the streets and in
                the homes we know. Availability is shown on each property.
              </p>
            </div>
            <Link href="/properties" className="btn btn-secondary shrink-0">
              View all properties
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Tenant portal teaser: the portal itself is built after sign-off, so
          this routes to the working repair route today. The list is an example. */}
      <section className="px-6 py-8 md:px-8">
        <div className="mx-auto grid max-w-content items-center gap-12 rounded-[2rem] bg-sales px-8 py-14 text-on-dark md:grid-cols-2 md:px-14 md:py-16">
          <div>
            <p className="eyebrow text-on-dark/80">Tenant portal</p>
            <h2 className="mt-4 max-w-md text-h1">Something broken? Tell us in thirty seconds.</h2>
            <p className="measure mt-5 text-lead text-on-dark/90">
              Log in, photograph the problem, say how urgent it is and watch it get fixed.
              Every update in one place.
            </p>
            <Link href="/tenants/report-maintenance" className="btn mt-8 bg-ground text-ink">
              Report a repair
            </Link>
          </div>
          <div className="rounded-[1.5rem] bg-ground p-6 text-ink shadow-warm-lg" aria-label="Example of the tenant portal">
            <p className="eyebrow text-ink-soft">Your issues, example</p>
            <ul>
              {[
                ['Boiler pressure dropping', 'Raised 28 October', 'Engineer booked'],
                ['Bathroom extractor fan', 'Raised 12 October', 'Fixed'],
                ['Gutter at the back', 'Raised 2 November', 'Received'],
              ].map(([title, when, status]) => (
                <li key={title} className="flex items-center justify-between gap-4 border-b border-brass/30 py-4 last:border-0">
                  <span>
                    <span className="block text-body">{title}</span>
                    <span className="text-small text-ink-soft">{when}</span>
                  </span>
                  <span className="rounded-full bg-hover px-3 py-1 text-small font-bold text-sales-ink">
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. The founder's story. No invented biography or visual placeholder. */}
      <section className="surface-paper-muted">
        <div className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-[5fr_7fr] md:px-8">
          <Arch variant="full" className="founder-portrait relative aspect-[4/5] w-full bg-indigo">
            <Image
              src="/images/team/charisma-smith.jpg"
              alt="Charisma Smith, founder and director of Pied-à-Terre Property"
              fill
              sizes="(max-width: 48rem) 100vw, 42vw"
              className="object-contain object-top"
            />
            <span className="absolute inset-x-4 bottom-4 rounded-md bg-night/90 p-3 text-on-dark md:inset-x-5 md:bottom-5 md:p-4">
              <span className="eyebrow text-on-dark/80">Independent since 2011</span>
              <span className="mt-1 block text-body font-medium text-on-dark md:text-h3">
                Led by {SITE.directorDisplay}
              </span>
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
              Today we bring the same patient, personal approach to sales: clear advice,
              proper follow-through, and a familiar person at the end of the phone. The
              business has grown into two disciplines without losing the thing that made
              landlords trust it in the first place.
            </p>
            <p className="signature mt-6 text-h2">{SITE.directorDisplay}</p>
          </div>
        </div>
      </section>

      {/* 6. Areas we cover */}
      <section className="py-24">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <Eyebrow>Areas we cover</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-h2">
            From Southampton to Chichester, across the{' '}
            <em className="italic text-sales-ink">South Coast and Hampshire</em>.
          </h2>
          <p className="measure mt-4 text-lead text-ink-soft">
            Our detailed guides begin with the five places at the heart of our original
            lettings patch. Our working area now follows the coast in both directions.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-12 border-t border-brass/30 pt-8">
            <Eyebrow>Wider coastal coverage</Eyebrow>
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Wider areas covered">
              {COVERAGE.wider.map((place) => (
                <li
                  key={place}
                  className="rounded-sm border border-brass/40 bg-well px-3 py-2 text-small text-ink"
                >
                  {place}
                </li>
              ))}
            </ul>
            <Link href="/areas" className="btn btn-ghost mt-5">
              Explore our full coverage
            </Link>
          </div>
        </div>
      </section>

      {/* 7. How it works */}
      <HowItWorks />

      {/* 8. FAQ preview */}
      <section className="surface-paper-muted">
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

      {/* 9. Verified Google feedback and the continuous review rail. */}
      <section className="overflow-hidden border-y border-brass/30 surface-paper py-24">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <Eyebrow>Google reviews</Eyebrow>
          <div className="mt-4">
            <ReviewsSection heading="What our customers said on Google" />
          </div>
        </div>
      </section>

      {/* 10. Valuation CTA band */}
      <ValuationBand />
    </>
  )
}
