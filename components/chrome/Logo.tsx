/**
 * Logo. A typographic wordmark in Fraunces with a Martian Mono descriptor,
 * standing in until the client supplies the vector logo (tracked in
 * ASSET_REQUEST_LIST). Honest placeholder: it reads as the brand, not as a
 * missing asset.
 *
 * `tone` inverts the mark for dark grounds such as the nav-over-hero state.
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
      className={cn('group inline-flex flex-col leading-none', color, className)}
      aria-label="Pied-à-Terre Property, home"
    >
      <span
        className="font-display text-h3 font-normal tracking-tight"
        style={{ fontVariationSettings: "'SOFT' 20, 'WONK' 1" }}
      >
        Pied-à-Terre
      </span>
      <span className="eyebrow mt-1 text-brass">Property . Solent Coast</span>
    </Link>
  )
}
