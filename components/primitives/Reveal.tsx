/**
 * Reveal. A presentation wrapper whose content is visible in the server HTML.
 * Essential copy and imagery must never depend on hydration or an intersection
 * observer: a failed or delayed client script should cost motion, not content.
 */
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** Stagger delay in milliseconds for sequenced children. Max 12 in a group. */
  delay?: number
  className?: string
}

export function Reveal({ children, as: Tag = 'div', delay = 0, className }: RevealProps) {
  return (
    <Tag
      className={cn('reveal', className)}
      data-shown="true"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
