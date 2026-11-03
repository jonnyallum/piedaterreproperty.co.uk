'use client'

/**
 * MapPanel. A click-to-load map. The embed is not in the DOM and contacts no
 * third party until the visitor opens it, so it adds nothing to initial page
 * weight and nothing loads from OpenStreetMap without an explicit action. When a
 * listing carries no precise point it centres on the area and says so, which is
 * also how a lettings agent handles an address before a viewing is booked.
 */
import { useState } from 'react'
import { Icon } from '@/components/primitives/Icon'

interface MapPanelProps {
  /** Precise point, when known. */
  lat?: number
  lng?: number
  /** Area centre used when there is no precise point. */
  centerLat: number
  centerLng: number
  label: string
  /** Shown under an area-only map. */
  note?: string
  buttonLabel?: string
}

export function MapPanel({
  lat,
  lng,
  centerLat,
  centerLng,
  label,
  note,
  buttonLabel = 'Show map',
}: MapPanelProps) {
  const [open, setOpen] = useState(false)
  const precise = lat != null && lng != null
  const cLat = precise ? (lat as number) : centerLat
  const cLng = precise ? (lng as number) : centerLng
  const delta = precise ? 0.018 : 0.075
  const bbox = [cLng - delta, cLat - delta, cLng + delta, cLat + delta].join('%2C')
  const marker = precise ? `&marker=${cLat}%2C${cLng}` : ''
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex aspect-[16/9] w-full items-center justify-center rounded-none border-[length:var(--pane-gap)] border-night bg-well text-ink-soft transition-colors hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass"
        aria-label={`${buttonLabel}. Loads a map from OpenStreetMap.`}
      >
        <span className="inline-flex items-center gap-2 text-small font-medium">
          <Icon name="pin" className="h-5 w-5 text-brass" />
          {buttonLabel}
        </span>
      </button>
    )
  }

  return (
    <figure>
      <div className="overflow-hidden rounded-none border-[length:var(--pane-gap)] border-night">
        <iframe
          title={label}
          src={src}
          loading="lazy"
          className="aspect-[16/9] w-full"
          referrerPolicy="no-referrer"
        />
      </div>
      {!precise && note ? (
        <figcaption className="mt-2 text-small text-ink-soft">{note}</figcaption>
      ) : null}
    </figure>
  )
}
