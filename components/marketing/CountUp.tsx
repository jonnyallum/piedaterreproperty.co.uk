'use client'

/**
 * CountUp. Animates a number from zero to its target over 1400ms with an
 * ease-out, once it scrolls into view, using tabular numerals so nothing shifts
 * width.
 *
 * The server-rendered value is the real final number, so crawlers and no-JS
 * visitors see the true figure, never zero. On the client the number is reset
 * to zero before paint (layout effect) and counts up when the stat enters view.
 * prefers-reduced-motion keeps the final value with no animation.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  durationMs?: number
  className?: string
}

export function CountUp({ to, prefix, suffix, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(to)

  useIsomorphicLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) setValue(0)
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(to)
      return
    }

    let raf = 0
    let start = 0
    const step = (t: number) => {
      if (!start) start = t
      const progress = Math.min((t - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            raf = requestAnimationFrame(step)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, durationMs])

  return (
    <span ref={ref} className={cn('tabular', className)}>
      <span aria-hidden="true">
        {prefix}
        {value.toLocaleString('en-GB')}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {to.toLocaleString('en-GB')}
        {suffix}
      </span>
    </span>
  )
}
