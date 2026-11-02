/**
 * Pied-à-Terre's wordmark: lowercase "pied à terre" in the display serif, with
 * the grave accent drawn as a signal-blue roof-pitch stroke (see .brand-a in
 * globals.css). Live type, so it stays crisp, selectable and colour-aware.
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
      aria-label="Pied-à-Terre Property, home"
      className={cn('brand-lockup group inline-flex leading-none', color, className)}
      data-tone={tone}
    >
      <span className="brand-word" aria-hidden="true">
        <span>pied</span>
        <span className="brand-a">à</span>
        <em className="not-italic">terre</em>
      </span>
      <span className="brand-descriptor" aria-hidden="true">
        Property
      </span>
    </Link>
  )
}
