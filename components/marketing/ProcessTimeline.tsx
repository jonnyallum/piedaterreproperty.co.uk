/**
 * ProcessTimeline. Numbered stages as a column of panes with a yellow square
 * index tab on each, joined by the mullion. Reused for the sales process and
 * the tenant process.
 */
import type { ReactNode } from 'react'
import { MullionGrid } from '@/components/primitives/Mullion'

export interface Stage {
  title: string
  body: ReactNode
}

interface ProcessTimelineProps {
  stages: Stage[]
}

export function ProcessTimeline({ stages }: ProcessTimelineProps) {
  return (
    <MullionGrid as="ol">
      {stages.map((stage, i) => (
        <li key={stage.title} className="grid grid-cols-[4rem_1fr] bg-ground md:grid-cols-[5.5rem_1fr]">
          <span className="tabular flex items-start justify-center bg-ochre pt-5 font-display text-h1 leading-none text-ink">
            {i + 1}
          </span>
          <div className="p-6 md:p-8">
            <h3 className="text-h2">{stage.title}</h3>
            <p className="measure mt-2 text-body text-ink-soft">{stage.body}</p>
          </div>
        </li>
      ))}
    </MullionGrid>
  )
}
