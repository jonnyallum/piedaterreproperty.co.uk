import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the tracing root: other lockfiles exist higher up the machine.
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 24, 48, 64, 96, 128, 256, 384],
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
