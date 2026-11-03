import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Reveal } from '@/components/primitives/Reveal'
import { Icon } from '@/components/primitives/Icon'
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
import { Cell, MullionGrid } from '@/components/primitives/Mullion'
import { SectionBar } from '@/components/primitives/SectionBar'
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
          <SectionBar label="What we do" index="01" />
          <ul className="mt-8">
            {SERVICES.map((row, i) => (
              <li key={row.title}>
                <Link
                  href={row.href}
                  className="group -mx-6 grid items-baseline gap-x-8 gap-y-3 border-t-[length:var(--pane-gap)] border-night px-6 py-8 transition-colors duration-300 hover:bg-ochre focus-visible:bg-ochre md:-mx-8 md:grid-cols-[4rem_1fr_20rem_2rem] md:px-8 md:py-10"
                >
                  <span className="eyebrow tabular">0{i + 1}</span>
                  <span className="text-index font-display">
                    {row.title} <em>{row.accent}</em>
                  </span>
                  <span className="text-body text-ink-soft group-hover:text-ink">
                    {row.copy}
                  </span>
                  <Icon name="arrow-up-right" className="hidden h-7 w-7 transition-transform group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            ))}
            <li className="border-t-[length:var(--pane-gap)] border-night" aria-hidden="true" />
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
          <SectionBar label="Real homes" index="04" aside={<Link href="/properties">View all</Link>} />
          <div className="mt-8 grid items-end gap-6 md:grid-cols-12">
            <h2 className="text-title md:col-span-9">
              Real homes. Real <em>local</em> work.
            </h2>
            <div className="md:col-span-3 md:text-right">
              <Link href="/properties" className="btn btn-sales">
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
        <div className="mx-auto max-w-content">
          <MullionGrid className="md:grid-cols-2">
            <Cell ground="yellow" className="flex flex-col justify-between gap-10 md:p-12">
              <p className="eyebrow font-bold">Tenant portal</p>
              <div>
                <h2 className="max-w-md text-title">Something broken? Tell us in thirty seconds.</h2>
                <p className="measure mt-5 text-lead">
                  Log in, photograph the problem, say how urgent it is and watch it get fixed.
                  Every update in one place.
                </p>
                <Link href="/tenants/report-maintenance" className="btn btn-sales mt-8">
                  Report a repair
                </Link>
              </div>
            </Cell>
            <Cell ground="black" className="md:p-12">
              <div aria-label="Example of the tenant portal">
                <p className="eyebrow text-ochre">Your issues, example</p>
                <ul className="mt-4 border-t-[length:var(--pane-gap)] border-ochre">
                  {[
                    ['Boiler pressure dropping', 'Raised 28 October', 'Engineer booked'],
                    ['Bathroom extractor fan', 'Raised 12 October', 'Fixed'],
                    ['Gutter at the back', 'Raised 2 November', 'Received'],
                  ].map(([title, when, status]) => (
                    <li
                      key={title}
                      className="flex items-center justify-between gap-4 border-b-[length:var(--pane-gap)] border-ochre py-4"
                    >
                      <span>
                        <span className="block font-display text-h3 uppercase">{title}</span>
                        <span className="text-small text-on-dark/70">{when}</span>
                      </span>
                      <span className="bg-ochre px-3 py-1 text-small font-bold uppercase tracking-[0.08em] text-ink">
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Cell>
          </MullionGrid>
        </div>
      </section>

      {/* 5. The founder's story, as an editorial spread with an offset portrait. */}
      <section className="surface-paper-muted">
        <div className="mx-auto grid max-w-content gap-x-12 gap-y-14 px-6 py-24 md:px-8 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <SectionBar label="Our story" index="06" />
            <h2 className="mt-8 text-title">
              A foot on the ground, kept for the <em>long</em> term.
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
          <div className="relative aspect-[3/4] w-full border-[length:var(--pane-gap)] border-night bg-night lg:col-span-5 lg:mt-24">
            <Image
              src="/images/team/charisma-smith.jpg"
              alt="Charisma Smith, founder and director of Pied-à-Terre Property"
              fill
              sizes="(max-width: 64rem) 100vw, 40vw"
              className="object-cover object-top"
            />
            <span className="absolute bottom-0 left-0 bg-ochre px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
              Charisma Smith, founder
            </span>
          </div>
        </div>
      </section>

      {/* 6. Areas we cover, as a typographic index. */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <SectionBar label="Areas we cover" index="07" />
          <h2 className="mt-8 max-w-5xl text-title">
            From Southampton to Chichester, across the <em>South Coast and Hampshire</em>.
          </h2>
          <MullionGrid as="ul" className="mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area, i) => (
              <li key={area.slug} className="bg-ground">
                <Link
                  href={`/areas/${area.slug}`}
                  className="group flex h-full min-h-52 flex-col justify-between p-6 transition-colors hover:bg-ochre focus-visible:bg-ochre"
                >
                  <span className="flex items-start justify-between">
                    <span className="tabular eyebrow">{String(i + 1).padStart(2, '0')}</span>
                    <Icon
                      name="arrow-up-right"
                      className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                  <span>
                    <span className="block break-words font-display text-h2 uppercase leading-[0.9]">
                      {area.name}
                    </span>
                    <span className="mt-2 block text-small text-ink-soft group-hover:text-ink">
                      {area.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="bg-ochre">
              <Link
                href="/areas"
                className="group flex h-full min-h-52 flex-col justify-between p-6 transition-colors hover:bg-night hover:text-ochre"
              >
                <Icon
                  name="arrow-up-right"
                  className="h-6 w-6 self-end transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
                <span className="font-display text-h2 uppercase leading-[0.9]">
                  Explore all our coverage
                </span>
              </Link>
            </li>
          </MullionGrid>
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
              <SectionBar label="Good questions" index="08" className="max-w-md" />
              <h2 className="mt-6 text-title">The things people ask us first</h2>
            </div>
            <Link href="/faqs" className="btn btn-secondary">
              All questions
            </Link>
          </div>
          <div className="mt-10">
            <Faq items={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* 9. Verified Google feedback and the continuous review rail. */}
      <section className="overflow-hidden surface-paper py-24">
        <div className="mx-auto max-w-content px-6 md:px-8">
          <SectionBar label="Google reviews" index="09" />
          <div className="mt-8">
            <ReviewsSection heading="What our customers said on Google" />
          </div>
        </div>
      </section>

      {/* 10. Valuation CTA band */}
      <ValuationBand />
    </>
  )
}
