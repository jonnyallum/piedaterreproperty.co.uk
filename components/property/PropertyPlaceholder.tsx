/**
 * PropertyPlaceholder. A branded stand-in shown until real photography is added
 * for a listing (tracked in ASSET_REQUEST_LIST). Honest rather than a broken
 * image: a Tide gradient under grain with a small arch mark and a line of copy.
 */
import { Grain } from '@/components/primitives/Grain'
import { Icon } from '@/components/primitives/Icon'
import { cn } from '@/lib/cn'

interface PropertyPlaceholderProps {
  className?: string
  label?: string
}

export function PropertyPlaceholder({
  className,
  label = 'Photography to come',
}: PropertyPlaceholderProps) {
  return (
    <div
      className={cn(
        'property-placeholder relative flex h-full w-full items-center justify-center surface-tide text-on-dark',
        className
      )}
      aria-hidden="true"
    >
      <Grain fixed={false} photo />
      <div className="relative flex flex-col items-center gap-2" style={{ zIndex: 'var(--z-content)' }}>
        <Icon name="arch" className="h-8 w-8 opacity-80" />
        <span className="eyebrow text-on-dark/80">{label}</span>
      </div>
    </div>
  )
}
