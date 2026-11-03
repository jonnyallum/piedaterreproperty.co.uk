/**
 * PageHero. The interior-page header, laid out like the opening of a
 * monograph: a narrow margin column carrying the section label, a very large
 * title beside it, and a lead paragraph offset underneath. A small eight-pane window
 * frame sits beside the breadcrumbs as the one decorative device. Tinted by path:
 * sales and neutral are black, lettings is signal yellow. Carries
 * breadcrumbs, one h1, a lead line and up to two calls to action.
 */
import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { cn } from '@/lib/cn'

type Tone = 'sales' | 'lettings' | 'neutral'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  tone?: Tone
  trail: Crumb[]
  children?: ReactNode
}

const SURFACE: Record<Tone, string> = {
  sales: 'surface-harbour-dusk text-on-dark',
  lettings: 'bg-ochre text-bone',
  neutral: 'surface-harbour-dusk text-on-dark',
}

export function PageHero({
  eyebrow,
  title,
  lead,
  tone = 'neutral',
  trail,
  children,
}: PageHeroProps) {
  const onDark = tone !== 'lettings'
  return (
    <section className={cn('relative isolate overflow-hidden', SURFACE[tone])}>
      {/* A small window frame beside the breadcrumbs, one pane filled. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute right-8 top-24 hidden h-24 w-64 grid-cols-4 grid-rows-2 gap-[var(--pane-gap)] p-[var(--pane-gap)] lg:grid',
          onDark ? 'bg-ochre' : 'bg-night'
        )}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={i === 5 ? (onDark ? 'bg-ochre' : 'bg-night') : onDark ? 'bg-ink' : 'bg-ochre'} />
        ))}
      </div>
      <div
        className="relative mx-auto max-w-content px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <Breadcrumbs trail={trail} tone={onDark ? 'on-dark' : 'ink'} />
        <div className="mt-14 grid gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          <Eyebrow
            tone={onDark ? 'on-dark' : 'slate'}
            className="border-t-2 border-current pt-4 lg:col-span-3"
          >
            {eyebrow}
          </Eyebrow>
          <h1
            className={cn('text-title lg:col-span-9', onDark ? '[&_em]:!text-[color:var(--pt-yellow)]' : '[&_em]:!text-[color:var(--pt-black)]')}
          >{title}</h1>
        </div>
        {lead || children ? (
          <div className="mt-12 grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-6 lg:col-start-4">
              {lead ? (
                <p className={cn('text-lead', onDark ? 'text-on-dark/90' : 'text-ink-soft')}>{lead}</p>
              ) : null}
              {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
