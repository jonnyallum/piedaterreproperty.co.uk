import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Icon } from '@/components/primitives/Icon'
import { SALES_LIVE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'
import { SectionBar } from '@/components/primitives/SectionBar'

export const metadata: Metadata = pageMeta({
  title: 'Why a local agent',
  description:
    'An honest comparison of online-only agents, national chains and a small local firm, so you can choose the right one to sell your home.',
  path: '/sales/why-a-local-agent',
})

const OPTIONS = [
  {
    name: 'Online-only agents',
    good: 'A low headline fee, often paid whether or not the home sells, and a slick app.',
    cost: 'You do much of the work yourself: viewings, negotiation and chasing the sale. The person on the phone rarely knows your street, and the fee is frequently payable up front.',
  },
  {
    name: 'National chains',
    good: 'A recognised brand, high-street windows and a large applicant database across a region.',
    cost: 'You can become one file among hundreds, valued by someone you never see again and progressed by a team you have not met. Targets are set far from your town.',
  },
  {
    name: 'A small local firm',
    good: 'One patch known street by street, the same person from valuation to completion, and an office you can walk into.',
    cost: 'We are honest about this: we do not carry a national brand. Our working area runs from Southampton to Chichester and through Hampshire, and we only take on homes the same local team can service properly.',
  },
]

type Cell = 'yes' | 'no' | 'sometimes' | string
const COLS = ['Online-only', 'National chain', 'Us'] as const
const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: 'Knows your specific street', cells: ['no', 'sometimes', 'yes'] },
  { label: 'Same person valuation to completion', cells: ['no', 'no', 'yes'] },
  { label: 'Accompanied viewings included', cells: ['no', 'sometimes', 'yes'] },
  { label: 'Sales progression by the same team', cells: ['no', 'sometimes', 'yes'] },
  { label: 'Fee visible before you call', cells: ['sometimes', 'no', 'yes'] },
  { label: 'A physical office you can visit', cells: ['no', 'yes', 'yes'] },
  { label: 'Fee typically payable only on sale', cells: ['no', 'yes', 'yes'] },
]

function CellMark({ value }: { value: Cell }) {
  if (value === 'yes')
    return (
      <span className="inline-flex items-center gap-1 text-lettings-deep">
        <Icon name="check" className="h-4 w-4" title="Yes" /> Yes
      </span>
    )
  if (value === 'no')
    return (
      <span className="inline-flex items-center gap-1 text-ink-soft">
        <Icon name="close" className="h-4 w-4" title="No" /> No
      </span>
    )
  if (value === 'sometimes')
    return <span className="text-ink-soft">Sometimes</span>
  return <span className="text-ink">{value}</span>
}

export default function WhyLocalAgentPage() {
  return (
    <>
      <PageHero
        tone="sales"
        eyebrow="Choosing an agent"
        trail={[
          { name: 'Selling', path: '/sales' },
          { name: 'Why a local agent', path: '/sales/why-a-local-agent' },
        ]}
        title={
          <>
            Three ways to sell. An <em className="italic">honest</em> look at each.
          </>
        }
        lead="There is a right answer for your home, and it is not always us. Here is a fair account of the choices, including where a firm this size falls short."
      />

      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {OPTIONS.map((o) => (
            <div key={o.name} className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-7">
              <h2 className="text-h3">{o.name}</h2>
              <p className="mt-4 text-small font-medium text-lettings-deep">Where it helps</p>
              <p className="measure mt-1 text-body text-ink-soft">{o.good}</p>
              <p className="mt-4 text-small font-medium text-sales-ink">Where it costs you</p>
              <p className="measure mt-1 text-body text-ink-soft">{o.cost}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionBar label="Side by side" className="max-w-md" />
          <h2 className="mt-6 text-h1">A straight comparison</h2>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard users must be able to scroll this table */}
          <div tabIndex={0} role="region" aria-label="Table, scrolls sideways on small screens" className="mt-6 overflow-x-auto rounded-none border-[length:var(--pane-gap)] border-ink">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">
                Comparison of online-only agents, national chains and Pied-à-Terre Property
              </caption>
              <thead>
                <tr className="bg-night text-on-dark">
                  <th scope="col" className="px-5 py-4 font-medium">
                    What matters
                  </th>
                  {COLS.map((c) => (
                    <th key={c} scope="col" className="px-5 py-4 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-small">
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? 'bg-well' : 'bg-ground'}>
                    <th scope="row" className="px-5 py-4 text-left font-medium text-ink">
                      {row.label}
                    </th>
                    {row.cells.map((cell, j) => (
                      <td key={`${row.label}-${COLS[j]}`} className="px-5 py-4">
                        <CellMark value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-small text-ink-soft">
            Scroll the table sideways on a narrow screen. Every claim here is one we can stand
            behind, including the limits of a firm our size.
          </p>
        </div>
      </section>

      <ValuationBand
        heading={SALES_LIVE ? 'If we are right for your home, start here' : 'Register your interest'}
        cta={SALES_LIVE ? 'Book a free valuation' : 'Register your interest'}
      />
    </>
  )
}
