/**
 * EpcBar. The energy rating drawn as the familiar stepped band chart buyers
 * recognise, remapped onto the warm palette rather than the harsh traffic-light
 * greens and reds. Bands grow A to G; the property's own band is pulled out and
 * carries its score. Server component, no client weight.
 */
import type { Epc } from '@/lib/schemas/property'
import { cn } from '@/lib/cn'

type Rating = Epc['rating']

const BANDS: { rating: Rating; fill: string; width: string }[] = [
  { rating: 'A', fill: 'bg-lettings-deep', width: '46%' },
  { rating: 'B', fill: 'bg-lettings', width: '55%' },
  { rating: 'C', fill: 'bg-sage', width: '64%' },
  { rating: 'D', fill: 'bg-ochre', width: '73%' },
  { rating: 'E', fill: 'bg-marigold', width: '82%' },
  { rating: 'F', fill: 'bg-sales', width: '91%' },
  { rating: 'G', fill: 'bg-madder', width: '100%' },
]

/** Bands where dark text meets AA on the fill; the rest take bone. */
const DARK_TEXT = new Set<Rating>(['D', 'E'])

export function EpcBar({ epc }: { epc: Epc }) {
  return (
    <figure>
      <figcaption className="eyebrow text-ink-soft">
        Energy performance
        <span className="sr-only">
          . This home is rated {epc.rating}, with a score of {epc.score} out of 100.
        </span>
      </figcaption>
      <ul className="mt-4 flex flex-col gap-1.5" aria-hidden="true">
        {BANDS.map((band) => {
          const isCurrent = band.rating === epc.rating
          return (
            <li key={band.rating} className="flex items-center gap-3">
              <div className="relative flex-1">
                <div
                  className={cn(
                    'flex h-7 items-center justify-between rounded-r-sm pl-3 pr-2 text-small font-medium',
                    band.fill,
                    DARK_TEXT.has(band.rating) ? 'text-ink' : 'text-on-dark',
                    isCurrent ? 'opacity-100' : 'opacity-35'
                  )}
                  style={{ width: band.width }}
                >
                  <span className="tabular">{band.rating}</span>
                </div>
              </div>
              {isCurrent ? (
                <span className="inline-flex items-center gap-2 whitespace-nowrap text-small text-ink">
                  <span className="font-medium">This home</span>
                  <span className="tabular rounded-xs bg-night px-2 py-0.5 text-on-dark">
                    {epc.score}
                  </span>
                </span>
              ) : (
                <span className="w-20" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ul>
      {epc.certificateUrl ? (
        <a
          href={epc.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-small text-sales-ink underline underline-offset-4 hover:no-underline"
        >
          View the full EPC certificate
        </a>
      ) : null}
    </figure>
  )
}
