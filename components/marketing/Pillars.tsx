/**
 * Pillars. An asymmetric, editorial band of argument points: a large Fraunces
 * index numeral, a brass hairline, a heading and a line of copy, stacked with
 * generous rhythm. Deliberately not three equal icon cards, which the design
 * prompt bans.
 */
import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/primitives/Eyebrow'
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
  ink: 'bg-ink text-on-dark',
}

export function Pillars({ eyebrow, heading, items, ground = 'ground' }: PillarsProps) {
  const onDark = ground === 'ink'
  return (
    <section className={cn(GROUND[ground])}>
      <div className="mx-auto max-w-content px-6 py-24 md:px-8">
        <div className="max-w-2xl">
          <Eyebrow tone={onDark ? 'on-dark' : 'slate'}>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-h2">{heading}</h2>
        </div>
        <div className="mt-14 flex flex-col">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                'grid gap-4 border-t border-brass/40 py-10 md:grid-cols-[auto_1fr] md:gap-12',
                i === items.length - 1 && 'border-b'
              )}
            >
              <p
                className={cn(
                  'font-display text-h1 leading-none tabular',
                  onDark ? 'text-ochre' : 'text-brass'
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className="md:max-w-2xl">
                <h3 className="text-h3">{item.title}</h3>
                <p
                  className={cn(
                    'measure mt-2 text-body',
                    onDark ? 'text-on-dark/85' : 'text-ink-soft'
                  )}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
