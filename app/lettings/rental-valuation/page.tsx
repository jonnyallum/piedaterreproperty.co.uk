import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { TrustColumn } from '@/components/marketing/TrustColumn'
import { ValuationForm } from '@/components/lead/ValuationForm'
import { ValuationFallback } from '@/components/lead/ValuationFallback'
import { ContactRoutes } from '@/components/lead/ContactRoutes'
import { pageMeta } from '@/lib/seo'
import { canonicalTown } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Book a rental valuation',
  description:
    'A free, realistic rental valuation of your property from a local agent who lets homes on your street. No obligation.',
  path: '/lettings/rental-valuation',
})

const AFTER = [
  {
    title: 'We read it the same day',
    body: 'Your details reach the office, not a queue. We aim to call you the same working day.',
  },
  {
    title: 'We agree a time',
    body: 'A convenient time to visit and see the property properly.',
  },
  {
    title: 'You get a realistic rent',
    body: 'A figure for the property and the area, with advice on anything worth doing first.',
  },
]

export default async function RentalValuationPage({
  searchParams,
}: {
  searchParams: Promise<{ town?: string | string[] }>
}) {
  // Pre-filled by the area page CTAs, validated against the coverage allow list.
  const initialTown = canonicalTown((await searchParams).town)
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Rental valuation"
        trail={[
          { name: 'Landlords', path: '/lettings' },
          { name: 'Rental valuation', path: '/lettings/rental-valuation' },
        ]}
        title={
          <>
            What could your property <em className="italic text-ochre">let</em> for?
          </>
        }
        lead="Tell us about the property and how to reach you. It takes about a minute, and there is no obligation."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="mb-14 grid gap-6 sm:grid-cols-3">
          {AFTER.map((a, i) => (
            <div key={a.title} className="rounded-md border border-brass/40 bg-well p-6">
              <p className="font-display text-h2 leading-none tabular text-brass">
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
              <ValuationForm path="lettings" source="valuation_lettings" initialTown={initialTown} />
            </div>
            <ValuationFallback
              path="lettings"
              source="valuation_lettings"
              registerMode={false}
              initialTown={initialTown}
            />
            <div className="mt-8">
              <ContactRoutes whatsappMessage="Hello, I would like a rental valuation for my property." />
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
