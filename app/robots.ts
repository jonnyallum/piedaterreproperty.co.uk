import type { MetadataRoute } from 'next'
import { isProduction } from '@/lib/env'
import { SITE } from '@/lib/site'

/**
 * robots.txt (prompt 11 E), environment-aware from a single variable.
 *
 * On any preview or temporary domain the entire site is disallowed, backed by an
 * X-Robots-Tag: noindex header in next.config so nothing is indexed by accident.
 * On production everything is allowed except the API, the internal style guide
 * and the thank-you pages, and the sitemap is pointed at the absolute production
 * URL.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.urls.production

  if (!isProduction) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/style-guide', '/thank-you/', '/review'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
