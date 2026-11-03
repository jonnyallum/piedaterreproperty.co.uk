import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { SALES_LIVE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'
import { SectionBar } from '@/components/primitives/SectionBar'

export const metadata: Metadata = pageMeta({
  title: 'Sales fees',
  description:
    'How our sales fee works: one clear fee, VAT stated, what is included as standard and what is not. Confirmed in writing before you instruct.',
  path: '/sales/fees',
})

const INCLUDED = [
  'Professional photography',
  'A measured floorplan',
  'An Energy Performance Certificate arranged',
  'A For Sale board where appropriate',
  'Listings on the major property portals',
  'Accompanied viewings',
  'Offer handling and negotiation',
  'Sales progression through to completion',
]

const SEPARATE = [
  'Conveyancing, which is your solicitor and their fee, not ours',
  'Any specialist survey a buyer commissions',
  'Premium or additional marketing you choose to add, agreed in advance',
]

/*
 * Fee figures are not published until Charisma confirms them (tracked in
 * ASSET_REQUEST_LIST): the sole agency commission percentage, whether VAT is
 * stated in addition, the tie-in period and the withdrawal terms. Under the
 * section copy rules no percentage or worked example with invented numbers is
 * shown here. The worked-example structure below shows the arithmetic we will
 * fill in, not a made-up figure.
 */

export default function SalesFeesPage() {
  return (
    <>
      <PageHero
        tone="sales"
        eyebrow="Sales fees"
        trail={[
          { name: 'Selling', path: '/sales' },
          { name: 'Fees', path: '/sales/fees' },
        ]}
        title={
          <>
            One clear fee, <em className="italic">no surprises</em>.
          </>
        }
        lead="We would rather you saw how our fee works before you ever pick up the phone. It filters out no one worth working with, and it earns trust from everyone else."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        {!SALES_LIVE ? (
          <div className="mb-12 rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-6">
            <div className="flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-sales-ink" />
              <p className="measure text-body text-ink">
                Our full fee schedule goes live the day we open for sales. We are completing
                our estate agency registrations now.{' '}
                <a href="/sales/free-valuation" className="text-sales-ink underline">
                  Register your interest
                </a>{' '}
                and we will send you the fee page and a market appraisal first.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Included as standard</Eyebrow>
            <ul className="mt-5 flex flex-col gap-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-sales-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Charged separately, and always agreed first</Eyebrow>
            <ul className="mt-5 flex flex-col gap-3">
              {SEPARATE.map((item) => (
                <li
                  key={item}
                  className="measure flex items-start gap-3 text-body text-ink-soft"
                >
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How the fee is worked out, structure without invented figures */}
        <div className="mt-16">
          <SectionBar label="How the fee is worked out" className="max-w-md" />
          <h2 className="mt-6 text-h1">Clear arithmetic, VAT shown</h2>
          <p className="measure mt-4 text-body text-ink-soft">
            Our fee is a single agreed percentage of the price your home actually sells for,
            so our interest and yours point the same way. Here is how it is set out, with the
            figure confirmed at your valuation and put in writing before you instruct.
          </p>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard users must be able to scroll this table */}
          <div tabIndex={0} role="region" aria-label="Table, scrolls sideways on small screens" className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <tbody className="text-body">
                {[
                  ['Agreed sale price', 'The price the buyer pays'],
                  ['Our fee', 'A single agreed percentage, confirmed at valuation'],
                  ['VAT', 'Stated in full on the fee, never hidden'],
                  ['Total payable on completion', 'Fee plus VAT, and nothing else from us'],
                ].map(([label, note], i, arr) => (
                  <tr
                    key={label}
                    className={i < arr.length - 1 ? 'border-b-[length:var(--pane-gap)] border-ink' : ''}
                  >
                    <th scope="row" className="py-4 pr-6 font-medium text-ink">
                      {label}
                    </th>
                    <td className="py-4 text-ink-soft">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-small text-ink-soft">
            There is no separate withdrawal charge buried in the terms. If anything would ever
            be chargeable, it is listed above and agreed before you instruct.
          </p>
        </div>
      </section>

      <ValuationBand
        heading={SALES_LIVE ? 'Ready for a straight answer on price?' : 'Register your interest'}
        cta={SALES_LIVE ? 'Book a free valuation' : 'Register your interest'}
      />
    </>
  )
}
