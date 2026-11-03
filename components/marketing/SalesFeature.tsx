/**
 * SalesFeature. The terracotta-led band announcing the new sales arm. This is
 * the commercial priority, so it is prominent, not buried.
 *
 * It respects the licensing gate: until HMRC AML supervision, TPO sales code
 * cover and estate-agency professional indemnity are confirmed (SALES_LIVE in
 * lib/site), it must not advertise a live sales service. In that state it runs
 * the pre-launch variant: the department is opening, and vendors can register
 * their interest to be first.
 */
import Image from 'next/image'
import { Cell, MullionGrid } from '@/components/primitives/Mullion'
import { SectionBar } from '@/components/primitives/SectionBar'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SALES_LIVE, yearsTrading } from '@/lib/site'
import { inWords } from '@/lib/format'

const PROOF = [
  {
    title: 'Local knowledge',
    body: 'We only work one patch, so we know what a street is worth and who is looking to buy on it.',
  },
  {
    title: 'The same people throughout',
    body: 'One point of contact from the valuation to the day contracts complete. No call centre.',
  },
  {
    title: 'A fee you understand',
    body: 'Clear terms before you instruct, in writing, with nothing buried in the small print.',
  },
]

export function SalesFeature() {
  const years = inWords(yearsTrading())
  const live = SALES_LIVE
  return (
    <section className="bg-night text-on-dark">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28">
        <SectionBar label={live ? 'Now selling' : 'Sales department, launching'} />
        <MullionGrid className="mt-8 border-ochre bg-[var(--pt-ochre)] lg:grid-cols-12">
          <Cell ground="black" className="flex flex-col justify-between gap-10 lg:col-span-7 lg:p-12">
            <h2 className="max-w-3xl text-title">
              {years.charAt(0).toUpperCase() + years.slice(1)} years letting them.{' '}
              <em>{live ? 'Now selling them too.' : 'Soon selling them too.'}</em>
            </h2>
            <div>
              <p className="measure text-lead text-on-dark/90">
                {live
                  ? 'The trust we have built over fifteen years, brought to residential sales. The same care, the same faces, from valuation to completion.'
                  : 'We are opening a residential sales department, built on the same fifteen-year track record. Register your interest and you will be first to hear when we launch, with a valuation ready the day we do.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/sales/free-valuation" variant="sales">
                  {live ? 'Book a free valuation' : 'Register your interest'}
                </Button>
                <Button href="/sales/how-we-sell" variant="secondary" className="btn-invert">
                  How we sell
                </Button>
              </div>
            </div>
          </Cell>

          <figure className="relative min-h-96 bg-night lg:col-span-5">
            <Image
              src="/images/archive/portfolio__02__wallis-road-waterlooville.jpg"
              alt="Double bay-fronted home on Wallis Road, Waterlooville"
              fill
              sizes="(max-width: 64rem) 100vw, 38vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 bg-ochre px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
              From our lettings portfolio / Wallis Road
            </figcaption>
          </figure>

          {PROOF.map((p, i) => (
            <Cell
              key={p.title}
              ground={i === 1 ? 'yellow' : 'stone'}
              className="lg:col-span-4"
            >
              <div className="flex items-center gap-2">
                <Icon name="check" className="h-5 w-5" />
                <h3 className="text-h3">{p.title}</h3>
              </div>
              <p className="measure mt-2 text-body opacity-85">{p.body}</p>
            </Cell>
          ))}
        </MullionGrid>
      </div>
    </section>
  )
}
