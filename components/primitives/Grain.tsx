/**
 * Grain. The mandatory feTurbulence overlay that turns flat gradients into
 * dyed cloth. Fixed to the viewport by default, multiply blended, never
 * interactive. Opacity is driven by the --grain-opacity token so it halves on
 * dark scenes and below 640px (see globals.css and the media rule here).
 *
 * Server component: it renders a static SVG with no interactivity.
 */
import { cn } from '@/lib/cn'

interface GrainProps {
  /** Fixed to the viewport (page-wide) or absolute to the nearest positioned parent. */
  fixed?: boolean
  /** Coarser, photo-weight grain for use over imagery. */
  photo?: boolean
  className?: string
}

export function Grain({ fixed = true, photo = false, className }: GrainProps) {
  const frequency = photo ? 0.62 : 0.82
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none inset-0 mix-blend-multiply',
        fixed ? 'fixed' : 'absolute',
        className
      )}
      style={{
        zIndex: 'var(--z-grain)',
        opacity: photo ? 'var(--grain-opacity-photo)' : 'var(--grain-opacity)',
      }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id={photo ? 'pt-grain-photo' : 'pt-grain'}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={frequency}
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${photo ? 'pt-grain-photo' : 'pt-grain'})`}
        />
      </svg>
    </div>
  )
}
