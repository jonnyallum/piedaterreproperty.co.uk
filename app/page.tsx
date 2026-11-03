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
import { Marquee } from '@/components/marketing/Marquee'
import { Skyline } from '@/components/marketing/Skyline'
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

const STREET = [
  {
    src: '/images/archive/portfolio__15__monarch-close-waterlooville.jpg',
    alt: 'Detached red-brick home on Monarch Close, Waterlooville',
    label: 'Waterlooville',
    priority: true,
  },
  {
    src: '/images/archive/portfolio__02__wallis-road-waterlooville.jpg',
    alt: 'Double bay-fronted house on Wallis Road, Waterlooville',
    label: 'Waterlooville',
    priority: true,
  },
  {
    src: '/images/archive/portfolio__04__bevan-road-lovedean.jpg',
    alt: 'Semi-detached house with a garage on Bevan Road, Lovedean',
    label: 'Lovedean',
    priority: false,
  },
  {
    src: '/images/archive/portfolio__70__the-curve-lovedean.jpg',
    alt: 'Chalet bungalow on The Curve, Lovedean',
    label: 'Lovedean',
    priority: false,
  },
] as const

const SERVICES = [
  {
    title: 'Sell',
    accent: 'with us',
    href: '/sales',
    copy: 'Our sales department is opening soon. Register your interest and hear first.',
  },
  {
    title: 'Rent',
    accent: 'a home',
    href: '/tenants',
    copy: 'Find a home, register with us, and report repairs, all in one place.',
  },
  {
    title: 'Let',
    accent: 'yours',
    href: '/lettings',
    copy: 'Lettings and management from people who have done it on this coast since 2011.',
  },
] as const

