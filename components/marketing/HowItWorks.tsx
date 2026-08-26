/**
 * HowItWorks. Both paths are visible without a JavaScript tab switch, which is
 * easier to compare, index and print while retaining the numbered editorial
 * treatment.
 */
import { Eyebrow } from '@/components/primitives/Eyebrow'

const PATHS = [
  {
    label: 'Selling',
    tone: 'text-sales-ink',
    steps: [
      {
        title: 'Free valuation',
        body: 'We visit, look properly, and give you an honest figure with the reasoning behind it.',
      },
      {
        title: 'Marketing',
        body: 'Considered photography, the major portals, and a description that tells the truth about the home.',
      },
      {
        title: 'Sale agreed to completion',
        body: 'We chase the chain, keep you informed, and stay with it through to the day you hand over the keys.',
      },
    ],
  },
  {
    label: 'Letting',
    tone: 'font-medium text-lettings',
    steps: [
      {
        title: 'Free rental valuation',
        body: 'A realistic rent for the property and the area, with advice on anything worth doing first.',
      },
      {
        title: 'Find and reference a tenant',
        body: 'Marketing, viewings, referencing and right-to-rent checks, so the tenant is a good fit.',
      },
      {
        title: 'Ongoing management',
        body: 'Rent collection, inspections, maintenance and compliance, handled by the same team year after year.',
      },
    ],
  },
] as const

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-content px-6 py-24 md:px-8">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-3 max-w-3xl text-h2">
        Three steps, the same <em className="italic text-sales-ink">people</em> throughout.
      </h2>

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
        {PATHS.map((path) => (
          <div key={path.label}>
            <h3 className={`text-h3 ${path.tone}`}>{path.label}</h3>
            <ol className="mt-7 grid gap-8">
              {path.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-brass/40 pt-5">
                  <p className="font-display text-h2 leading-none text-brass tabular">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <h4 className="text-h3">{step.title}</h4>
                    <p className="measure mt-2 text-body text-ink-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
