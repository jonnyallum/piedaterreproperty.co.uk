/**
 * Environment posture (prompt 11 E). One variable, NEXT_PUBLIC_SITE_ENV, decides
 * whether this deployment is the live production site or a preview. Everything
 * that must differ between the temporary domain and the real one keys off this,
 * so flipping environments is a single change and a single deploy.
 *
 * The startup assertion is the safety net: if a deployment claims to be
 * production but is configured to serve noindex, that is the exact mistake that
 * quietly de-indexes a launched site, so we fail the build loudly rather than
 * ship it. Importing this module for its side effect runs the check.
 */
export type SiteEnv = 'production' | 'preview'

export const SITE_ENV: SiteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV === 'production' ? 'production' : 'preview'

export const isProduction = SITE_ENV === 'production'

const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

if (isProduction && !ALLOW_INDEXING) {
  throw new Error(
    'Refusing to build: NEXT_PUBLIC_SITE_ENV is "production" but NEXT_PUBLIC_ALLOW_INDEXING is not "true". ' +
      'A production deployment serving noindex would quietly de-index the site. ' +
      'Set NEXT_PUBLIC_ALLOW_INDEXING=true for production, or set NEXT_PUBLIC_SITE_ENV=preview for a staging deploy.'
  )
}
