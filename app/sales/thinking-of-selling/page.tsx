import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationForm } from '@/components/lead/ValuationForm'
import { ContactRoutes } from '@/components/lead/ContactRoutes'
import { TrustColumn } from '@/components/marketing/TrustColumn'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { SALES_LIVE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Thinking of selling',
  description:
    'The agent who already knows your street. Fifteen years letting and managing on this coast, now selling too. Book a free, honest market appraisal.',
  path: '/sales/thinking-of-selling',
  // A campaign destination for leaflets, cards and QR codes: kept out of the
  // index so it does not compete with the main sales pages for the same queries.
  noindex: true,
})

const POINTS = [
  'Fifteen years on this one stretch of coast, not a national chain',
  'A real person who meets you at the property',
  'An honest opinion on price, not a number to win the instruction',
  'Full redress and client money protection, in writing',
]

export default function ThinkingOfSellingPage() {
  return (
    <>
      <PageHero
        tone="sales"
        eyebrow="Thinking of selling"
        trail={[
          { name: 'Selling', path: '/sales' },
          { name: 'Thinking of selling', path: '/sales/thinking-of-selling' },
        ]}
        title={
          <>
            Start with people who know the <em className="italic text-ochre">street</em>.
          </>
        }
        lead="We have spent fifteen years letting and managing homes along this coast, and now we sell them too. A local name, a local number, and someone who can meet you at the property this week."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <ul className="mb-10 grid gap-3 sm:grid-cols-2">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-none border-[length:var(--pane-gap)] border-night bg-well p-4 text-body text-ink"
                >
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-sales-ink" />
                  {point}
                </li>
              ))}
            </ul>
            <Eyebrow>{SALES_LIVE ? 'Book your free appraisal' : 'Register your interest'}</Eyebrow>
            <h2 className="mt-2 text-h3">Tell us about the property</h2>
            <div className="mt-5">
              <ValuationForm path="sales" />
            </div>
            <div className="mt-8">
              <ContactRoutes
                heading="Or just call, it is often quicker"
                whatsappMessage="Hello, I am thinking of selling and would like a market appraisal."
              />
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <TrustColumn />
          </div>
        </div>
      </section>
    </>
  )
}
