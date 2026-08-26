/**
 * Stars. An accessible star rating rendered as SVG with a real text equivalent,
 * so a screen reader announces "5 out of 5" rather than five graphics. Partial
 * ratings are shown with a clipped overlay. Server component.
 */
interface StarsProps {
  /** 0 to 5, may be fractional for an aggregate. */
  value: number
  /** Visual size in rem-based utility height, passed through to the svg class. */
  className?: string
}

function StarPath() {
  return (
    <path d="M12 2.5l2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.77l-5.8 3.05 1.1-6.45L2.62 9.8l6.48-.94L12 2.5z" />
  )
}

export function Stars({ value, className = 'h-4' }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, value))
  const pct = (clamped / 5) * 100
  const label = `${Number.isInteger(clamped) ? clamped : clamped.toFixed(1)} out of 5`
  return (
    <span className={`relative inline-flex ${className}`} role="img" aria-label={label}>
      {/* Empty track */}
      <span className="inline-flex text-brass/30" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-full w-auto">
            <StarPath />
          </svg>
        ))}
      </span>
      {/* Filled overlay, clipped to the rating */}
      <span
        className="absolute inset-y-0 left-0 inline-flex overflow-hidden text-ochre"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-full w-auto max-w-none">
            <StarPath />
          </svg>
        ))}
      </span>
    </span>
  )
}
