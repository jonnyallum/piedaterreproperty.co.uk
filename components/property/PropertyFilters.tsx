'use client'

/**
 * PropertyFilters. Filter state lives in the URL as search params, so results
 * are shareable and indexable and the server renders them directly. Built as a
 * GET form so it works without JavaScript; with JavaScript it auto-submits on
 * change for immediacy. No client-side data fetching.
 */
import { useRef } from 'react'
import { SelectField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { cn } from '@/lib/cn'

interface PropertyFiltersProps {
  towns: string[]
  propertyTypes: string[]
  current: {
    path: string
    town: string
    minBeds: string
    maxPrice: string
    propertyType: string
    sort: string
  }
}

const TYPES = [
  { value: 'all', label: 'All' },
  { value: 'lettings', label: 'To rent' },
  { value: 'sales', label: 'For sale' },
]

export function PropertyFilters({ towns, propertyTypes, current }: PropertyFiltersProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const submit = () => formRef.current?.requestSubmit()

  return (
    <form
      ref={formRef}
      action="/properties"
      method="get"
      className="rounded-[1.75rem] border-2 border-ink bg-ground p-6"
      aria-label="Filter properties"
    >
      {/* Transaction type as radios: one value, works with and without JS. */}
      <fieldset className="mb-4">
        <legend className="sr-only">Transaction type</legend>
        <div className="inline-flex rounded-full border border-ink/20 bg-well p-1">
          {TYPES.map((t) => {
            const active = current.path === t.value || (!current.path && t.value === 'all')
            const fill =
              t.value === 'sales'
                ? 'peer-checked:bg-sales-ink'
                : t.value === 'lettings'
                  ? 'peer-checked:bg-lettings-deep'
                  : 'peer-checked:bg-night'
            return (
              <label key={t.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="path"
                  value={t.value}
                  defaultChecked={active}
                  onChange={submit}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    'block rounded-full px-5 py-2 text-small font-medium text-ink-soft transition-colors peer-checked:text-on-dark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brass',
                    fill
                  )}
                >
                  {t.label}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField id="f-town" name="town" label="Area" defaultValue={current.town} onChange={submit}>
          <option value="">All areas</option>
          {towns.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
        <SelectField id="f-beds" name="minBeds" label="Bedrooms" defaultValue={current.minBeds} onChange={submit}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((b) => (
            <option key={b} value={b}>
              {b}+
            </option>
          ))}
        </SelectField>
        <SelectField id="f-price" name="maxPrice" label="Up to" defaultValue={current.maxPrice} onChange={submit}>
          <option value="">No maximum</option>
          {[750, 1000, 1500, 2000, 250000, 400000, 600000, 1000000].map((p) => (
            <option key={p} value={p}>{`£${p.toLocaleString('en-GB')}`}</option>
          ))}
        </SelectField>
        <SelectField id="f-type" name="propertyType" label="Type" defaultValue={current.propertyType} onChange={submit}>
          <option value="">All types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <SelectField id="f-sort" name="sort" label="Sort" defaultValue={current.sort} onChange={submit} className="w-full sm:w-56">
          <option value="newest">Newest first</option>
          <option value="price_asc">Price, low to high</option>
          <option value="price_desc">Price, high to low</option>
        </SelectField>
        <Button type="submit" variant="secondary">
          <Icon name="search" className="h-5 w-5" />
          Apply filters
        </Button>
      </div>
    </form>
  )
}
