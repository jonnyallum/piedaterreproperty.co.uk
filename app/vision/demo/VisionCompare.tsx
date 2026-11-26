'use client'

import { useState } from 'react'

type Props = {
  originalUrl: string
  conceptUrl: string
}

export function VisionCompare({ originalUrl, conceptUrl }: Props) {
  const [mode, setMode] = useState<'original' | 'concept'>('original')
  const activeUrl = mode === 'original' ? originalUrl : conceptUrl

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3" role="group" aria-label="Choose a property view">
        <button
          type="button"
          onClick={() => setMode('original')}
          aria-pressed={mode === 'original'}
          className={mode === 'original' ? 'btn btn-primary' : 'btn btn-ghost'}
        >
          Original property
        </button>
        <button
          type="button"
          onClick={() => setMode('concept')}
          aria-pressed={mode === 'concept'}
          className={mode === 'concept' ? 'btn btn-primary' : 'btn btn-ghost'}
        >
          Furnished concept
        </button>
      </div>
      <div className="aspect-video overflow-hidden border border-ink/20 bg-oat">
        <iframe
          key={mode}
          src={activeUrl}
          title={mode === 'original' ? 'Original property 360 tour' : 'Digitally furnished concept 360 tour'}
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
      <p className="mt-4 text-small text-ink-soft">
        Digitally furnished concept for illustration only. Actual condition, fixtures,
        dimensions and what is included in a sale may differ. Always compare the
        original photographs, floor plan and property particulars.
      </p>
      <p className="mt-5 text-body">
        Using a Meta Quest?{' '}
        <a className="underline underline-offset-4" href={activeUrl} target="_blank" rel="noopener noreferrer">
          Open this tour directly in the headset browser
        </a>
        , then select its VR mode.
      </p>
      <p className="mt-2 text-small text-ink-soft">
        In the headset, remain seated or stationary and navigate between rooms using the tour hotspots.
      </p>
    </div>
  )
}
