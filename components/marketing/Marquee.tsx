/**
 * Marquee. A continuous, slow, hover-pausable band of the coverage towns in
 * Martian Mono uppercase, ochre on indigo, the item under the cursor lifting to
 * bone. Pauses on hover and under prefers-reduced-motion (CSS only, no JS).
 *
 * The list is rendered twice so the -50% loop is seamless. The duplicate is
 * aria-hidden so assistive tech reads the towns once.
 */
import { cn } from '@/lib/cn'

interface MarqueeProps {
  items: readonly string[]
  className?: string
}

function Track({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <span className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee-item">
          <span className="px-6">{item}</span>
          <span className="h-2 w-2 rounded-full bg-ochre" aria-hidden="true" />
        </span>
      ))}
    </span>
  )
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    // Decorative: the same towns are available as links in the Areas grid below.
    <div className={cn('marquee bg-indigo py-3', className)}>
      <Track items={items} />
      <Track items={items} hidden />
    </div>
  )
}
