import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { COMPLAINT_STEPS, LEGAL_REVIEWED } from '@/content/legal'
import { SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Complaints procedure',
  description:
    'How to raise a complaint with Pied-à-Terre Property, the timescales we work to, and how to escalate to The Property Ombudsman.',
  path: '/complaints-procedure',
})

export default function ComplaintsProcedurePage() {
  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Complaints procedure"
        trail={[{ name: 'Complaints procedure', path: '/complaints-procedure' }]}
        title={
          <>
            How to raise a concern, <em className="italic">step by step</em>.
          </>
        }
        lead={`We take complaints seriously and work to clear timescales. We are a member of The Property Ombudsman, reference ${SITE.accreditations.tpoReference}.`}
      />
      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {COMPLAINT_STEPS.map((step, i) => (
            <div key={step.title} className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-7">
              <p className="font-display text-h2 leading-none tabular text-lettings">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 text-h3">{step.title}</h2>
              <p className="measure mt-2 text-body text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
        <LegalNotice reviewed={LEGAL_REVIEWED} />
      </section>
    </>
  )
}
