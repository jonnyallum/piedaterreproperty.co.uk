/**
 * Pied-à-Terre's new house mark: an arched doorway, a small coastal sun and a
 * generous editorial wordmark. It is deliberately built from type and CSS so
 * it remains crisp, accessible and colour-aware at every size.
 */
import Link from 'next/link'
import { cn } from '@/lib/cn'

interface LogoProps {
  tone?: 'ink' | 'on-dark'
  className?: string
}

export function Logo({ tone = 'ink', className }: LogoProps) {
  const color = tone === 'on-dark' ? 'text-on-dark' : 'text-ink'
  return (
    <Link
      href="/"
      className={cn('brand-lockup group inline-flex items-center leading-none', color, className)}
    >
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-sun" />
        <span className="brand-mark-letter" />
      </span>
      <span className="brand-wordmark">
        <span
          className="font-display text-h3 font-normal tracking-tight"
          style={{ fontVariationSettings: "'SOFT' 20, 'WONK' 1" }}
        >
          Pied-à-Terre
        </span>
        <span className="brand-descriptor">Property / Solent coast</span>
      </span>
    </Link>
  )
}
