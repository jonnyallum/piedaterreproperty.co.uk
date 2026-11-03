import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/marketing/Breadcrumbs'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PropertySearchLead } from '@/components/property/PropertySearchLead'
import { MapPanel } from '@/components/property/MapPanel'
import {
  queryProperties,
  townsInData,
  propertyTypesInData,
  type PropertyQuery,
} from '@/lib/properties'
import { pageMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { gbp } from '@/lib/format'

const PAGE_SIZE = 9

type RawParams = Record<string, string | string[] | undefined>

export const metadata: Metadata = pageMeta({
  title: 'Property search',
  description:
    'Search homes to rent and for sale across Portsmouth, Havant, Waterlooville, Emsworth and Hayling Island.',
  path: '/properties',
})

const first = (v: string | string[] | undefined): string =>
  (Array.isArray(v) ? v[0] : v)?.trim() ?? ''

/** Build a /properties URL from a partial query, dropping empties. */
function href(params: Record<string, string | number | undefined>): string {
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '' && v !== 'all') usp.set(k, String(v))
  }
  const qs = usp.toString()
  return qs ? `/properties?${qs}` : '/properties'
}

const PATH_LABEL: Record<string, string> = {
  all: 'Our properties',
  sales: 'Homes for sale',
  lettings: 'Homes to rent',
}

