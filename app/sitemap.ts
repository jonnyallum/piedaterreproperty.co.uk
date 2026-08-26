import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { PROPERTIES } from '@/lib/properties'
import { areaSlugs } from '@/content/areas/pages'

/**
 * Generated sitemap (prompt 11 E). Enumerates every indexable route: the static
 * marketing and service pages, all five area pages, every property including sold
 * and let ones, and the FAQ page. The internal style guide, the API, the
 * thank-you pages and the review short link are deliberately excluded, matching
 * robots.
 *
 * lastModified is taken from real content dates where we have them (properties),
 * so it means something, rather than from the build clock. Property entries carry
 * their images so the file doubles as an image sitemap once photography lands.
 */
const BASE = SITE.urls.production

type Entry = MetadataRoute.Sitemap[number]

function url(path: string): string {
  return path === '/' ? BASE : `${BASE}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with a hand-set priority and change frequency. Home and the two
  // service hubs rank highest; supporting pages lower.
  const staticRoutes: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] =
    [
      { path: '/', priority: 1.0, changeFrequency: 'daily' },
      { path: '/sales', priority: 0.9, changeFrequency: 'weekly' },
      { path: '/lettings', priority: 0.9, changeFrequency: 'weekly' },
      { path: '/properties', priority: 0.9, changeFrequency: 'daily' },
      { path: '/sales/how-we-sell', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/sales/fees', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/sales/why-a-local-agent', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/sales/landlords', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/sales/free-valuation', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/lettings/why-choose-us', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/lettings/fees', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/lettings/landlord-obligations', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/lettings/rental-valuation', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/tenants', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/tenants/the-process', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/tenants/register', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/tenants/report-maintenance', priority: 0.5, changeFrequency: 'monthly' },
      { path: '/tenants/holding-deposits', priority: 0.5, changeFrequency: 'monthly' },
      { path: '/tenants/tenant-fees', priority: 0.5, changeFrequency: 'monthly' },
      { path: '/areas', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/reviews', priority: 0.6, changeFrequency: 'weekly' },
      { path: '/faqs', priority: 0.6, changeFrequency: 'monthly' },
      { path: '/blog', priority: 0.5, changeFrequency: 'weekly' },
    ]

  const staticEntries: Entry[] = staticRoutes.map((r) => ({
    url: url(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const areaEntries: Entry[] = areaSlugs().map((slug) => ({
    url: url(`/areas/${slug}`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const propertyEntries: Entry[] = PROPERTIES.map((p) => {
    const images = p.images
      .map((img) => img.src)
      .filter((src) => /^https?:\/\//.test(src) || src.startsWith('/'))
      .map((src) => (src.startsWith('/') ? `${BASE}${src}` : src))
    return {
      url: url(`/properties/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
      ...(images.length ? { images } : {}),
    }
  })

  return [...staticEntries, ...areaEntries, ...propertyEntries]
}
