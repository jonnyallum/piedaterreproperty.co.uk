/**
 * Pied-à-Terre's house mark: the Daymark (a navigation topmark over a house
 * block and the tide line) beside a type wordmark. The mark is real SVG and the
 * wordmark is live type, so both stay crisp, selectable and colour-aware.
 */
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Mark } from '@/components/brand/Mark'

interface LogoProps {
  tone?: 'ink' | 'on-dark'
  className?: string
}

export function Logo({ tone = 'ink', className }: LogoProps) {
  const color = tone === 'on-dark' ? 'text-on-dark' : 'text-ink'
  return (
    <Link
      href="/"
      aria-label="Pied-à-Terre Property, home"
      className={cn('brand-lockup group inline-flex items-center leading-none', color, className)}
      data-tone={tone}
    >
      <Mark className="brand-mark" />
      <span className="brand-wordmark">
        <span className="font-display text-h3 font-normal tracking-tight">Pied-à-Terre</span>
        <span className="brand-descriptor">Property / Solent coast</span>
      </span>
    </Link>
  )
}
