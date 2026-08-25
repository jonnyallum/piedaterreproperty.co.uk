import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { Pillars } from '@/components/marketing/Pillars'
import { StatsBand } from '@/components/marketing/StatsBand'
import { Faq } from '@/components/marketing/Faq'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Button } from '@/components/primitives/Button'
import { BrassRule } from '@/components/primitives/BrassRule'
import { Icon } from '@/components/primitives/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { SALES_PILLARS, VALUATION_STEPS, SALES_FAQS } from '@/content/sales'
import { SALES_LIVE, yearsTrading } from '@/lib/site'
import { inWords } from '@/lib/format'
import { pageMeta, faqPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: SALES_LIVE
    ? 'Selling your home with a local agent'
    : 'Selling with us, opening soon',
  description:
    'Fifteen years on this coast, now selling homes across Havant, Portsmouth, Waterlooville, Emsworth and Hayling Island. Book a free, honest valuation.',
  path: '/sales',
})

export default function SalesHubPage() {
  const years = inWords(yearsTrading())
  const registerCta = SALES_LIVE ? 'Book a free valuation' : 'Register your interest'

  return (
    <>
      <JsonLd data={faqPageJsonLd(SALES_FAQS)} />

      {/* 1. Hero */}
      <PageHero
        tone="sales"
        eyebrow={SALES_LIVE ? 'Selling with us' : 'Selling with us, opening soon'}
        trail={[{ name: 'Selling', path: '/sales' }]}
        title={
          <>
            {years.charAt(0).toUpperCase() + years.slice(1)} years letting them.{' '}
            <em className="italic text-ochre">
              {SALES_LIVE ? 'Now selling them too.' : 'Soon selling them too.'}
            </em>
          </>
        }
        lead={
          SALES_LIVE
            ? 'The same care, the same faces, from valuation to completion. Selling a home on this coast should feel like dealing with someone who lives here too.'
            : 'We are completing our estate agency registrations now. Register your interest and we will contact you the week we open, with a free market appraisal ready to arrange.'
        }
      >
        <Button href="/sales/free-valuation" variant="sales">
          {registerCta}
        </Button>
        <Button href="/sales/how-we-sell" variant="secondary" className="btn-invert">
          How we sell
        </Button>
      </PageHero>

      {/* 2. The three pillars */}
      <Pillars
        eyebrow="Why instruct a firm this small"
        heading={
          <>
            New to sales. Not new to <em className="italic text-sales-ink">these streets</em>.
          </>
        }
        items={SALES_PILLARS}
      />

      {/* 3. What your valuation actually involves */}
      <section className="bg-oat">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <div className="max-w-2xl">
            <Eyebrow>No hard sell</Eyebrow>
            <h2 className="mt-3 text-h2">What a valuation actually involves</h2>
            <p className="measure mt-4 text-lead text-ink-soft">
              The fear of a pushy valuer is the main reason people put off booking one. So
              here is exactly what happens, start to finish.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUATION_STEPS.map((s, i) => (
              <li key={s.title}>
                <p className="font-display text-h1 leading-none text-brass tabular">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <BrassRule className="mt-4 w-12" />
                <h3 className="mt-4 text-h3">{s.title}</h3>
                <p className="measure mt-2 text-body text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Fees, stated plainly */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Fees</Eyebrow>
            <h2 className="mt-3 text-h2">
              A fee you can find, <em className="italic text-sales-ink">before</em> you ring.
            </h2>
            <p className="measure mt-4 text-body text-ink-soft">
              Publishing our fee openly is unusual around here, and deliberate. You should
              be able to see what selling with us costs without booking a call to find out.
              VAT is stated on every figure, with no hidden extras.
            </p>
            <div className="mt-7">
              {SALES_LIVE ? (
                <Button href="/sales/fees" variant="secondary">
                  See our sales fees
                </Button>
              ) : (
                <p className="rounded-md border border-brass/40 bg-well px-5 py-4 text-small text-ink-soft">
                  Our full fee page goes live the day we open for sales. Register your
                  interest and we will send it to you first.
                </p>
              )}
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {[
              'One clear fee, agreed in writing before you instruct',
              'Photography, floorplan, EPC arranged, board and portals included',
              'Accompanied viewings and sales progression as standard',
              'No withdrawal charge buried in the small print',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-l-2 border-sales pl-4 text-body text-ink"
              >
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-sales-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Proof band */}
      <StatsBand />

      {/* 6. Landlord cross-sell */}
      <section className="surface-kiln relative isolate overflow-hidden text-on-dark">
        <div className="relative mx-auto max-w-content px-6 py-20 md:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <Eyebrow tone="on-dark">Already let with us?</Eyebrow>
              <h2 className="mt-3 text-h2">Your valuation is on us, and we have the file</h2>
              <p className="measure mt-4 text-lead text-on-dark/90">
                If we already look after your property, we know it and we know you. Selling
                it is the natural next step, and a conversation rather than a cold start.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button href="/sales/free-valuation" variant="secondary" className="btn-invert">
                {registerCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ, scoped to selling */}
      <section className="bg-oat">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Selling questions</Eyebrow>
              <h2 className="mt-3 text-h2">The things sellers ask us</h2>
            </div>
            <Link href="/faqs" className="btn btn-ghost">
              All questions
            </Link>
          </div>
          <div className="mt-10">
            <Faq items={SALES_FAQS} />
          </div>
        </div>
      </section>

      {/* 8. Valuation CTA band */}
      <ValuationBand
        heading={SALES_LIVE ? 'Ready to find out what your home is worth?' : 'Be first when we open'}
        copy={
          SALES_LIVE
            ? 'A free, honest valuation from people who know these streets. No obligation.'
            : 'Register your interest and we will contact you the week our sales books open.'
        }
        cta={registerCta}
      />
    </>
  )
}
