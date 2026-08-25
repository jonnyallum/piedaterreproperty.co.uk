'use client'

/**
 * OpeningHours. The weekly hours plus a live open or closed badge, computed on
 * the client so it is always current without a rebuild. Client, because the live
 * state depends on the visitor's current time and would hydrate-mismatch if
 * rendered on the server. The static table renders immediately; the live badge
 * appears after mount so there is never a flash of wrong state.
 */
import { useEffect, useState } from 'react'
import { computeOpenState, formatTime, type OpenState } from '@/lib/hours'
import { SITE } from '@/lib/site'
import { cn } from '@/lib/cn'

export function OpenBadge({ className }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null)
  useEffect(() => {
    const update = () => setState(computeOpenState(new Date()))
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])
  if (!state) return null
  return (
    <span className={cn('inline-flex items-center gap-2 text-small', className)}>
      <span
        className={cn('h-2 w-2 rounded-full', state.open ? 'bg-lettings' : 'bg-brass')}
        aria-hidden="true"
      />
      <span className={state.open ? 'font-medium text-lettings-deep' : 'text-ink-soft'}>
        {state.label}
      </span>
    </span>
  )
}

export function OpeningHours({ className }: { className?: string }) {
  return (
    <div className={className}>
      <OpenBadge className="mb-3" />
      <dl className="flex flex-col gap-1">
        {SITE.openingHours.map((h) => (
          <div key={h.day} className="flex justify-between gap-6 text-small">
            <dt className="text-ink-soft">{h.day}</dt>
            <dd className="tabular text-ink">
              {h.open && h.close ? `${formatTime(h.open)} to ${formatTime(h.close)}` : 'Closed'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
