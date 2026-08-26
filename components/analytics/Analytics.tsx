'use client'

/**
 * Analytics (prompt 11 + 13). Loads Google Consent Mode v2 in a denied-by-default
 * state before any tag, then GA4 (gtag.js) and the GTM container. Nothing is
 * measured until the visitor accepts in the cookie banner: on accept we update
 * only analytics_storage to granted and leave the advertising signals denied,
 * which is the correct posture for a firm that measures usage but does not
 * advertise on personal data.
 *
 * The consent-default script runs beforeInteractive so it is in the HTML for
 * Search Console's tag-based verification and so the tags never fire before the
 * default is set. When no measurement IDs are configured yet, only the consent
 * default renders: safe, and ready for the IDs to drop in.
 */
import Script from 'next/script'
import { useEffect } from 'react'
import { readConsent, type ConsentChoice } from '@/components/chrome/CookieBanner'

const GA4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
const GTM = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID

export function Analytics() {
  useEffect(() => {
    const apply = (choice: ConsentChoice) => {
      if (typeof window.gtag !== 'function') return
      // Analytics only. Advertising signals stay denied in both states.
      window.gtag('consent', 'update', {
        analytics_storage: choice === 'granted' ? 'granted' : 'denied',
      })
    }
    const stored = readConsent()
    if (stored) apply(stored)
    const handler = (e: Event) => apply((e as CustomEvent<ConsentChoice>).detail)
    window.addEventListener('pt:consent', handler)
    return () => window.removeEventListener('pt:consent', handler)
  }, [])

  return (
    <>
      {/* Consent Mode v2 defaults run from a raw inline script in the layout,
          which parses before these afterInteractive tags, so the defaults are
          always set first. See ConsentDefaultScript below. */}
      {GTM ? (
        <Script id="pt-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      ) : null}

      {GA4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`}
            strategy="afterInteractive"
          />
          <Script id="pt-ga4" strategy="afterInteractive">
            {`gtag('js',new Date());gtag('config','${GA4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
    </>
  )
}

/**
 * The Consent Mode v2 default, as a raw inline script string. Rendered directly
 * in the layout so it parses and runs before any tag, setting every storage
 * signal to denied until the visitor consents. Kept here beside the tags it
 * governs. This is a plain string injected via dangerouslySetInnerHTML in the
 * layout, not a next/script, so its execution order is guaranteed.
 */
export const CONSENT_DEFAULT_SCRIPT =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});"

/**
 * The GTM noscript iframe. Rendered in the body per Google's documented snippet,
 * so tag-manager still fires for visitors without JavaScript. Renders nothing
 * when no container is configured. Server component.
 */
export function GtmNoScript() {
  if (!GTM) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
