/**
 * PageHero. The interior-page hero. Sits below the solid nav with top padding,
 * tinted by path so the sales and lettings colour language holds site-wide:
 * sales uses the Harbour Dusk scene, lettings the Tide scene, neutral uses a
 * warm ground. Carries breadcrumbs, an eyebrow, one h1, a lead line and up to
 * two calls to action.
 */
import type { ReactNode } from 'react'
import { Grain } from '@/components/primitives/Grain'
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
  lettings: 'surface-tide text-on-dark',
  neutral: 'bg-oat text-ink',
}

export function PageHero({
  eyebrow,
  title,
  lead,
  tone = 'neutral',
  trail,
  children,
}: PageHeroProps) {
  const onDark = tone !== 'neutral'
  return (
    <section className={cn('relative isolate overflow-hidden', SURFACE[tone])}>
      {onDark ? <Grain fixed={false} photo /> : null}
      <div
        className="relative mx-auto max-w-content px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <Breadcrumbs trail={trail} tone={onDark ? 'on-dark' : 'ink'} />
        <Eyebrow tone={onDark ? 'on-dark' : 'slate'} className="mt-8">
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-4 max-w-4xl text-h1">{title}</h1>
        {lead ? (
          <p
            className={cn(
              'measure mt-5 text-lead',
              onDark ? 'text-on-dark/90' : 'text-ink-soft'
            )}
          >
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-9 flex flex-wrap gap-4">{children}</div> : null}
      </div>
    </section>
  )
}
