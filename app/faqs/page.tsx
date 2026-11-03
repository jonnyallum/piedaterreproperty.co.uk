import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { FaqGroups } from '@/components/marketing/FaqGroups'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { JsonLd } from '@/components/seo/JsonLd'
import { groupedFaqs, FAQS } from '@/content/faqs/index'
import { GROUP_META, groupSlug, toQA } from '@/content/faqs/schema'
import { pageMeta, faqPageJsonLd, realEstateAgentJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Frequently asked questions',
  description:
    'Straight answers on selling, letting, renting and how we are regulated. Fees, tie-ins, deposits, certificates, the Tenant Fees Act and more, in plain English.',
  path: '/faqs',
})

/**
 * FAQs. The full grouped set with a sticky in-page nav, direct-linkable answers
 * and a client search. The FAQPage schema is emitted over every rendered
 * question and answer, and every answer panel is in the server HTML, so the
 * schema matches the visible content exactly (prompt 09).
 */
export default function FaqsPage() {
  const groups = groupedFaqs()

  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), faqPageJsonLd(FAQS.map(toQA))]} />

      <PageHero
        tone="neutral"
        eyebrow="Questions and answers"
        trail={[{ name: 'FAQs', path: '/faqs' }]}
        title={
          <>
            The questions worth <em className="italic text-sales-ink">asking</em>, answered straight.
          </>
        }
        lead="No jargon and no evasion. If your question is not here, call us and you will reach the same people who wrote these answers."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Sticky in-page navigation. Anchors clear the fixed site nav. */}
          <aside className="mb-12 lg:mb-0">
            <nav aria-label="FAQ topics" className="lg:sticky lg:top-28">
              <Eyebrow>Jump to a topic</Eyebrow>
              <ul className="mt-4 flex flex-col gap-2">
                {groups.map(({ group, entries }) => (
                  <li key={group}>
                    <a
                      href={`#${groupSlug(group)}`}
                      className="flex items-center justify-between gap-3 rounded-sm border-[length:var(--pane-gap)] border-night bg-well px-4 py-2.5 text-body text-ink transition-colors hover:bg-hover"
                    >
                      <span>{GROUP_META[group].heading}</span>
                      <span className="tabular text-small text-ink-soft">{entries.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            <FaqGroups groups={groups} />
          </div>
        </div>
      </section>

      <ValuationBand
        tone="lettings"
        heading="Still want to talk it through?"
        copy="A free, honest valuation and a straight conversation. No obligation, no hard sell."
        cta="Book a valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
