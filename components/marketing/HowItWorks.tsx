'use client'

/**
 * HowItWorks. Three steps for each path, switched by the same segmented control
 * used in the hero so the toggle behaves consistently across the page. Sales
 * and lettings each get an honest three-step summary.
 */
import { useState } from 'react'
import { PathToggle, type Path } from './PathToggle'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { BrassRule } from '@/components/primitives/BrassRule'

const STEPS: Record<Path, { title: string; body: string }[]> = {
  sales: [
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
  lettings: [
    {
      title: 'Free rental valuation',
      body: 'A realistic rent for the property and the area, with advice on anything worth doing first.',
    },
    {
      title: 'Find and reference a tenant',
      body: 'Marketing, viewings, referencing and the right-to-rent checks, so the tenant is a good fit.',
    },
    {
      title: 'Ongoing management',
      body: 'Rent collection, inspections, maintenance and compliance, handled by the same team year after year.',
    },
  ],
}

export function HowItWorks() {
  const [path, setPath] = useState<Path>('sales')
  const steps = STEPS[path]
  return (
    <section className="mx-auto max-w-content px-6 py-24 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-h2">
            Three steps, the same{' '}
            <em className="italic text-sales-ink">people</em> throughout.
          </h2>
        </div>
        <PathToggle value={path} onChange={setPath} label="Choose sales or lettings steps" />
      </div>

      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title}>
            <p className="font-display text-h1 leading-none text-brass tabular">
              {String(i + 1).padStart(2, '0')}
            </p>
            <BrassRule className="mt-4 w-16" />
            <h3 className="mt-4 text-h3">{step.title}</h3>
            <p className="measure mt-2 text-body text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
