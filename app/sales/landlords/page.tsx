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
  title: 'A message to our landlords',
  description:
    'We are adding residential sales. If you already let with us, your valuation is on us and we already know your property.',
  path: '/sales/landlords',
  // The warm-market landing page is a campaign destination, keep it out of the
  // index so it does not compete with the main sales pages.
  noindex: true,
})

const POINTS = [
  'We already know your property, and you',
  'Your sales valuation is on us',
  'The same people who manage it can sell it',
  'One conversation, not a cold start with a stranger',
]

export default function LandlordsLandingPage() {
  return (
    <>
      <PageHero
        tone="sales"
        eyebrow="A note to our landlords"
        trail={[
          { name: 'Selling', path: '/sales' },
          { name: 'Landlords', path: '/sales/landlords' },
        ]}
        title={
          <>
            You already trust us to let it. Soon you can trust us to{' '}
            <em className="italic text-ochre">sell</em> it.
          </>
        }
        lead="After fifteen years looking after homes on this coast, we are adding residential sales. If we already manage your property, selling it is the natural next step, and a much easier one."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <ul className="mb-10 grid gap-3 sm:grid-cols-2">
              {POINTS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-md border border-brass/40 bg-well p-4 text-body text-ink"
                >
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-sales-ink" />
                  {p}
                </li>
              ))}
            </ul>
            <Eyebrow>{SALES_LIVE ? 'Book your valuation' : 'Register your interest'}</Eyebrow>
            <h2 className="mt-2 text-h3">Tell us about the property</h2>
            <div className="mt-5">
              <ValuationForm path="sales" source="campaign_landlords" />
            </div>
            <div className="mt-8">
              <ContactRoutes
                heading="Or just reply, or ring"
                whatsappMessage="Hello, I am a landlord with you and would like to talk about selling."
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
