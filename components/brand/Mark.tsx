/**
 * The Daymark: the diamond topmark of a Solent navigation post over a house
 * block and three falling water lines. Roof, marker and tide in one shape.
 * The body takes currentColor; the topmark takes the signal red unless
 * `accent` is false (one colour print, favicon, embossing).
 */
interface MarkProps {
  accent?: boolean
  className?: string
}

export function Mark({ accent = true, className }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M32 4 48 20 32 36 16 20Z" fill={accent ? 'var(--tl-daymark)' : 'currentColor'} />
      <rect x="29.5" y="36" width="5" height="8" fill="currentColor" />
      <rect x="10" y="44" width="44" height="5" fill="currentColor" />
      <rect x="16" y="52" width="32" height="3.5" fill="currentColor" />
      <rect x="23" y="58.5" width="18" height="3" fill="currentColor" />
    </svg>
  )
}
