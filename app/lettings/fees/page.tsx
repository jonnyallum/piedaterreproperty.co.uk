import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { SERVICE_LEVELS } from '@/content/lettings'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Lettings fees and service levels',
  description:
    'Our lettings service levels and what each includes, set out clearly with VAT stated. Tenant find, rent collection and fully managed.',
  path: '/lettings/fees',
})

export default function LettingsFeesPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Fees and service levels"
        trail={[
          { name: 'Landlords', path: '/lettings' },
          { name: 'Fees', path: '/lettings/fees' },
        ]}
        title={
          <>
            Clear fees, and what each <em className="italic text-ochre">includes</em>.
          </>
        }
        lead="The same transparency principle as everything we do. Here is what each service level covers, so you can choose the right one for you."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        {/*
          The exact fee figures are recovered from the current Fees and Service
          Levels page and confirmed by Charisma before they publish (tracked in
          ASSET_REQUEST_LIST). No invented figure appears here; fee cells state
          how the figure is confirmed instead.
        */}
        <div className="mb-12 rounded-md border border-brass/50 bg-well p-6">
          <div className="flex items-start gap-3">
            <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-lettings" />
            <p className="measure text-body text-ink">
              The fee figures for each service level are confirmed at your valuation and set
              out in writing, with VAT stated on every number. Ask us for the current
              schedule, or book a valuation and we will bring it with us.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-brass/40">
          <table className="w-full min-w-[44rem] border-collapse text-left align-top">
            <caption className="sr-only">Lettings service levels and what each includes</caption>
            <thead>
              <tr className="bg-night text-on-dark">
                <th scope="col" className="px-5 py-4 font-medium">
                  Included
                </th>
                {SERVICE_LEVELS.map((s) => (
                  <th key={s.name} scope="col" className="px-5 py-4 font-medium">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-small">
              {[
                'Rental valuation and advice',
                'Photography and particulars',
                'Marketing and viewings',
                'Referencing and right to rent',
                'Tenancy agreement and deposit registration',
                'Rent collection and arrears chasing',
                'Maintenance coordination',
                'Routine inspections',
                'Compliance certificates tracked',
              ].map((row, i) => {
                const inTenantFind = i <= 4
                const inRentCollection = i <= 5
                const flags = [inTenantFind, inRentCollection, true]
                return (
                  <tr key={row} className={i % 2 ? 'bg-well' : 'bg-ground'}>
                    <th scope="row" className="px-5 py-4 text-left font-medium text-ink">
                      {row}
                    </th>
                    {flags.map((on, j) => (
                      <td key={`${row}-${j}`} className="px-5 py-4">
                        {on ? (
                          <span className="inline-flex items-center gap-1 text-lettings-deep">
                            <Icon name="check" className="h-4 w-4" title="Included" /> Included
                          </span>
                        ) : (
                          <span className="text-ink-soft">Not included</span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
              <tr className="bg-night text-on-dark">
                <th scope="row" className="px-5 py-4 text-left font-medium">
                  Fee
                </th>
                {SERVICE_LEVELS.map((s) => (
                  <td key={`${s.name}-fee`} className="px-5 py-4 text-on-dark/85">
                    {s.fee}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <Eyebrow>What is charged separately</Eyebrow>
          <ul className="measure mt-4 flex flex-col gap-2 text-body text-ink-soft">
            {[
              'Compliance certificates themselves, such as the gas safety record and electrical report, at cost',
              'Any works you ask us to arrange, agreed with you first',
              'Court or tribunal costs, only if it ever comes to that, and always discussed in advance',
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ValuationBand
        tone="lettings"
        heading="Book a valuation and we will bring the fees with us"
        cta="Book a rental valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
