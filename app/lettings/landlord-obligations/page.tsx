import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { LANDLORD_OBLIGATIONS } from '@/content/lettings'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Landlord obligations',
  description:
    'A current, plain-English summary of your legal obligations as a landlord: gas and electrical safety, EPC standards, alarms, deposit protection, right to rent and more.',
  path: '/lettings/landlord-obligations',
})

export default function LandlordObligationsPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Compliance for landlords"
        trail={[
          { name: 'Landlords', path: '/lettings' },
          { name: 'Landlord obligations', path: '/lettings/landlord-obligations' },
        ]}
        title={
          <>
            Your legal <em className="italic">obligations</em>, kept current.
          </>
        }
        lead="Letting a home carries real responsibilities, and they change. This is a plain summary of the main ones. If we manage your property, we track these for you so nothing lapses."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <Eyebrow>The main duties</Eyebrow>
        <div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {LANDLORD_OBLIGATIONS.items.map((o, i) => (
            <div key={o.title} className="grid grid-cols-[auto_1fr] gap-5">
              <p className="font-display text-h2 leading-none tabular text-brass">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h2 className="text-h3">{o.title}</h2>
                <p className="measure mt-2 text-body text-ink-soft">{o.body}</p>
              </div>
            </div>
          ))}
        </div>

        <LegalNotice reviewed={LANDLORD_OBLIGATIONS.reviewed} />
      </section>

      <ValuationBand
        tone="lettings"
        heading="Let us handle compliance for you"
        copy="With fully managed, we arrange and track every certificate, so nothing lapses and nothing lands on you at the wrong moment."
        cta="Book a rental valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
