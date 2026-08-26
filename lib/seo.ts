/**
 * Metadata and JSON-LD helpers. Expanded in prompt 11; the base helpers here
 * keep titles, canonicals and the indexing gate consistent from prompt 01 on.
 */
import type { Metadata } from 'next'
import { SITE } from './site'
import type { Property } from '@/lib/schemas/property'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.urls.production
/** Indexing is off by default so the temporary preview domain stays noindex. */
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

/**
 * The canonical origin is ALWAYS the production domain, never the serving origin.
 * This is deliberate and load-bearing: the single most damaging mistake in a
 * staged launch is letting the temporary domain become the canonical, which tells
 * Google to index the wrong host. Canonicals are pinned to production regardless
 * of where the page is served from. The temporary domain is noindex anyway.
 */
const CANONICAL_ORIGIN = SITE.urls.production

export const siteUrl = SITE_URL

interface PageMetaInput {
  title: string
  description: string
  path: string
  ogImage?: string
  noindex?: boolean
}

/** Absolute canonical URL for a route path, always on the production domain. */
export function canonical(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return new URL(clean, CANONICAL_ORIGIN).toString()
}

/** Build a page's Metadata object with canonical, robots and social cards. */
export function pageMeta({
  title,
  description,
  path,
  ogImage = '/images/og/default.png',
  noindex = false,
}: PageMetaInput): Metadata {
  const url = canonical(path)
  const indexable = ALLOW_INDEXING && !noindex
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: SITE.tradingName,
      title,
      description,
      url,
      images: [{ url: new URL(ogImage, SITE_URL).toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [new URL(ogImage, SITE_URL).toString()],
    },
  }
}

/** LocalBusiness / RealEstateAgent JSON-LD, using the Portchester office. */
/**
 * Optional aggregate rating, only ever passed real Google figures. Never call
 * this with an invented rating or count: an AggregateRating in schema without
 * genuine reviews behind it is a manual-action risk and dishonest.
 */
interface AgentJsonLdOptions {
  aggregate?: { rating: number; total: number }
}

export function realEstateAgentJsonLd(opts: AgentJsonLdOptions = {}) {
  const hours = SITE.openingHours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    }))

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#organisation`,
    name: SITE.tradingName,
    legalName: SITE.legalEntity,
    url: SITE_URL,
    telephone: SITE.phone.display,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.office.line1,
      addressLocality: SITE.office.town,
      postalCode: SITE.office.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.office.lat,
      longitude: SITE.office.lng,
    },
    areaServed: ['Havant', 'Portsmouth', 'Waterlooville', 'Emsworth', 'Hayling Island'],
    openingHoursSpecification: hours,
    sameAs: [SITE.urls.instagram, SITE.urls.facebook].filter(Boolean),
  }

  if (opts.aggregate && opts.aggregate.total > 0) {
    base.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: opts.aggregate.rating,
      reviewCount: opts.aggregate.total,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return base
}

/**
 * Place JSON-LD for a town page, referenced alongside the LocalBusiness node so
 * a crawler ties the service to a real geographic place in Hampshire.
 */
export function placeJsonLd(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: name,
      addressRegion: 'Hampshire',
      addressCountry: 'GB',
    },
  }
}

/** FAQPage JSON-LD. Pass only the questions actually visible on the page. */
export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/** Map a free-text property type onto the closest schema.org accommodation. */
function residenceType(propertyType: string): string {
  const t = propertyType.toLowerCase()
  if (t.includes('flat') || t.includes('apartment') || t.includes('maisonette')) return 'Apartment'
  if (t.includes('house') || t.includes('bungalow') || t.includes('chalet') || t.includes('cottage'))
    return 'House'
  return 'Residence'
}

/** schema.org availability for a listing status. */
function offerAvailability(status: Property['status']): string {
  switch (status) {
    case 'available':
      return 'https://schema.org/InStock'
    case 'under_offer':
    case 'sold_stc':
    case 'let_agreed':
      return 'https://schema.org/LimitedAvailability'
    case 'sold':
    case 'let':
      return 'https://schema.org/SoldOut'
    default:
      return 'https://schema.org/OutOfStock'
  }
}

const FREQ_UNIT: Record<'pcm' | 'pw' | 'per_night', { code: string; text: string }> = {
  pcm: { code: 'MON', text: 'per month' },
  pw: { code: 'WEE', text: 'per week' },
  per_night: { code: 'DAY', text: 'per night' },
}

/**
 * Residence and Offer JSON-LD for a property, returned as a linked graph: the
 * Offer's itemOffered points at the Residence by @id. Prices on application are
 * emitted as an Offer with availability and no price, which is valid and honest.
 */
export function propertyJsonLd(property: Property): Record<string, unknown>[] {
  const url = canonical(`/properties/${property.slug}`)
  const residenceId = `${url}#residence`
  const images = property.images
    .map((img) => new URL(img.src, SITE_URL).toString())
    .filter((src) => !src.endsWith('undefined'))

  const residence: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': residenceType(property.propertyType),
    '@id': residenceId,
    name: property.displayAddress,
    url,
    description: property.summary,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.town,
      postalCode: property.postcodeOutcode,
      addressRegion: 'Hampshire',
      addressCountry: 'GB',
    },
  }
  if (property.bedrooms != null) residence.numberOfBedrooms = property.bedrooms
  if (property.bathrooms != null) residence.numberOfBathroomsTotal = property.bathrooms
  if (images.length) residence.image = images

  const offer: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    url,
    priceCurrency: 'GBP',
    availability: offerAvailability(property.status),
    itemOffered: { '@id': residenceId },
    seller: { '@id': `${SITE_URL}/#organisation` },
    businessFunction:
      property.transactionType === 'sale'
        ? 'https://schema.org/Sell'
        : 'https://schema.org/LeaseOut',
  }
  if (property.price.qualifier !== 'poa') {
    if (property.price.frequency) {
      const unit = FREQ_UNIT[property.price.frequency]
      offer.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        price: property.price.amount,
        priceCurrency: 'GBP',
        unitCode: unit.code,
        unitText: unit.text,
      }
    } else {
      offer.price = property.price.amount
    }
  }

  return [residence, offer]
}

/** BreadcrumbList JSON-LD from an ordered trail of label plus path. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  }
}

/**
 * Organization JSON-LD for the root, carrying the social profiles so Google can
 * connect the site to the firm's Instagram and Facebook. Kept distinct from the
 * RealEstateAgent node by @id so they are two nodes, not a conflict.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${CANONICAL_ORIGIN}/#org`,
    name: SITE.tradingName,
    legalName: SITE.legalEntity,
    url: CANONICAL_ORIGIN,
    telephone: SITE.phone.display,
    sameAs: [SITE.urls.instagram, SITE.urls.facebook].filter(Boolean),
  }
}

/**
 * WebSite JSON-LD with a SearchAction pointing at the property search, so a
 * sitelinks search box can surface in results. The query slots into the town
 * filter the search page already reads.
 */
export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_ORIGIN}/#website`,
    name: SITE.tradingName,
    url: CANONICAL_ORIGIN,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_ORIGIN}/properties?town={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
