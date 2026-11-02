/**
 * Three logo concepts for Pied-a-Terre Property, drawn as real SVG on a 64 unit
 * grid. Colour comes only from currentColor and the --tl-* tokens, so each mark
 * recolours for dark grounds, one colour print and favicon use.
 *
 * Shared idea (TIDELINE): "pied-a-terre" is a foot on the ground. On the Solent
 * the ground is defined by the tide line, the mark left where land stops and
 * water begins. Every concept is a shape standing on a line.
 */
import type { ReactNode } from 'react'

export type ConceptId = 'threshold' | 'pile' | 'daymark'

interface MarkProps {
  accent?: boolean
  className?: string
}

const ACCENT = 'var(--tl-daymark)'

/** 1. Threshold: an arched doorway standing at the tide line, water lines below. */
export function MarkThreshold({ accent = true, className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M14 42V28a18 18 0 0 1 36 0v14" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="6" y="42" width="52" height="4" fill={accent ? ACCENT : 'currentColor'} />
      <rect x="14" y="51" width="36" height="2.5" fill="currentColor" />
      <rect x="22" y="57" width="20" height="2.5" fill="currentColor" />
    </svg>
  )
}

/**
 * 2. Pile and plain: P and T locked together. The stem of the P is also the
 * stem of an inverted T, a pile driven into the ground line. The bowl is an arch.
 */
export function MarkPile({ accent = true, className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M22 10.5h12a11.5 11.5 0 0 1 0 23H22" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect x="19.5" y="8" width="5" height="46" fill="currentColor" />
      <rect x="6" y="52" width="52" height="5" fill={accent ? ACCENT : 'currentColor'} />
    </svg>
  )
}

/**
 * 3. Daymark: the diamond topmark of a Solent navigation post over a house
 * block, cut by three falling water lines. Reads as roof, marker and tide.
 */
export function MarkDaymark({ accent = true, className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M32 4 48 20 32 36 16 20Z" fill={accent ? ACCENT : 'currentColor'} />
      <rect x="29.5" y="36" width="5" height="8" fill="currentColor" />
      <rect x="10" y="44" width="44" height="5" fill="currentColor" />
      <rect x="16" y="52" width="32" height="3.5" fill="currentColor" />
      <rect x="23" y="58.5" width="18" height="3" fill="currentColor" />
    </svg>
  )
}

const MARKS: Record<ConceptId, (p: MarkProps) => ReactNode> = {
  threshold: MarkThreshold,
  pile: MarkPile,
  daymark: MarkDaymark,
}

interface LockupProps {
  concept: ConceptId
  accent?: boolean
  className?: string
}

/** Mark plus wordmark. The wordmark is type, so it stays crisp and selectable. */
export function Lockup({ concept, accent = true, className }: LockupProps) {
  const Mark = MARKS[concept]
  return (
    <span className={`inline-flex items-center gap-4 ${className ?? ''}`}>
      <Mark accent={accent} className="h-14 w-14 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-3xl tracking-tight">Pied-à-Terre</span>
        <span className="mt-2 text-xs uppercase tracking-[0.32em]">Property</span>
      </span>
    </span>
  )
}
