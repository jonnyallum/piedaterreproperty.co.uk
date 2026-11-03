import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { SALES_PROCESS } from '@/content/sales'
import { SALES_LIVE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'
import { SectionBar } from '@/components/primitives/SectionBar'

export const metadata: Metadata = pageMeta({
  title: 'How we sell',
  description:
    'Our sale process end to end: valuation, preparation, material information, marketing, offers, buyer checks, progression and completion.',
  path: '/sales/how-we-sell',
})

const CALLOUTS = [
  {
    title: 'Material information, gathered up front',
    body: 'Tenure, price, council tax band and other material facts must appear on every listing under the Digital Markets, Competition and Consumers Act. We collect them at instruction rather than mid-sale, which prevents a purchase collapsing weeks in over something avoidable.',
  },
  {
    title: 'Anti-money laundering checks, made painless',
    body: 'Both sellers and buyers are identity checked, and buyers provide proof of funds. It is a legal requirement, not a choice, and we handle it quickly so it never becomes the thing that holds a sale up.',
  },
]

export default function HowWeSellPage() {
  return (
    <>
      <PageHero
        tone="sales"
        eyebrow="How we sell"
        trail={[
          { name: 'Selling', path: '/sales' },
          { name: 'How we sell', path: '/sales/how-we-sell' },
        ]}
        title={
          <>
            The whole process, <em className="italic">start to finish</em>.
          </>
        }
        lead="Selling a home has a lot of moving parts. Here is exactly how we handle each one, and where a local firm earns its fee."
      />

      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionBar label="Eight stages" className="max-w-md" />
            <h2 className="mt-6 text-h1">
              From first visit to the day you hand over the{' '}
              <em className="italic">keys</em>.
            </h2>
            <p className="measure mt-4 text-body text-ink-soft">
              We stay with the sale the whole way through, and you deal with the same people
              at every stage.
            </p>
          </div>
          <ProcessTimeline stages={SALES_PROCESS} />
        </div>
      </section>

      <section className="bg-oat">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <Eyebrow>The parts most agents skip over</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-h2">Two things we explain properly</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CALLOUTS.map((c) => (
              <div key={c.title} className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-7">
                <Icon name="check" className="h-6 w-6 text-sales-ink" />
                <h3 className="mt-4 text-h3">{c.title}</h3>
                <p className="measure mt-2 text-body text-ink-soft">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ValuationBand
        heading={SALES_LIVE ? 'Start with an honest valuation' : 'Register your interest'}
        cta={SALES_LIVE ? 'Book a free valuation' : 'Register your interest'}
      />
    </>
  )
}
