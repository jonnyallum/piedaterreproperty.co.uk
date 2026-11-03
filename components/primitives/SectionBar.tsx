/**
 * SectionBar. A solid black label bar that opens a section, like a sill: a
 * yellow square index tab, the label in condensed capitals, and an optional
 * right-hand slot (a link, a count). It is the one way a section announces
 * itself, so pages scan the same way everywhere.
 */
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionBarProps {
  label: string
  index?: string
  aside?: ReactNode
  className?: string
}

export function SectionBar({ label, index, aside, className }: SectionBarProps) {
  return (
    <div className={cn('flex items-stretch bg-night text-[color:var(--pt-black)]', className)}>
      {index ? (
        <span className="tabular flex min-w-12 items-center justify-center bg-ochre px-3 font-display text-h3 text-[color:var(--pt-yellow)]">
          {index}
        </span>
      ) : (
        <span className="w-3 bg-ochre" aria-hidden="true" />
      )}
      <p className="flex-1 px-4 py-3 font-display text-h3 uppercase leading-none tracking-[0.04em]">
        {label}
      </p>
      {aside ? (
        <div className="flex items-center px-4 text-small font-bold uppercase tracking-[0.12em] text-ochre">
          {aside}
        </div>
      ) : null}
    </div>
  )
}
