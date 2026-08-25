'use client'

/**
 * HeroSearch. The site's primary instrument: a Sales and Lettings segmented
 * toggle that recolours the card, a town typeahead limited to the real coverage
 * area, a price band and bedrooms, and a search button that routes to the
 * results page. Below 768px it collapses to a single tap target that opens a
 * full-screen sheet with the same fields.
 *
 * Routes to /properties with typed query params; that page is built in prompt
 * 05 and reads these params.
 */
import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PathToggle, type Path } from '@/components/marketing/PathToggle'
import { SelectField } from '@/components/primitives/Field'
import { Icon } from '@/components/primitives/Icon'
import { AREAS } from '@/content/areas'
import { COVERAGE } from '@/lib/site'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

const SALE_PRICES = [100000, 200000, 300000, 400000, 500000, 750000, 1000000]
const RENT_PRICES = [750, 1000, 1250, 1500, 2000, 3000]
const ALL_TOWNS = [...AREAS.map((a) => a.name), ...COVERAGE.secondary]

function priceLabel(path: Path, value: number) {
  return path === 'sales'
    ? `£${value.toLocaleString('en-GB')}`
    : `£${value.toLocaleString('en-GB')} pcm`
}

interface FieldsProps {
  path: Path
  onSubmit: (e: React.FormEvent) => void
  idBase: string
}

function Fields({ path, onSubmit, idBase }: FieldsProps) {
  const prices = path === 'sales' ? SALE_PRICES : RENT_PRICES
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
      <div className="flex flex-col">
        <label htmlFor={`${idBase}-loc`} className="field-label">
          Location
        </label>
        <input
          id={`${idBase}-loc`}
          name="location"
          list={`${idBase}-towns`}
          className="field-control"
          placeholder="Town or area"
          autoComplete="off"
        />
        <datalist id={`${idBase}-towns`}>
          {ALL_TOWNS.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
      </div>

      <SelectField id={`${idBase}-price`} label="Up to" name="maxPrice" defaultValue="">
        <option value="">No maximum</option>
        {prices.map((p) => (
          <option key={p} value={p}>
            {priceLabel(path, p)}
          </option>
        ))}
      </SelectField>

      <SelectField id={`${idBase}-beds`} label="Bedrooms" name="minBeds" defaultValue="">
        <option value="">Any</option>
        {[1, 2, 3, 4, 5].map((b) => (
          <option key={b} value={b}>
            {b}+
          </option>
        ))}
      </SelectField>

      <button
        type="submit"
        className={cn('btn', path === 'sales' ? 'btn-sales' : 'btn-lettings')}
      >
        <Icon name="arrow-right" className="h-5 w-5" />
        Search
      </button>
    </form>
  )
}

export function HeroSearch() {
  const router = useRouter()
  const idBase = useId()
  const [path, setPath] = useState<Path>('sales')
  const [sheetOpen, setSheetOpen] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const params = new URLSearchParams()
    params.set('path', path)
    const location = String(data.get('location') ?? '').trim()
    const maxPrice = String(data.get('maxPrice') ?? '')
    const minBeds = String(data.get('minBeds') ?? '')
    if (location) params.set('location', location)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (minBeds) params.set('minBeds', minBeds)
    track('search_performed', { path, location, maxPrice, minBeds })
    setSheetOpen(false)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="rounded-md border border-brass/40 bg-ground p-5 shadow-warm-lg md:p-6 arch-shallow">
      <div className="mb-5 flex items-center justify-between gap-4">
        <PathToggle
          value={path}
          onChange={setPath}
          label="Choose sales or lettings"
        />
        <p className="hidden text-small text-ink-soft sm:block">
          {path === 'sales' ? 'Homes for sale' : 'Homes to rent'}
        </p>
      </div>

      {/* Desktop: inline instrument */}
      <div className="hidden md:block">
        <Fields path={path} onSubmit={submit} idBase={`${idBase}-d`} />
      </div>

      {/* Mobile: single tap target opening a full-screen sheet */}
      <button
        type="button"
        className={cn('btn w-full md:hidden', path === 'sales' ? 'btn-sales' : 'btn-lettings')}
        onClick={() => setSheetOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={sheetOpen}
      >
        <Icon name="arrow-right" className="h-5 w-5" />
        Search {path === 'sales' ? 'homes for sale' : 'homes to rent'}
      </button>

      {sheetOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search properties"
          className="fixed inset-0 flex flex-col gap-6 overflow-y-auto bg-ground p-6 md:hidden"
          style={{ zIndex: 'var(--z-menu)' }}
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow">Search</p>
            <button
              type="button"
              className="btn btn-icon"
              aria-label="Close search"
              onClick={() => setSheetOpen(false)}
            >
              <Icon name="close" />
            </button>
          </div>
          <PathToggle value={path} onChange={setPath} label="Choose sales or lettings" />
          <Fields path={path} onSubmit={submit} idBase={`${idBase}-m`} />
        </div>
      ) : null}
    </div>
  )
}
