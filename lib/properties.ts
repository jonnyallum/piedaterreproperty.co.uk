/**
 * Property loader and queries. The raw seed data is validated against
 * PropertySchema at module load, so a malformed listing fails `npm run build`
 * rather than shipping. Because it is a discriminated union, a sales listing
 * missing any required material information field is rejected here.
 */
import { PropertySchema, type Property, type PropertyStatus } from '@/lib/schemas/property'
import { rawProperties } from '@/content/properties/data'

export const PROPERTIES: Property[] = PropertySchema.array().parse(rawProperties)

/**
 * Negative self-test. A guard is not trustworthy until it has failed on
 * purpose, so in development we assert the schema rejects a sale listing that is
 * missing its material information. If this ever stops throwing, the enforcement
 * has regressed and we want to know at once.
 */
if (process.env.NODE_ENV !== 'production') {
  const brokenSale = {
    id: 'x',
    slug: 'broken-fixture',
    transactionType: 'sale',
    status: 'available',
    displayAddress: 'Broken Fixture',
    fullAddress: { line1: 'x', town: 'Havant', postcode: 'PO9' },
    postcodeOutcode: 'PO9',
    town: 'Havant',
    price: { amount: 1, qualifier: 'guide' },
    propertyType: 'House',
    summary: 'x',
    description: ['x'],
    features: [],
    images: [],
    featured: false,
    tenure: 'freehold',
    councilTaxBand: 'C',
    publishedAt: '2026-01-01',
    updatedAt: '2026-01-01',
    // materialInformation deliberately omitted, must be rejected.
  }
  const result = PropertySchema.safeParse(brokenSale)
  if (result.success) {
    throw new Error(
      'Property schema regression: a sale listing without material information was accepted.'
    )
  }
}

const AVAILABLE: PropertyStatus[] = ['available', 'under_offer', 'let_agreed', 'sold_stc']

export function isAvailable(p: Property): boolean {
  return AVAILABLE.includes(p.status)
}

export function getBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug)
}

export function allSlugs(): string[] {
  return PROPERTIES.map((p) => p.slug)
}

export interface PropertyQuery {
  path?: 'sales' | 'lettings' | 'all'
  town?: string
  minBeds?: number
  maxPrice?: number
  propertyType?: string
  status?: 'available' | 'all'
  sort?: 'newest' | 'price_asc' | 'price_desc'
}

const txForPath = (path: PropertyQuery['path']) =>
  path === 'sales' ? 'sale' : path === 'lettings' ? 'letting' : null

export function queryProperties(q: PropertyQuery): Property[] {
  const tx = txForPath(q.path)
  let results = PROPERTIES.filter((p) => {
    if (tx && p.transactionType !== tx) return false
    if (q.town && p.town.toLowerCase() !== q.town.toLowerCase()) return false
    if (q.minBeds && (p.bedrooms ?? 0) < q.minBeds) return false
    if (q.maxPrice && p.price.qualifier !== 'poa' && p.price.amount > q.maxPrice) return false
    if (q.propertyType && p.propertyType !== q.propertyType) return false
    if (q.status === 'available' && !isAvailable(p)) return false
    return true
  })

  const priceOf = (p: Property) => (p.price.qualifier === 'poa' ? Infinity : p.price.amount)
  switch (q.sort) {
    case 'price_asc':
      results = results.sort((a, b) => priceOf(a) - priceOf(b))
      break
    case 'price_desc':
      results = results.sort((a, b) => priceOf(b) - priceOf(a))
      break
    default:
      results = results.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }
  return results
}

/** Distinct towns present in the data, for the filter dropdown. */
export function townsInData(): string[] {
  return Array.from(new Set(PROPERTIES.map((p) => p.town))).sort((a, b) => a.localeCompare(b))
}

/** Distinct property types present, for the filter dropdown. */
export function propertyTypesInData(): string[] {
  return Array.from(new Set(PROPERTIES.map((p) => p.propertyType))).sort((a, b) =>
    a.localeCompare(b)
  )
}

export function featuredProperties(limit = 3): Property[] {
  const featured = PROPERTIES.filter((p) => p.featured)
  const pool = featured.length >= limit ? featured : PROPERTIES
  return pool.slice(0, limit)
}

/**
 * Properties genuinely associated with a town: an exact town match, or a listing
 * whose outcode falls within the town's postcodes. Available stock first, then
 * the most recent track record, so a town with no current listings still shows
 * proof of work rather than an empty section.
 */
export function propertiesInArea(
  areaName: string,
  postcodes: readonly string[],
  limit = 6
): Property[] {
  const codes = new Set(postcodes.map((c) => c.toUpperCase()))
  return PROPERTIES.filter(
    (p) =>
      p.town.toLowerCase() === areaName.toLowerCase() ||
      codes.has(p.postcodeOutcode.toUpperCase())
  )
    .sort((a, b) => {
      const av = isAvailable(a) ? 0 : 1
      const bv = isAvailable(b) ? 0 : 1
      return av - bv || b.publishedAt.localeCompare(a.publishedAt)
    })
    .slice(0, limit)
}

/** Similar by transaction type and town, then by nearest bedroom count. */
export function similarProperties(to: Property, limit = 3): Property[] {
  return PROPERTIES.filter(
    (p) => p.slug !== to.slug && p.transactionType === to.transactionType
  )
    .sort((a, b) => {
      const sameTown = (p: Property) => (p.town === to.town ? 0 : 1)
      const bedGap = (p: Property) =>
        Math.abs((p.bedrooms ?? 0) - (to.bedrooms ?? 0))
      return sameTown(a) - sameTown(b) || bedGap(a) - bedGap(b)
    })
    .slice(0, limit)
}
