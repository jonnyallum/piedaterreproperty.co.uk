'use client'

/**
 * Reveal. A scroll-triggered entrance wrapper. The child starts translated and
 * transparent (only when the `js` class is present, so no-JS content is never
 * hidden) and settles into place once it scrolls into view.
 *
 * prefers-reduced-motion is honoured by the global transition-duration override
 * in globals.css, so the settle becomes instant rather than a slide.
 */
import { useEffect, useRef, useState } from 'react'
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
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0% 0% -10% 0%', threshold: 0.1 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      data-shown={shown || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
