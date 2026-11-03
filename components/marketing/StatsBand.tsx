/**
 * StatsBand. The credibility band that follows the hero. Three stat panes in a
 * mullion grid, a plain line on why redress and client money protection matter
 * to someone handing over a large asset, then the credential marks in a
 * yellow-framed grid. Numbers come from lib/site so nothing dates or is
 * invented.
 */
import Image from 'next/image'
import { Cell, MullionGrid } from '@/components/primitives/Mullion'
import { SectionBar } from '@/components/primitives/SectionBar'
import { SITE, yearsTrading } from '@/lib/site'

const CREDENTIALS = [
  {
    label: 'The Property Ombudsman',
    detail: `Redress, member ${SITE.accreditations.tpoReference}`,
    image: '/images/archive/global__property-ombudsman-logo.jpg',
    width: 3095,
    height: 795,
  },
  {
    label: 'Money Shield',
    detail: 'Client money protection',
    image: '/images/archive/global__money-shield-logo.jpg',
    width: 1656,
    height: 708,
  },
  { label: 'Deposit Protection Scheme', detail: 'Tenant deposits held safely' },
  {
    label: 'Lettings Award',
    detail: SITE.accreditations.award,
    image: '/images/archive/global__british-property-awards-2018-2019.jpg',
    width: 175,
    height: 450,
  },
]

export function StatsBand() {
  const years = yearsTrading()
  const STATS = [
    { value: String(years), label: 'years on this coastline', ground: 'yellow' as const },
    { value: '~35', label: 'homes under management', ground: 'black' as const },
    { value: 'Solent', label: 'South Coast and Hampshire coverage', ground: 'black' as const },
  ]
  return (
    <section className="bg-night text-on-dark">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28">
        <SectionBar label="A regulated firm, not a startup" />
        <MullionGrid className="mt-10 border-ochre bg-[var(--pt-ochre)] sm:grid-cols-3">
          {STATS.map((st) => (
            <Cell key={st.label} ground={st.ground} className="flex min-h-56 flex-col justify-between">
              <p className="font-display text-display leading-none">{st.value}</p>
              <p className="mt-6 text-lead">{st.label}</p>
            </Cell>
          ))}
        </MullionGrid>

        <p className="measure mt-12 text-lead text-on-dark/90">
          Redress means an independent ombudsman can hold us to account. Client money
          protection means your rent and deposits are covered if anything ever went wrong.
          These are the safeguards a serious firm carries as standard.
        </p>

        <MullionGrid as="ul" className="mt-10 border-ochre bg-[var(--pt-ochre)] sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((c) => (
            <Cell as="li" key={c.label} className="flex min-h-44 flex-col p-5 md:p-5">
              <div className="flex h-14 items-center">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt=""
                    width={c.width}
                    height={c.height}
                    sizes="12rem"
                    className="max-h-12 w-auto max-w-44 object-contain"
                  />
                ) : (
                  <span className="font-display text-h2 text-ink" aria-hidden="true">
                    DPS
                  </span>
                )}
              </div>
              <p className="mt-auto pt-4 font-display text-h3 leading-none">{c.label}</p>
              <p className="mt-1 text-small text-ink-soft">{c.detail}</p>
            </Cell>
          ))}
        </MullionGrid>
      </div>
    </section>
  )
}