export default function HomePage() {
  const years = inWords(yearsTrading())
  const Years = years.charAt(0).toUpperCase() + years.slice(1)
  const featured = featuredProperties(3)

  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), faqPageJsonLd(HOME_FAQS)]} />

      {/* 1. Hero: a full-width headline, then a "street" of four arched doorways
          photographed on real homes we look after, standing on one ground line. */}
      <section className="surface-harbour-dusk text-on-dark">
        <div className="mx-auto w-full max-w-content px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
          <Reveal className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
            <Eyebrow className="font-bold text-ochre">
              Estate and letting agents / Portchester / Since 2011
            </Eyebrow>
            <a href={SITE.phone.href} className="eyebrow tabular text-on-dark">
              {SITE.phone.display}
            </a>
          </Reveal>
          <h1 className="mt-8 text-hero">
            A foot on
            <br />
            <span className="block pl-[8vw] md:pl-[14vw]">
              the <em className="italic text-ochre">ground.</em>
            </span>
          </h1>
          <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
            <Reveal delay={120} className="text-lead text-on-dark md:col-span-5">
              We sell, let and look after homes from Southampton to Chichester. Local
              knowledge, one steady team, and {years} years of relationships on this coast.
            </Reveal>
            <Reveal delay={180} className="flex flex-wrap gap-4 md:col-span-7 md:justify-end">
              <Link href="/sales/free-valuation" className="btn btn-sales">
                Value my home
              </Link>
              <Link href="/properties" className="btn btn-secondary btn-invert">
                Explore homes
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Golden hour over Portsmouth: a flat yellow sky, a low sun, the skyline
            (Spinnaker Tower included) cut out in black. */}
        <div className="relative h-[17rem] overflow-hidden bg-ochre md:h-[26rem]" aria-hidden="true">
          <div
            className="absolute bottom-[-4rem] left-[78%] h-[16rem] w-[16rem] -translate-x-1/2 rounded-full md:left-[58%] md:bottom-[-8rem] md:h-[40rem] md:w-[40rem]"
            style={{ background: 'var(--pt-bone)' }}
          />
          <Skyline className="absolute inset-x-0 bottom-0 h-full w-full text-ink" />
        </div>
      </section>

      {/* The window row: four homes as panes, one frame, hairline mullions. */}
      <section className="surface-paper">
        <ul
          className="mx-auto grid w-full max-w-content grid-cols-2 gap-[var(--pane-gap)] bg-ink p-[var(--pane-gap)] md:grid-cols-4"
          aria-label="Homes we look after"
        >
          {STREET.map((door) => (
            <li key={door.src} className="pane relative aspect-[3/4] overflow-hidden bg-well">
              <Image
                src={door.src}
                alt={door.alt}
                fill
                priority={door.priority}
                sizes="(max-width: 48rem) 50vw, 25vw"
                className="object-cover"
              />
              <span className="absolute bottom-0 left-0 z-10 bg-ochre px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
                {door.label}
              </span>
            </li>
          ))}
        </ul>
        <div className="relative mx-auto mt-10 w-full max-w-content px-6 pb-4 md:px-8" style={{ zIndex: 'var(--z-raised)' }}>
          <HeroSearch />
        </div>
      </section>

      {/* Marquee of the towns we work in. */}
      <Marquee items={COVERAGE.wider} className="bg-sales" />

      {/* 1b. What we do, as an index. Large type rows that fill with blue. */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <Eyebrow>What we do</Eyebrow>
          <ul className="mt-8">
            {SERVICES.map((row, i) => (
              <li key={row.title}>
                <Link
                  href={row.href}
                  className="group -mx-6 grid items-baseline gap-x-8 gap-y-3 border-t-2 border-ink px-6 py-8 transition-colors duration-300 hover:bg-sales hover:text-on-dark focus-visible:bg-sales focus-visible:text-on-dark md:-mx-8 md:grid-cols-[4rem_1fr_20rem_2rem] md:px-8 md:py-10"
                >
                  <span className="eyebrow tabular">0{i + 1}</span>
                  <span className="text-index font-display">
                    {row.title} <em className="italic text-sales group-hover:text-ochre group-focus-visible:text-ochre">{row.accent}</em>
                  </span>
                  <span className="text-body text-ink-soft group-hover:text-on-dark/90 group-focus-visible:text-on-dark/90">
                    {row.copy}
                  </span>
                  <Icon name="arrow-up-right" className="hidden h-7 w-7 transition-transform group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            ))}
            <li className="border-t-2 border-ink" aria-hidden="true" />
          </ul>
        </div>
      </section>

      {/* 2. Credibility band */}
      <StatsBand />

      {/* 3. Sales department feature */}
      <SalesFeature />

      {/* 4. Real homes, set out as an asymmetric spread: one large, two small. */}
      <section className="surface-paper pb-28 pt-8">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <div className="grid items-end gap-6 md:grid-cols-12">
            <h2 className="text-h1 md:col-span-8">
              Real homes. Real <em className="italic text-sales-ink">local</em> work.
            </h2>
            <div className="md:col-span-4 md:text-right">
              <Link href="/properties" className="btn btn-secondary">
                View all properties
              </Link>
            </div>
          </div>
          <p className="measure mt-4 text-lead text-ink-soft">
            A selection from our property archive, photographed on the streets and in the
            homes we know. Availability is shown on each property.
          </p>
          <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-12">
            {featured[0] ? (
              <div className="lg:col-span-7">
                <PropertyCard property={featured[0]} feature />
              </div>
            ) : null}
            <div className="grid gap-y-14 lg:col-span-5 lg:pt-24">
              {featured.slice(1).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tenant portal teaser: the portal itself is built after sign-off, so
          this routes to the working repair route today. The list is an example. */}
      <section className="px-6 py-8 md:px-8">
        <div className="mx-auto grid max-w-content items-center gap-12 rounded-none bg-sales px-8 py-14 text-on-dark md:grid-cols-2 md:px-14 md:py-16">
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
                  <span className="rounded-none bg-hover px-3 py-1 text-small font-bold text-sales-ink">
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. The founder's story, as an editorial spread with an offset portrait. */}
      <section className="surface-paper-muted">
        <div className="mx-auto grid max-w-content gap-x-12 gap-y-14 px-6 py-24 md:px-8 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-4 text-h1">
              A foot on the ground, kept for the <em className="italic text-sales-ink">long</em> term.
            </h2>
            <p className="dropcap measure mt-10 text-lead text-ink">
              Pied-à-Terre means a foot on the ground: a small place you keep for the times
              you need to be somewhere. It is the right name for a firm that has stayed on
              one stretch of coast for {years} years rather than chasing growth across a
              county. We learned these towns by working them, one landlord and one home at
              a time.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <p className="text-body text-ink-soft">
                That is what {years} years on a single patch teaches you: which streets let in
                a week, what a harbour view is really worth, and who to call when a boiler
                fails on a Friday. It is knowledge you cannot buy in from a call centre, and
                it is why landlords stay with us for a decade and more.
              </p>
              <p className="text-body text-ink-soft">
                Today we bring the same patient, personal approach to sales: clear advice,
                proper follow-through, and a familiar person at the end of the phone. The
                business has grown into two disciplines without losing the thing that made
                landlords trust it in the first place.
              </p>
            </div>
            <p className="signature mt-8 text-h2">{SITE.directorDisplay}</p>
          </div>
          <Arch variant="full" className="relative aspect-[3/4] w-full bg-indigo lg:col-span-5 lg:mt-24">
            <Image
              src="/images/team/charisma-smith.jpg"
              alt="Charisma Smith, founder and director of Pied-à-Terre Property"
              fill
              sizes="(max-width: 64rem) 100vw, 40vw"
              className="object-cover object-top"
            />
          </Arch>
        </div>
      </section>

      {/* 6. Areas we cover, as a typographic index. */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <Eyebrow>Areas we cover</Eyebrow>
          <h2 className="mt-4 max-w-4xl text-h1">
            From Southampton to Chichester, across the{' '}
            <em className="italic text-sales-ink">South Coast and Hampshire</em>.
          </h2>
          <ul className="mt-14">
            {AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-2 border-t border-ink/30 py-6 transition-colors hover:border-ink md:grid-cols-[1fr_24rem_2rem]"
                >
                  <span className="text-h1 font-display transition-transform duration-300 group-hover:translate-x-3 group-hover:italic group-hover:text-sales-ink">
                    {area.name}
                  </span>
                  <span className="text-small text-ink-soft">{area.blurb}</span>
                  <Icon name="arrow-up-right" className="hidden h-6 w-6 text-ink md:block" />
                </Link>
              </li>
            ))}
            <li className="border-t border-ink/30" aria-hidden="true" />
          </ul>
          <p className="mt-10 max-w-3xl text-lead text-ink-soft">
            Also across the wider coast: {COVERAGE.wider.join(', ')}.
          </p>
          <Link href="/areas" className="btn btn-secondary mt-8">
            Explore our full coverage
          </Link>
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
