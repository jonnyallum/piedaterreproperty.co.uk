/**
 * ProcessTimeline. A numbered vertical timeline of stages, with a brass rule
 * running down the left. Editorial rather than card-based. Reused for the sales
 * process and the tenant process.
 */
import type { ReactNode } from 'react'

export interface Stage {
  title: string
  body: ReactNode
}

interface ProcessTimelineProps {
  stages: Stage[]
}

export function ProcessTimeline({ stages }: ProcessTimelineProps) {
  return (
    <ol className="relative flex flex-col">
      {stages.map((stage, i) => (
        <li key={stage.title} className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0">
          {/* number and connector */}
          <div className="flex flex-col items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brass/50 bg-well font-display text-h3 tabular text-sales-ink">
              {i + 1}
            </span>
            {i < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="mt-2 w-px flex-1 bg-brass/40"
                style={{ minHeight: '2rem' }}
              />
            ) : null}
          </div>
          <div className="pt-2">
            <h3 className="text-h3">{stage.title}</h3>
            <p className="measure mt-2 text-body text-ink-soft">{stage.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
