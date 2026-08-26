'use client'

/**
 * ConsentLink. A discreet footer control that reopens the cookie preferences
 * panel, so a visitor can change their mind after the first decision without
 * clearing their browser data. The banner listens for the event this fires.
 */
import { openConsentPreferences } from '@/components/chrome/CookieBanner'

export function ConsentLink() {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="inline-flex min-h-11 items-center hover:text-on-dark"
    >
      Cookie preferences
    </button>
  )
}
