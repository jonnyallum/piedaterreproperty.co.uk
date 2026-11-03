/**
 * HowItWorks. Both paths are visible without a JavaScript tab switch, which is
 * easier to compare, index and print. Each path is a column of panes under its
 * own label bar: selling on yellow numerals, letting on black.
 */
import { Cell, MullionGrid } from '@/components/primitives/Mullion'
import { SectionBar } from '@/components/primitives/SectionBar'

const PATHS = [
  {
    label: 'Selling',
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
    <section className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28">
      <SectionBar label="How it works" />
      <h2 className="mt-8 max-w-3xl text-h1">
        Three steps, the same <em>people</em> throughout.
      </h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
        {PATHS.map((path, p) => (
          <div key={path.label}>
            <SectionBar label={path.label} index={p === 0 ? 'S' : 'L'} />
            <MullionGrid as="ol" className="mt-[var(--pane-gap)]">
              {path.steps.map((step, index) => (
                <Cell
                  as="li"
                  key={step.title}
                  ground={index === 1 ? 'well' : 'stone'}
                  className="grid grid-cols-[4.5rem_1fr] gap-4"
                >
                  <p className="tabular font-display text-display leading-[0.8] text-ink">
                    {index + 1}
                  </p>
                  <div>
                    <h4 className="font-display text-h3 uppercase">{step.title}</h4>
                    <p className="measure mt-2 text-body text-ink-soft">{step.body}</p>
                  </div>
                </Cell>
              ))}
            </MullionGrid>
          </div>
        ))}
      </div>
    </section>
  )
}
