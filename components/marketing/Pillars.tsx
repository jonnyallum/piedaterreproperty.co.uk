/**
 * Pillars. Argument points as a mullion grid of panes: a large index numeral,
 * a heading and a line of copy per pane, with yellow, stone and black panes
 * alternating so the grid reads as a sash window, not a list of cards.
 */
import type { ReactNode } from 'react'
import { Cell, MullionGrid } from '@/components/primitives/Mullion'
import { SectionBar } from '@/components/primitives/SectionBar'
import { cn } from '@/lib/cn'

export interface Pillar {
  title: string
  body: ReactNode
}

interface PillarsProps {
  eyebrow: string
  heading: ReactNode
  items: Pillar[]
  ground?: 'ground' | 'oat' | 'ink'
}

const GROUND: Record<NonNullable<PillarsProps['ground']>, string> = {
  ground: 'bg-ground text-ink',
  oat: 'bg-oat text-ink',
  ink: 'bg-night text-on-dark',
}

export function Pillars({ eyebrow, heading, items, ground = 'ground' }: PillarsProps) {
  const onDark = ground === 'ink'
  return (
    <section className={cn(GROUND[ground])}>
      <div className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28">
        <SectionBar label={eyebrow} />
        <h2 className="mt-8 max-w-4xl text-h1">{heading}</h2>
        <MullionGrid className="mt-12 md:grid-cols-2">
          {items.map((item, i) => (
            <Cell
              key={item.title}
              ground={i % 4 === 0 ? 'yellow' : i % 4 === 3 ? 'black' : onDark ? 'black' : 'stone'}
              className="flex min-h-64 flex-col justify-between gap-10"
            >
              <p className="tabular font-display text-display leading-none opacity-90">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h3 className="text-h2">{item.title}</h3>
                <p className="measure mt-3 text-body opacity-85">{item.body}</p>
              </div>
            </Cell>
          ))}
        </MullionGrid>
      </div>
    </section>
  )
}
