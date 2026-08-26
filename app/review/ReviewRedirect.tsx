'use client'

/**
 * ReviewRedirect. Fires the tracked review_link_click event, then sends the
 * visitor to the Google review form. A visible link and a noscript fallback mean
 * the page always works, with or without JavaScript, and if the Place ID is not
 * yet configured it explains that rather than redirecting nowhere.
 */
import { useEffect } from 'react'
import { track } from '@/lib/analytics'

interface ReviewRedirectProps {
  target: string
  phone: string
  phoneHref: string
}

export function ReviewRedirect({ target, phone, phoneHref }: ReviewRedirectProps) {
  useEffect(() => {
    if (!target) return
    track('review_link_click', { location: 'short_link' })
    const id = setTimeout(() => {
      window.location.replace(target)
    }, 250)
    return () => clearTimeout(id)
  }, [target])

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-6 py-24 text-center md:px-8">
      {target ? (
        <>
          <h1 className="text-h2">Taking you to Google</h1>
          <p className="measure mt-4 text-body text-ink-soft">
            Thank you for taking a moment to review us. If you are not redirected automatically, use
            the button below.
          </p>
          <a href={target} className="btn btn-sales mt-8" rel="noopener noreferrer">
            Leave a review on Google
          </a>
          <noscript>
            <p className="mt-6 text-small text-ink-soft">
              JavaScript is off. Use the button above to continue to Google.
            </p>
          </noscript>
        </>
      ) : (
        <>
          <h1 className="text-h2">Reviews are not open yet</h1>
          <p className="measure mt-4 text-body text-ink-soft">
            Our Google review link is being set up. In the meantime, we would love to hear from you
            directly.
          </p>
          <a href={phoneHref} className="btn btn-lettings tabular mt-8">
            {phone}
          </a>
        </>
      )}
    </main>
  )
}
