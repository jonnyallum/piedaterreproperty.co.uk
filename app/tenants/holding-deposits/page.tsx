import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { HOLDING_DEPOSIT } from '@/content/tenants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Holding deposits',
  description:
    'What a holding deposit is, how much it can be, when it is refunded, when it can be retained, and the statutory deadline for repayment.',
  path: '/tenants/holding-deposits',
})

export default function HoldingDepositsPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Holding deposits"
        trail={[
          { name: 'Tenants', path: '/tenants' },
          { name: 'Holding deposits', path: '/tenants/holding-deposits' },
        ]}
        title={
          <>
            Holding deposits, <em className="italic text-ochre">explained</em>.
          </>
        }
        lead={`A holding deposit reserves a property while we reference you. It is ${HOLDING_DEPOSIT.amount.toLowerCase()}, and here is exactly how it works.`}
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {HOLDING_DEPOSIT.points.map((p, i) => (
            <div key={p.title} className="rounded-md border border-brass/40 bg-well p-7">
              <p className="font-display text-h2 leading-none tabular text-lettings">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 text-h3">{p.title}</h2>
              <p className="measure mt-2 text-body text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
        <LegalNotice reviewed={HOLDING_DEPOSIT.reviewed} />
      </section>
    </>
  )
}
