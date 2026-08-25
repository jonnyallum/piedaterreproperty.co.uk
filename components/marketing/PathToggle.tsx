'use client'

/**
 * PathToggle. The Sales and Lettings segmented control. Recolours between the
 * terracotta and verdigris families and drives the colour language of the
 * component it sits in. Built as an accessible toggle-button group: two native
 * buttons carrying aria-pressed inside a labelled group. Both are Tab-reachable,
 * Space and Enter select.
 */
import { cn } from '@/lib/cn'

export type Path = 'sales' | 'lettings'

interface PathToggleProps {
  value: Path
  onChange: (value: Path) => void
  label: string
  className?: string
}

const OPTIONS: { value: Path; label: string }[] = [
  { value: 'sales', label: 'Buying and selling' },
  { value: 'lettings', label: 'Renting and letting' },
]

export function PathToggle({ value, onChange, label, className }: PathToggleProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex rounded-md border border-brass/40 bg-well p-1', className)}
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.value
        // Accessible depths so bone text clears AA: bone on sienna 5.98:1,
        // bone on verdigris-deep 6.66:1. Same wayfinding colour family.
        const fill = opt.value === 'sales' ? 'bg-sales-ink' : 'bg-lettings-deep'
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-sm px-4 py-2 text-small font-medium transition-colors',
              active ? cn(fill, 'text-on-dark') : 'text-ink-soft hover:text-ink'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
