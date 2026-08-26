import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { StatsBand } from '@/components/marketing/StatsBand'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import {
  SERVICE_LEVELS,
  WHY_CHOOSE_US_POINTS,
  MANAGEMENT_DIFFERENCE,
  LANDLORD_OBLIGATIONS,
} from '@/content/lettings'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Lettings and management for landlords',
  description:
    'Fifteen years letting and managing homes on the Solent coast. Tenant find, rent collection and fully managed, with client money protection and honest service.',
  path: '/lettings',
})

export default function LettingsHubPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Landlords"
        trail={[{ name: 'Landlords', path: '/lettings' }]}
        title={
          <>
            The landlord book that <em className="italic text-ochre">stays</em>.
          </>
        }
        lead="Fifteen years of letting and managing homes on one patch, with the same people, the same care, and landlords who stay with us for a decade and more."
      >
        <Button href="/lettings/rental-valuation" variant="lettings">
          Book a rental valuation
        </Button>
        <Button href="/lettings/why-choose-us" variant="secondary" className="btn-invert">
          Why choose us
        </Button>
      </PageHero>

      {/* Service levels */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="max-w-2xl">
          <Eyebrow>The offer in one glance</Eyebrow>
          <h2 className="mt-3 text-h2">Three levels of service</h2>
          <p className="measure mt-4 text-lead text-ink-soft">
            From finding a tenant to looking after everything, choose the level that suits
            you. Fees are set out in full on the fees page, with VAT stated.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICE_LEVELS.map((level, i) => (
            <div
              key={level.name}
              className={`flex flex-col rounded-md border p-7 ${
                i === 2 ? 'border-lettings bg-well' : 'border-brass/40 bg-ground'
              }`}
            >
              <h3 className="text-h3">{level.name}</h3>
              <p className="measure mt-2 text-small text-ink-soft">{level.summary}</p>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {level.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-small text-ink">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lettings" />
                    {inc}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-brass/40 pt-4 text-small text-ink-soft">
                {level.fee}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/lettings/fees" className="btn btn-secondary">
            See fees and service levels
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-oat">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="mt-3 text-h2">
              We work for the <em className="italic text-lettings">rent</em>, not just the advert
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US_POINTS.map((p) => (
              <div key={p.title} className="border-t border-brass/40 pt-5">
                <h3 className="text-h3">{p.title}</h3>
                <p className="measure mt-2 text-body text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/lettings/why-choose-us" className="btn btn-ghost">
              Read the full case
            </Link>
          </div>
        </div>
      </section>

      {/* Management difference */}
      <section className="bg-night text-on-dark">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <Eyebrow tone="on-dark">Fully managed</Eyebrow>
              <h2 className="mt-3 text-h2">What management means, day to day</h2>
              <p className="measure mt-4 text-body text-on-dark/85">
                Fully managed is not a line on an invoice. It is the work that keeps a good
                tenant, protects your asset and gives you back your evenings.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {MANAGEMENT_DIFFERENCE.map((m) => (
                <li key={m} className="flex items-start gap-3 border-l-2 border-brass pl-4 text-body text-on-dark">
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance summary */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Compliance for landlords</Eyebrow>
          <h2 className="mt-3 text-h2">Your legal obligations, in plain terms</h2>
          <p className="measure mt-4 text-lead text-ink-soft">
            Letting a home comes with real responsibilities. Here is a current summary,
            with the full detail on the obligations page.
          </p>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {LANDLORD_OBLIGATIONS.items.slice(0, 6).map((o) => (
            <li key={o.title} className="flex items-start gap-3 text-body text-ink">
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-lettings" />
              <span>{o.title}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/lettings/landlord-obligations" className="btn btn-secondary">
            Read landlord obligations
          </Link>
        </div>
      </section>

      {/* Proof band */}
      <StatsBand />

      {/* Sales cross-link, the only warm element */}
      <section className="mx-auto max-w-content px-6 py-16 md:px-8">
        <div className="flex flex-col items-start gap-4 rounded-md border border-sales/40 bg-well p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow>Thinking of selling instead?</Eyebrow>
            <p className="mt-2 max-w-xl text-body text-ink-soft">
              We are opening a residential sales department, built on the same fifteen years
              of local knowledge.
            </p>
          </div>
          <Link href="/sales" className="btn btn-sales shrink-0">
            Selling with us
          </Link>
        </div>
      </section>

      <ValuationBand
        tone="lettings"
        heading="Find out what your property could let for"
        copy="A realistic rental valuation from people who let homes on your street. No obligation."
        cta="Book a rental valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
