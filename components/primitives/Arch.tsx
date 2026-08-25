/**
 * Arch. The signature form. Wraps content in a Moorish/Georgian doorway
 * silhouette: half-round on top, straight-sided. Two variants: `full` for tall
 * feature and hero images, `shallow` for wide cards.
 *
 * Server component. The overflow clip does the masking so any child (an image,
 * a gradient, a video) inherits the shape.
 */
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ArchProps {
  children: ReactNode
  variant?: 'full' | 'shallow'
  className?: string
}

export function Arch({ children, variant = 'full', className }: ArchProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        variant === 'full' ? 'arch-full' : 'arch-shallow',
        className
      )}
    >
      {children}
    </div>
  )
}
