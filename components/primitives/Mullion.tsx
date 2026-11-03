/**
 * Mullion grid. The site's one structural device: cells separated by a thin
 * black mullion, inside a black frame, like a sash window. Cells choose their
 * own ground (stone, yellow, black) so a grid reads as a pattern of panes.
 */
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function MullionGrid({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Tag
      className={cn(
        'mullion-grid grid gap-[var(--pane-gap)] border-[length:var(--pane-gap)] border-ink bg-ink',
        className
      )}
    >
      {children}
    </Tag>
  )
}

type Ground = 'stone' | 'yellow' | 'black' | 'well'

const GROUND: Record<Ground, string> = {
  stone: 'bg-ground text-ink',
  well: 'bg-well text-ink',
  yellow: 'bg-ochre text-bone',
  black: 'bg-night text-ink',
}

export function Cell({
  as: Tag = 'div',
  ground = 'stone',
  className,
  children,
}: {
  as?: ElementType
  ground?: Ground
  className?: string
  children: ReactNode
}) {
  return <Tag className={cn('relative p-6 md:p-8', GROUND[ground], className)}>{children}</Tag>
}
