import type { Metadata, Viewport } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { SkipLink } from '@/components/chrome/SkipLink'
import { Nav } from '@/components/chrome/Nav'
import { Footer } from '@/components/chrome/Footer'
import { MobileActionBar } from '@/components/chrome/MobileActionBar'
import { CookieBanner } from '@/components/chrome/CookieBanner'
import { Analytics, GtmNoScript, CONSENT_DEFAULT_SCRIPT } from '@/components/analytics/Analytics'
import { UtmCapture } from '@/components/analytics/UtmCapture'
import { JsonLd } from '@/components/seo/JsonLd'
import { Grain } from '@/components/primitives/Grain'
import { themeColor } from '@/lib/tokens'
import { SITE } from '@/lib/site'
import { siteUrl, organizationJsonLd, webSiteJsonLd } from '@/lib/seo'
import '@/lib/env'

const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pied-à-Terre Property, Solent coast lettings, management and sales',
    template: '%s . Pied-à-Terre Property',
  },
  description:
    'An established, award-winning independent lettings and management firm on the Solent coast, now selling homes across Havant, Portsmouth, Waterlooville, Emsworth and Hayling Island.',
  applicationName: SITE.tradingName,
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: true, address: false, email: false },
  verification: {
    // Public Search Console verification token from COMPANY_FACTS.
    google: 'BpT8hQ4na5JN9XjBUw5POfEjtjL-DGcQWznTFk_Z5-w',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: themeColor.dark },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={fontVariables}>
        {/* Consent Mode v2 defaults: denied for every signal until consent. This
            raw inline script parses before any tag, guaranteeing order. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        {/* GTM noscript iframe, immediately after body per Google's snippet. */}
        <GtmNoScript />
        {/* Mark that JavaScript is available so scroll entrances never hide
            content from a no-JS visitor. Runs during parse, before reveals. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* Consent Mode v2 defaults plus GA4 and GTM, denied until consent. */}
        <Analytics />
        {/* Capture campaign utm_* params on landing so leads carry attribution. */}
        <UtmCapture />
        {/* Organisation and WebSite structured data, site-wide. */}
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <SkipLink />
        <Grain />
        <Nav />
        <main id="main" className="relative" style={{ zIndex: 'var(--z-content)' }}>
          {children}
        </main>
        <div className="pb-16 md:pb-0">
          <Footer />
        </div>
        <MobileActionBar />
        <CookieBanner />
      </body>
    </html>
  )
}
