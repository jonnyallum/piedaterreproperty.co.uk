/**
 * PageHero. The interior-page header, laid out like the opening of a
 * monograph: a narrow margin column carrying the section label, a very large
 * title beside it, and a lead paragraph offset underneath. Nested doorway
 * outlines sit behind the title as the one decorative device. Tinted by path:
 * sales is flat signal blue, lettings flat ink, neutral paper. Carries
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
  sales: 'surface-kiln text-on-dark',
  lettings: 'surface-harbour-dusk text-on-dark',
  neutral: 'bg-ground text-ink',
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
      {/* Three nested doorway outlines, behind the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-28 hidden h-[36rem] w-[24rem] lg:block"
      >
        <div className="arch-full absolute inset-0 border-2 border-current opacity-20" />
        <div className="arch-full absolute inset-8 border-2 border-current opacity-20" />
        <div className="arch-full absolute inset-16 border-2 border-current opacity-20" />
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
          <h1 className="text-title lg:col-span-9">{title}</h1>
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