/** Human phrase for the current search, for the empty-state lead. */
function summarise(q: {
  path: string
  town: string
  minBeds: string
  maxPrice: string
  propertyType: string
}): string {
  const bits: string[] = []
  if (q.minBeds) bits.push(`${q.minBeds}+ bedroom`)
  bits.push(q.propertyType ? q.propertyType.toLowerCase() : 'homes')
  if (q.town) bits.push(`in ${q.town}`)
  if (q.maxPrice) bits.push(`up to ${gbp(Number(q.maxPrice))}`)
  if (q.path === 'sales') bits.push('to buy')
  else if (q.path === 'lettings') bits.push('to rent')
  return bits.join(' ')
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>
}) {
  const sp = await searchParams
  const current = {
    path: first(sp.path) || 'all',
    town: first(sp.town),
    minBeds: first(sp.minBeds),
    maxPrice: first(sp.maxPrice),
    propertyType: first(sp.propertyType),
    sort: first(sp.sort) || 'newest',
  }
  const pageNum = Math.max(1, Number(first(sp.page)) || 1)

  const query: PropertyQuery = {
    path: (current.path as PropertyQuery['path']) || 'all',
    town: current.town || undefined,
    minBeds: current.minBeds ? Number(current.minBeds) : undefined,
    maxPrice: current.maxPrice ? Number(current.maxPrice) : undefined,
    propertyType: current.propertyType || undefined,
    sort: current.sort as PropertyQuery['sort'],
  }

  const all = queryProperties(query)
  const total = all.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(pageNum, pages)
  const start = (page - 1) * PAGE_SIZE
  const results = all.slice(start, start + PAGE_SIZE)

  const tone = current.path === 'sales' ? 'sales' : current.path === 'lettings' ? 'lettings' : 'brass'
  const ruleColor =
    tone === 'sales' ? 'bg-night' : tone === 'lettings' ? 'bg-lettings' : 'bg-brass'

  // Alternatives that broaden the search by dropping one filter at a time.
  const alternatives = total === 0 ? broadenings(current) : []

  return (
    <>
      <section className="border-b-[length:var(--pane-gap)] border-ink bg-ground pt-28 md:pt-32">
        <div className="mx-auto max-w-content px-6 pb-8 md:px-8">
          <Breadcrumbs trail={[{ name: 'Properties', path: '/properties' }]} />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow tone="slate">Property search</Eyebrow>
              <h1 className="mt-2 text-h2">{PATH_LABEL[current.path] ?? PATH_LABEL.all}</h1>
            </div>
            <p className="tabular text-small text-ink-soft">
              {total === 0
                ? 'No matches'
                : `${total} ${total === 1 ? 'property' : 'properties'}${
                    pages > 1 ? `, page ${page} of ${pages}` : ''
                  }`}
            </p>
          </div>
          <div className={`mt-4 h-0.5 w-16 ${ruleColor}`} aria-hidden="true" />
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-10 md:px-8">
        <PropertyFilters
          towns={townsInData()}
          propertyTypes={propertyTypesInData()}
          current={current}
        />

        {total > 0 ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {pages > 1 ? (
              <nav
                className="mt-14 flex items-center justify-between border-t-[length:var(--pane-gap)] border-ink pt-6"
                aria-label="Pagination"
              >
                {page > 1 ? (
                  <Link
                    rel="prev"
                    href={href({ ...filterParams(current), page: page - 1 === 1 ? undefined : page - 1 })}
                    className="btn btn-ghost"
                  >
                    Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="tabular text-small text-ink-soft">
                  Page {page} of {pages}
                </span>
                {page < pages ? (
                  <Link
                    rel="next"
                    href={href({ ...filterParams(current), page: page + 1 })}
                    className="btn btn-ghost"
                  >
                    Next
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}

            <div className="mt-14">
              <h2 className="text-h3">Where these are</h2>
              <p className="measure mt-2 text-small text-ink-soft">
                An overview of the area we cover. Exact locations are confirmed when you enquire.
              </p>
              <div className="mt-5">
                <MapPanel
                  centerLat={SITE.office.lat}
                  centerLng={SITE.office.lng}
                  label="Map of the area covered by Pied-à-Terre Property"
                  buttonLabel="Show area map"
                  note="A general view of the Solent coast we cover. The exact address of each property is confirmed on enquiry."
                />
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <h2 className="text-h2">Nothing matching that right now</h2>
              <p className="measure mt-3 text-body text-ink-soft">
                Our available stock moves quickly, and the sales arm is newly launched. Register
                below and we will tell you the moment something fits, often before it reaches the
                portals.
              </p>
              {alternatives.length ? (
                <div className="mt-6">
                  <p className="eyebrow text-ink-soft">Try broadening</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {alternatives.map((alt) => (
                      <li key={alt.href}>
                        <Link
                          href={alt.href}
                          className="inline-flex items-center gap-2 text-body text-sales-ink underline underline-offset-4 hover:no-underline"
                        >
                          {alt.label}
                          <span className="tabular text-small text-ink-soft">({alt.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <PropertySearchLead
              summary={summarise(current)}
              criteria={{
                path: current.path,
                town: current.town,
                minBeds: current.minBeds,
                maxPrice: current.maxPrice,
                propertyType: current.propertyType,
              }}
            />
          </div>
        )}
      </section>
    </>
  )
}

type Current = {
  path: string
  town: string
  minBeds: string
  maxPrice: string
  propertyType: string
  sort: string
}

/** Just the filter params, for pagination links. */
function filterParams(c: Current) {
  return {
    path: c.path,
    town: c.town,
    minBeds: c.minBeds,
    maxPrice: c.maxPrice,
    propertyType: c.propertyType,
    sort: c.sort === 'newest' ? undefined : c.sort,
  }
}

interface Alt {
  label: string
  href: string
  count: number
}

/** Up to three broader searches that actually return results. */
function broadenings(c: Current): Alt[] {
  const base: PropertyQuery = {
    path: (c.path as PropertyQuery['path']) || 'all',
    town: c.town || undefined,
    minBeds: c.minBeds ? Number(c.minBeds) : undefined,
    maxPrice: c.maxPrice ? Number(c.maxPrice) : undefined,
    propertyType: c.propertyType || undefined,
  }
  const out: Alt[] = []
  const push = (label: string, patch: Partial<PropertyQuery>, drop: Partial<Record<keyof Current, true>>) => {
    const count = queryProperties({ ...base, ...patch }).length
    if (count > 0) {
      const params = { ...filterParams(c) } as Record<string, string | number | undefined>
      for (const key of Object.keys(drop)) params[key] = undefined
      out.push({ label, href: href(params), count })
    }
  }
  if (c.propertyType) push('Any property type', { propertyType: undefined }, { propertyType: true })
  if (c.town) push('Any area', { town: undefined }, { town: true })
  if (c.minBeds) push('Any number of bedrooms', { minBeds: undefined }, { minBeds: true })
  if (c.maxPrice) push('No maximum price', { maxPrice: undefined }, { maxPrice: true })
  if (c.path !== 'all') push('Sales and lettings', { path: 'all' }, { path: true })
  return out.slice(0, 3)
}
