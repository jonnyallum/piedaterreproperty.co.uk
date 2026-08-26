/**
 * Consent configuration, single source of truth (prompt 13).
 *
 * The cookie banner and the /cookie-policy table both read from here so the
 * two can never drift apart: add a cookie here and the table updates, bump the
 * version and every visitor is asked again because stored consent from an
 * older version is ignored.
 *
 * Categories deliberately mirror what the site actually uses. Only the
 * necessary category and analytics are present because no marketing
 * technology is deployed; the marketing field stays in the shape so a future
 * advertising tag cannot be added without a visible consent decision.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

/** The stored decision. `version` is checked against CONSENT_VERSION. */
export interface ConsentState {
  version: number
  analytics: boolean
  marketing: boolean
}

/**
 * Bump whenever the cookie set, the categories or the wording change. Older
 * stored consent then reads as absent and the banner asks again.
 */
export const CONSENT_VERSION = 1

export const STORAGE_KEY = 'pt-consent'

export interface CookieDef {
  name: string
  provider: string
  purpose: string
  duration: string
  category: ConsentCategory
}

/**
 * Every cookie or similar technology the site can set. GA4 entries are only
 * written after analytics consent; the banner gates them. pt-consent is
 * browser storage, included because the prompt requires every similar
 * technology to be declared.
 */
export const COOKIES: CookieDef[] = [
  {
    name: 'pt-consent',
    provider: 'Pied-à-Terre Property',
    purpose: 'Stores your cookie choices so we do not ask again and analytics stay off until you agree.',
    duration: 'Until you clear your browser data',
    category: 'necessary',
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    purpose: 'Distinguishes one visitor from another so we can see how the site is used.',
    duration: '2 years',
    category: 'analytics',
  },
  {
    name: '_ga_<ID>',
    provider: 'Google Analytics',
    purpose: 'Persists the session state for the measurement ID in use.',
    duration: '2 years',
    category: 'analytics',
  },
  {
    name: '_gid',
    provider: 'Google Analytics',
    purpose: 'Groups actions within a single session.',
    duration: '24 hours',
    category: 'analytics',
  },
  {
    name: '_gat',
    provider: 'Google Analytics',
    purpose: 'Throttles the request rate.',
    duration: '1 minute',
    category: 'analytics',
  },
] as const

export const CATEGORY_LABEL: Record<ConsentCategory, string> = {
  necessary: 'Strictly necessary',
  analytics: 'Analytics',
  marketing: 'Marketing',
}

export const CATEGORY_NOTE: Record<ConsentCategory, string> = {
  necessary: 'Required for the site to work and for your consent to be remembered. Always on.',
  analytics: 'Lets us see how the site is used so we can improve it. Off until you agree.',
  marketing: 'No marketing cookies are currently used. This category is reserved.',
}

/** A fresh state with everything denied. */
export function emptyConsent(): ConsentState {
  return { version: CONSENT_VERSION, analytics: false, marketing: false }
}

/** Everything granted. */
export function grantedConsent(): ConsentState {
  return { version: CONSENT_VERSION, analytics: true, marketing: false }
}
