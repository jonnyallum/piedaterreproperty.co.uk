import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { WHY_CHOOSE_US_POINTS, WHY_CHOOSE_US_QUOTE } from '@/content/lettings'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Why choose us, for landlords',
  description:
    'How we market, reference and manage: SLR photography, our To Be Let boards, a real applicant database, thorough referencing and the offer to meet your tenant.',
  path: '/lettings/why-choose-us',
})

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Why choose us"
        trail={[
          { name: 'Landlords', path: '/lettings' },
          { name: 'Why choose us', path: '/lettings/why-choose-us' },
        ]}
        title={
          <>
            The work is similar. The <em className="italic text-ochre">service</em> is not.
          </>
        }
        lead="You have plenty of letting agents to choose from. What separates us is not the list of tasks, it is the care taken over each one, and fifteen years of doing it on the same streets."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <figure className="mx-auto max-w-3xl border-l-2 border-brass pl-6">
          <blockquote className="font-display text-h2 italic text-ink">
            “{WHY_CHOOSE_US_QUOTE}”
          </blockquote>
        </figure>

        <div className="mt-16 flex flex-col gap-12">
          {WHY_CHOOSE_US_POINTS.map((p, i) => (
            <div
              key={p.title}
              className="grid gap-4 border-t border-brass/40 pt-8 md:grid-cols-[auto_1fr] md:gap-12"
            >
              <p className="font-display text-h1 leading-none tabular text-lettings">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className="md:max-w-2xl">
                <h2 className="text-h3">{p.title}</h2>
                <p className="measure mt-2 text-body text-ink-soft">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-md border border-brass/40 bg-well p-8">
          <Eyebrow>Our team</Eyebrow>
          <p className="measure mt-3 text-lead text-ink">
            Place your property with us and you do so with confidence. Our team has years of
            experience across both independent and corporate letting agencies, and we take
            genuine pride in the portfolio we look after. Your property will be in good
            company.
          </p>
        </div>
      </section>

      <ValuationBand
        tone="lettings"
        heading="Ready to let with people who take it seriously?"
        cta="Book a rental valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
