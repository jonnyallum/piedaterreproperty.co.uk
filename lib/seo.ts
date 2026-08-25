/**
 * Metadata and JSON-LD helpers. Expanded in prompt 11; the base helpers here
 * keep titles, canonicals and the indexing gate consistent from prompt 01 on.
 */
import type { Metadata } from 'next'
import { SITE } from './site'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.urls.production
/** Indexing is off by default so the temporary preview domain stays noindex. */
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export const siteUrl = SITE_URL

interface PageMetaInput {
  title: string
  description: string
  path: string
  ogImage?: string
  noindex?: boolean
}

/** Absolute canonical URL for a route path. */
export function canonical(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return new URL(clean, SITE_URL).toString()
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
export function realEstateAgentJsonLd() {
  const hours = SITE.openingHours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    }))

  return {
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
