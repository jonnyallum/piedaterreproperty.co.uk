import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { Grain } from '@/components/primitives/Grain'
import { Icon } from '@/components/primitives/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { AREAS } from '@/content/areas'
import { areaSlugs } from '@/content/areas/pages'
import { COVERAGE } from '@/lib/site'
import { pageMeta, realEstateAgentJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Areas we cover across the South Coast and Hampshire',
  description:
    'Estate and letting agency coverage from Southampton through Fareham and Portsmouth to Havant, Emsworth and Chichester, plus the surrounding Hampshire towns.',
  path: '/areas',
})

/** A tint per card so the arch grid does not read as one flat block. */
const TINTS = ['surface-tide', 'surface-harbour-dusk', 'surface-tide', 'surface-harbour-dusk', 'surface-tide']

export default function AreasPage() {
  const live = new Set(areaSlugs())
  return (
    <>
      <JsonLd data={realEstateAgentJsonLd()} />
      <PageHero
        tone="neutral"
        eyebrow="Areas we cover"
        trail={[{ name: 'Areas', path: '/areas' }]}
        title={
          <>
            Southampton to Chichester, with{' '}
            <em className="italic">Hampshire at our back</em>.
          </>
        }
        lead="Our established heartland runs through Portsmouth, Havant and the eastern Solent. Today we also work west towards Southampton, east to Chichester and inland through Hampshire."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-h2">Our local area guides</h2>
          <p className="measure mt-3 text-body text-ink-soft">
            These five detailed guides cover the places where our original lettings book was
            built. Each town appears once, with the broader service area set out below.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area, i) => {
            const hasPage = live.has(area.slug)
            const inner = (
              <>
                <div className={`property-media arch-shallow relative aspect-[4/3] ${TINTS[i % TINTS.length]} text-on-dark`}>
                  <Grain fixed={false} photo />
                  <div
                    className="absolute inset-0 flex items-end p-5"
                    style={{ zIndex: 'var(--z-content)' }}
                  >
                    <span className="font-display text-h2 leading-none">{area.name}</span>
                  </div>
                </div>
                <p className="measure mt-4 text-body text-ink-soft">{area.blurb}</p>
                {hasPage ? (
                  <span className="mt-3 inline-flex items-center gap-2 text-small font-medium text-sales-ink">
                    Estate and letting agents in {area.name}
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="mt-3 inline-block text-small text-ink-soft">Area guide coming soon</span>
                )}
              </>
            )
            return hasPage ? (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="property-card group block focus-visible:outline-none"
              >
                {inner}
              </Link>
            ) : (
              <div key={area.slug} className="property-card block">
                {inner}
              </div>
            )
          })}
        </div>

        <div className="mt-16 border-t-[length:var(--pane-gap)] border-ink pt-10">
          <h2 className="text-h2">Across the wider South Coast</h2>
          <p className="measure mt-2 text-body text-ink-soft">
            Our working corridor extends west to Southampton and east to Chichester, taking in
            the towns and city neighbourhoods around the Solent.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {COVERAGE.wider.map((place) => (
              <li key={place} className="rounded-sm border-[length:var(--pane-gap)] border-ink bg-ground px-3 py-1.5 text-small text-ink">
                {place}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t-[length:var(--pane-gap)] border-ink pt-10">
          <h2 className="text-h3">Hampshire towns, villages and suburbs</h2>
          <p className="measure mt-2 text-body text-ink-soft">
            We also let, manage and sell across the surrounding communities. If your street sits
            between the coast and the South Downs, ask us rather than assuming it is outside our area.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
            {COVERAGE.secondary.map((place) => (
              <li key={place} className="rounded-sm border-[length:var(--pane-gap)] border-ink bg-well px-3 py-1.5 text-small text-ink">
                {place}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t-[length:var(--pane-gap)] border-ink bg-oat">
        <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-h2">Thinking of moving, letting or selling?</h2>
            <p className="measure mt-2 text-body text-ink-soft">
              A free, honest valuation from a local agent who knows your street.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/sales/free-valuation" className="btn btn-sales">
              Sell with us
            </Link>
            <Link href="/lettings/rental-valuation" className="btn btn-lettings">
              Let with us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
