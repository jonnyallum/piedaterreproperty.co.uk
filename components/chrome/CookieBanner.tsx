'use client'

/**
 * CookieBanner. UK GDPR compliant: analytics stay off until the visitor makes
 * a choice, and declining is a first-class, equally weighted option. The choice
 * is stored locally and broadcast so the analytics loader (prompt 11) can react
 * without a page reload. Full policy detail lives on /cookie-policy.
 *
 * Styled to the system, never left as a default browser prompt.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'

export type ConsentChoice = 'granted' | 'denied'
const STORAGE_KEY = 'pt-consent'

/** Read the stored choice, if any. Safe on the server. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'granted' || value === 'denied' ? value : null
}

function setConsent(choice: ConsentChoice) {
  window.localStorage.setItem(STORAGE_KEY, choice)
  window.dispatchEvent(new CustomEvent('pt:consent', { detail: choice }))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  const choose = (choice: ConsentChoice) => {
    setConsent(choice)
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="fixed inset-x-3 bottom-3 mx-auto max-w-3xl rounded-md border border-brass/40 bg-ground p-5 shadow-warm-lg md:inset-x-6 md:bottom-6"
      style={{ zIndex: 'var(--z-toast)' }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="measure text-small text-ink">
          We use a small number of cookies to understand how the site is used and to
          improve it. Nothing is set until you choose. Read our{' '}
          <Link href="/cookie-policy" className="text-sales-ink underline">
            cookie policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" className="btn btn-secondary" onClick={() => choose('denied')}>
            Decline
          </button>
          <button type="button" className="btn btn-lettings" onClick={() => choose('granted')}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
