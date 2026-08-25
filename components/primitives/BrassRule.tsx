'use client'

/**
 * BrassRule. The animated divider. Draws from a scaleX of 0 to 1, left origin,
 * when scrolled into view. Also used as the progress track in the valuation
 * form, where `progress` (0 to 1) is supplied directly and drawing is skipped.
 */
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

interface BrassRuleProps {
  /** Fixed progress 0 to 1. When set, the rule shows that fraction, no observer. */
  progress?: number
  className?: string
  'aria-hidden'?: boolean
}

export function BrassRule({ progress, className, ...rest }: BrassRuleProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [drawn, setDrawn] = useState(false)
  const controlled = typeof progress === 'number'

  useEffect(() => {
    if (controlled) return
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setDrawn(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [controlled])

  return (
    <div
      ref={ref}
      className={cn('brass-rule', className)}
      data-drawn={!controlled && drawn ? 'true' : undefined}
      style={
        controlled
          ? {
              transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})`,
              transition: 'transform var(--dur-reveal) var(--ease-quill)',
            }
          : undefined
      }
      aria-hidden={rest['aria-hidden'] ?? true}
    />
  )
}
