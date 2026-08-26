'use client'

/**
 * CookieBanner (prompt 13). UK GDPR and PECR compliant: nothing non-essential
 * runs until the visitor chooses, declining is as easy as accepting, and the
 * decision is stored with a version so a change of cookie set re-prompts.
 *
 * Three equal actions: Accept all, Reject all, Manage preferences. Managing
 * opens the category list (strictly necessary, always on, plus analytics;
 * marketing is reserved and unused). The choice is broadcast so the analytics
 * loader reacts without a reload, and a footer link can reopen the panel at
 * any time via the pt:open-consent event.
 *
 * Styled to the system: bone ground, brass hairline, ink type.
 */
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CONSENT_VERSION,
  STORAGE_KEY,
  emptyConsent,
  grantedConsent,
  type ConsentState,
} from '@/lib/consent'

export const CONSENT_EVENT = 'pt:consent'
export const OPEN_CONSENT_EVENT = 'pt:open-consent'

/** Read the stored choice, if any and current. Safe on the server. */
export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function persist(state: ConsentState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }))
}

/** Open the preferences panel from anywhere (the footer link calls this). */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(true)
  const [managing, setManaging] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    if (stored === null) {
      delete document.documentElement.dataset.consentSet
    } else {
      document.documentElement.dataset.consentSet = 'true'
      setVisible(false)
    }
    const open = () => {
      delete document.documentElement.dataset.consentSet
      setAnalytics(readConsent()?.analytics ?? false)
      setManaging(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, open)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open)
  }, [])

  const choose = useCallback((state: ConsentState) => {
    persist(state)
    document.documentElement.dataset.consentSet = 'true'
    setVisible(false)
    setManaging(false)
  }, [])

  /** Escape rejects non-essential; it never implies acceptance. */
  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') choose(emptyConsent())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, choose])

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="cookie-banner fixed inset-x-3 bottom-3 mx-auto max-w-3xl rounded-md border border-brass/40 bg-ground p-5 shadow-warm-lg md:inset-x-6 md:bottom-6"
      style={{ zIndex: 'var(--z-toast)' }}
    >
      <p className="measure text-small text-ink">
        Analytics cookies stay off until you choose.
      </p>
      <p className="measure mt-1 text-small text-ink">
        Read our{' '}
        <Link href="/cookie-policy" className="text-sales-ink underline">
          cookie policy
        </Link>
        .
      </p>

      {managing ? (
        <div className="mt-4 flex flex-col gap-3 border-t border-brass/40 pt-4">
          <p className="text-small font-medium text-ink">Manage preferences</p>
          <label className="flex items-start gap-3 rounded-md border border-brass/40 bg-well p-3">
            <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-lettings-deep" />
            <span className="text-small text-ink-soft">
              <span className="font-medium text-ink">Strictly necessary.</span> Required for the
              site to work and for your choice to be remembered. Always on.
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-md border border-brass/40 bg-well p-3">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-4 w-4 accent-lettings-deep"
            />
            <span className="text-small text-ink-soft">
              <span className="font-medium text-ink">Analytics.</span> Lets us see how the site is
              used so we can improve it. Off until you agree.
            </span>
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-lettings"
              onClick={() => choose({ version: CONSENT_VERSION, analytics, marketing: false })}
            >
              Save preferences
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => choose(emptyConsent())}>
              Reject all
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {/* Accept all and Reject all carry identical weight: same fill, same
              size, side by side. Under UK GDPR and PECR rejecting must be as easy
              and as prominent as accepting, so the label carries the meaning, not
              the styling. Manage preferences is the lesser, tertiary action. */}
          <button type="button" className="btn btn-lettings" onClick={() => choose(grantedConsent())}>
            Accept all
          </button>
          <button type="button" className="btn btn-lettings" onClick={() => choose(emptyConsent())}>
            Reject all
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setAnalytics(readConsent()?.analytics ?? false)
              setManaging(true)
            }}
          >
            Manage preferences
          </button>
        </div>
      )}
    </div>
  )
}
