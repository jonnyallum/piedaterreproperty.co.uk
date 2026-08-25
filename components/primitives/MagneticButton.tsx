'use client'

/**
 * MagneticButton. Wraps a CTA so it attracts the cursor within a 90px radius,
 * up to 6px of travel, spring-damped. Disabled on touch devices and under
 * prefers-reduced-motion, where it renders as a plain inline wrapper.
 */
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  /** Radius of attraction in pixels. */
  radius?: number
  /** Maximum travel in pixels. */
  strength?: number
}

export function MagneticButton({
  children,
  radius = 90,
  strength = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarse || reduced) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (dist < radius) {
          const pull = (1 - dist / radius) * strength
          node.style.transform = `translate3d(${(dx / dist) * pull}px, ${(dy / dist) * pull}px, 0)`
        } else {
          node.style.transform = 'translate3d(0, 0, 0)'
        }
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      node.style.transform = 'translate3d(0, 0, 0)'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    node.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [radius, strength])

  return (
    <span
      ref={ref}
      className="inline-block will-change-transform"
      style={{ transition: 'transform var(--dur-ui) var(--ease-quill)' }}
    >
      {children}
    </span>
  )
}
