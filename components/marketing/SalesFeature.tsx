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
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
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
    <section className="relative isolate overflow-hidden surface-harbour-dusk text-on-dark">
      <Grain fixed={false} photo />
      <div
        className="relative mx-auto max-w-content px-6 py-24 md:px-8"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <Eyebrow tone="on-dark">{live ? 'Now selling' : 'Sales department, launching'}</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-h1">
          {years.charAt(0).toUpperCase() + years.slice(1)} years letting them.{' '}
          <em className="italic text-ochre">
            {live ? 'Now selling them too.' : 'Soon selling them too.'}
          </em>
        </h2>
        <p className="measure mt-5 text-lead text-on-dark/90">
          {live
            ? 'The trust we have built over fifteen years, brought to residential sales. The same care, the same faces, from valuation to completion.'
            : 'We are opening a residential sales department, built on the same fifteen-year track record. Register your interest and you will be first to hear when we launch, with a valuation ready the day we do.'}
        </p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {PROOF.map((p) => (
            <li key={p.title} className="border-t border-brass/50 pt-4">
              <div className="flex items-center gap-2 text-ochre">
                <Icon name="check" className="h-5 w-5" />
                <h3 className="text-h3 text-on-dark">{p.title}</h3>
              </div>
              <p className="measure mt-2 text-body text-on-dark/85">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          {live ? (
            <Button href="/sales/free-valuation" variant="sales">
              Book a free valuation
            </Button>
          ) : (
            <Button href="/sales/free-valuation" variant="sales">
              Register your interest
            </Button>
          )}
          <Button href="/sales/how-we-sell" variant="secondary" className="btn-invert">
            How we sell
          </Button>
        </div>
      </div>
    </section>
  )
}
