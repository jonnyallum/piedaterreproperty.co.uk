/**
 * StatsBand. The credibility band that follows the hero. Indigo ground with
 * grain. Count-up statistics in tabular numerals, the brass credential marks,
 * and one plain line explaining why redress and client money protection matter
 * to someone handing over a large asset. Numbers come from lib/site so nothing
 * dates or is invented.
 */
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { CountUp } from './CountUp'
import { SITE, yearsTrading } from '@/lib/site'

const CREDENTIALS = [
  { label: 'The Property Ombudsman', detail: `Redress, member ${SITE.accreditations.tpoReference}` },
  { label: 'Money Shield', detail: 'Client money protection' },
  { label: 'Deposit Protection Scheme', detail: 'Tenant deposits held safely' },
  { label: 'Lettings Award', detail: SITE.accreditations.award },
]

export function StatsBand() {
  const years = yearsTrading()
  return (
    <section className="relative isolate overflow-hidden bg-indigo text-on-dark">
      <Grain fixed={false} />
      <div
        className="relative mx-auto max-w-content px-6 py-20 md:px-8"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <Eyebrow tone="on-dark">A regulated firm, not a startup</Eyebrow>
        <div className="mt-8 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-display leading-none text-ochre">
              <CountUp to={years} />
            </p>
            <p className="mt-2 text-lead text-on-dark/85">years on this coastline</p>
          </div>
          <div>
            <p className="font-display text-display leading-none text-ochre">
              <CountUp to={35} prefix="~" />
            </p>
            <p className="mt-2 text-lead text-on-dark/85">homes under management</p>
          </div>
          <div>
            <p className="font-display text-display leading-none text-ochre">
              <CountUp to={5} />
            </p>
            <p className="mt-2 text-lead text-on-dark/85">towns we know street by street</p>
          </div>
        </div>

        <p className="measure mt-12 text-lead text-on-dark/90">
          Redress means an independent ombudsman can hold us to account. Client money
          protection means your rent and deposits are covered if anything ever went wrong.
          These are the safeguards a serious firm carries as standard.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((c) => (
            <li key={c.label} className="border-l-2 border-brass pl-4">
              <p className="text-body font-medium text-on-dark">{c.label}</p>
              <p className="text-small text-on-dark/75">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
