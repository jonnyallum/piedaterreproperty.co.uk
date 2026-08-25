/**
 * Eyebrow. The Martian Mono uppercase label that sits above headings. Renders
 * as a <p> by default; pass `as` to place it in a heading group without
 * breaking the document outline.
 */
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: ReactNode
  as?: ElementType
  /** Brass tone for credential contexts, slate otherwise. */
  tone?: 'slate' | 'brass' | 'on-dark'
  className?: string
}

const TONE: Record<NonNullable<EyebrowProps['tone']>, string> = {
  slate: 'text-ink-soft',
  brass: 'text-brass',
  'on-dark': 'text-on-dark/80',
}

export function Eyebrow({ children, as: Tag = 'p', tone = 'slate', className }: EyebrowProps) {
  return <Tag className={cn('eyebrow', TONE[tone], className)}>{children}</Tag>
}
