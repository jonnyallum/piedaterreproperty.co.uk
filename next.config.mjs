import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The old Wix URLs never carried a trailing slash; keep the new ones the same
  // so a migrated link resolves in one hop with no normalisation redirect.
  trailingSlash: false,
  // Pin the tracing root: other lockfiles exist higher up the machine.
  outputFileTracingRoot: projectRoot,
  // Keep metadata in <head> for every user agent. Dynamic property-search
  // routes otherwise stream their static metadata into <body>, where audit and
  // crawler tooling can miss the description and canonical.
  htmlLimitedBots: /.*/,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 24, 48, 64, 96, 128, 256, 384],
  },
  // 301 map from the old Wix URLs to their closest new equivalent (prompt 15 E).
  // Each old path points straight at a live page, so every redirect is a single
  // hop to a 200 with no chain. The paths that are unchanged (/, /privacy-policy,
  // /complaints-procedure) simply resolve and need no entry. Host-level rules
  // (www to apex, http to https) are set on the Vercel domain, not here, so they
  // never chain in front of these. See DEPLOY.md.
  async redirects() {
    const map = [
      ['/home', '/'],
      ['/the-process', '/tenants/the-process'],
      ['/registerwithus', '/tenants/register'],
      ['/report-maintenance-issue', '/tenants/report-maintenance'],
      ['/holdingdeposits', '/tenants/holding-deposits'],
      ['/whychooseus', '/lettings/why-choose-us'],
      ['/obligations', '/lettings/landlord-obligations'],
      ['/portfolio', '/lettings'],
      ['/feesandservicelevels', '/lettings/fees'],
      ['/contactus', '/contact'],
      ['/services', '/lettings'],
      ['/cookies', '/cookie-policy'],
    ]
    // statusCode 301, not `permanent: true` (which emits 308). The brief and the
    // wider SEO tooling expect a 301 Moved Permanently for a migrated URL.
    return map.map(([source, destination]) => ({ source, destination, statusCode: 301 }))
  },
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
      },
    ]
    // On any non-production deployment, send a hard noindex header on every
    // response, belt-and-braces with robots.txt, so the temporary domain can
    // never be indexed even if a page is requested directly.
    const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production'
    if (!isProduction) {
      security.push({ key: 'X-Robots-Tag', value: 'noindex, nofollow' })
    }
    return [{ source: '/(.*)', headers: security }]
  },
}

export default nextConfig
