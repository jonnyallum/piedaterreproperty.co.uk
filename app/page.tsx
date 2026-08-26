import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { Icon } from '@/components/primitives/Icon'
import { Arch } from '@/components/primitives/Arch'
import { HeroSearch } from '@/components/lead/HeroSearch'
import { PropertyCard } from '@/components/property/PropertyCard'
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
import { featuredProperties } from '@/lib/properties'

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
  const featured = featuredProperties(3)

  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), faqPageJsonLd(HOME_FAQS)]} />

      {/* 1. Hero: an authentic archive property leads the page. The brand
          illustration remains lower down as supporting editorial artwork. */}
      <section className="home-hero relative isolate overflow-hidden bg-indigo text-on-dark">
        <Image
          src="/images/archive/portfolio__15__monarch-close-waterlooville.jpg"
          alt="Detached red-brick home on Monarch Close, Waterlooville"
          fill
          priority
          sizes="100vw"
          className="home-hero-background object-cover"
        />
        <Grain fixed={false} photo />
        <div
          className="relative mx-auto flex min-h-[inherit] w-full max-w-content items-center px-6 pb-32 pt-36 md:px-8 md:pb-40 md:pt-44"
          style={{ zIndex: 'var(--z-content)' }}
        >
          <div className="home-hero-copy max-w-3xl">
            <Reveal>
              <Eyebrow tone="on-dark">Independent estate agency / established 2011</Eyebrow>
            </Reveal>
            <Reveal as="h1" delay={80} className="mt-6 max-w-3xl text-display">
              Property, with a <em className="italic text-ochre">foot</em> on the ground.
            </Reveal>
            <Reveal delay={160} className="mt-7 max-w-xl text-lead text-on-dark/90">
              We sell, let and look after homes from Portchester to Hayling Island.
              Local knowledge, one steady team, and {years} years of relationships on
              this coast.
            </Reveal>
            <Reveal delay={220} className="mt-9 flex flex-wrap gap-4">
              <Link href="/sales/free-valuation" className="btn btn-sales">
                Value my home
              </Link>
              <Link href="/properties" className="btn btn-secondary btn-invert">
                Explore properties
              </Link>
            </Reveal>
            <Reveal delay={280} className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-brass/50 pt-6">
              <p className="text-small text-on-dark/75">
                <span className="font-display text-h3 tabular text-on-dark">{Years}</span>
                <span className="mt-1 block">years trading locally</span>
              </p>
              <p className="text-small text-on-dark/75">
                <span className="font-display text-h3 tabular text-on-dark">{SITE.managedHomesCopy}</span>
                <span className="mt-1 block">trusted to our care</span>
              </p>
            </Reveal>
          </div>
        </div>
        <p className="home-hero-credit" style={{ zIndex: 'var(--z-content)' }}>
          Monarch Close, Waterlooville / from our property archive
        </p>
      </section>

      {/* Hero search, overlapping the hero by roughly 80px */}
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

      {/* 5. The founder's story. No invented biography or visual placeholder. */}
      <section className="surface-paper-muted">
        <div className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-[5fr_7fr] md:px-8">
          <Arch variant="full" className="relative aspect-[4/5] w-full bg-indigo">
            <Image
              src="/images/brand/solent-coast-risograph.png"
              alt="Solent coast artwork with a house, harbour and sea holly"
              fill
              priority
              sizes="(max-width: 48rem) 100vw, 42vw"
              className="object-cover"
            />
            <span className="absolute inset-x-5 bottom-5 rounded-md bg-night/90 p-4 text-on-dark">
              <span className="eyebrow text-on-dark/80">Independent since 2011</span>
              <span className="mt-1 block text-h3 text-on-dark">Led by {SITE.director}</span>
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
      <section className="bg-night text-on-dark">
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

      {/* 10. Valuation CTA band */}
      <ValuationBand />
    </>
  )
}
