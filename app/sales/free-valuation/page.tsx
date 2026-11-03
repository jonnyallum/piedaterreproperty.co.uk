import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { TrustColumn } from '@/components/marketing/TrustColumn'
import { ValuationForm } from '@/components/lead/ValuationForm'
import { ValuationFallback } from '@/components/lead/ValuationFallback'
import { ContactRoutes } from '@/components/lead/ContactRoutes'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { SALES_LIVE, canonicalTown } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: SALES_LIVE ? 'Book a free valuation' : 'Register your interest in selling',
  description:
    'A free, honest valuation of your home for sale, from a local agent who knows these streets. No obligation.',
  path: '/sales/free-valuation',
})

const AFTER = [
  {
    title: 'We read it the same day',
    body: 'Your details reach the office, not a queue. We aim to call you the same working day.',
  },
  {
    title: 'We agree a time',
    body: 'A convenient time to visit, in person, so we can value the home properly.',
  },
  {
    title: 'You get an honest figure',
    body: 'A realistic price with the reasoning behind it, and no pressure to instruct.',
  },
]

export default async function FreeValuationPage({
  searchParams,
}: {
  searchParams: Promise<{ town?: string | string[] }>
}) {
  const registerMode = !SALES_LIVE
  // Pre-filled by the area page CTAs. Validated against the coverage allow list
  // so only a town we actually serve can reach the form.
  const initialTown = canonicalTown((await searchParams).town)
  return (
    <>
      <PageHero
        tone="sales"
        eyebrow={registerMode ? 'Register your interest' : 'Free valuation'}
        trail={[
          { name: 'Selling', path: '/sales' },
          { name: registerMode ? 'Register' : 'Free valuation', path: '/sales/free-valuation' },
        ]}
        title={
          registerMode ? (
            <>
              Be first when we <em className="italic">open</em>.
            </>
          ) : (
            <>
              What is your home <em className="italic">actually</em> worth?
            </>
          )
        }
        lead={
          registerMode
            ? 'Leave your details and we will contact you the week our sales books open, with a free market appraisal ready to arrange.'
            : 'Tell us about the property and how to reach you. It takes about a minute, and there is no obligation.'
        }
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        {/* What happens after you submit */}
        <div className="mb-14 grid gap-6 sm:grid-cols-3">
          {AFTER.map((a, i) => (
            <div key={a.title} className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-6">
              <p className="font-display text-h2 leading-none text-brass tabular">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 text-h3">{a.title}</h2>
              <p className="measure mt-2 text-small text-ink-soft">{a.body}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <div className="js-only">
              <ValuationForm path="sales" source="valuation_sales" initialTown={initialTown} />
            </div>
            <ValuationFallback
              path="sales"
              source="valuation_sales"
              registerMode={registerMode}
              initialTown={initialTown}
            />
            <div className="mt-8">
              <ContactRoutes
                whatsappMessage={
                  registerMode
                    ? 'Hello, I would like to register my interest in selling when you open.'
                    : 'Hello, I would like to book a valuation for selling.'
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <TrustColumn />
            <div className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6">
              <Eyebrow>Prefer lettings?</Eyebrow>
              <p className="mt-2 text-body text-ink-soft">
                Looking to let rather than sell? Our rental valuations are live now.
              </p>
              <a
                href="/lettings/rental-valuation"
                className="mt-3 inline-flex items-center gap-2 text-small font-medium text-lettings-deep"
              >
                <Icon name="arrow-right" className="h-4 w-4" />
                Book a rental valuation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
