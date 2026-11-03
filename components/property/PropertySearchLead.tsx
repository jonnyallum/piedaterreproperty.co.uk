'use client'

/**
 * PropertySearchLead. The empty search state with a job to do. When a filter
 * combination returns nothing, this captures the exact criteria the visitor
 * searched for as a registration, so an empty result becomes a lead rather than
 * a dead end. The criteria travel in the payload; the office can match them the
 * moment the right property comes in.
 */
import { useEffect, useId, useState } from 'react'
import { Field } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'
import { track } from '@/lib/analytics'
import { CONSENT_WORDING } from '@/lib/leads'
import { readUtm } from '@/lib/utm'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/

export interface SearchCriteria {
  path: string
  town: string
  minBeds: string
  maxPrice: string
  propertyType: string
}

interface PropertySearchLeadProps {
  /** Human summary of the search, e.g. "3+ bedrooms in Havant to rent". */
  summary: string
  criteria: SearchCriteria
}

export function PropertySearchLead({ summary, criteria }: PropertySearchLeadProps) {
  const id = useId()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  // The empty state being shown is itself a measurable moment: a search that
  // found nothing but might still become a lead.
  useEffect(() => {
    track('search_empty')
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()

    const eErr: Record<string, string> = {}
    if (get('name').length < 2) eErr.name = 'Enter your name.'
    const hasEmail = EMAIL.test(get('email'))
    const hasPhone = PHONE.test(get('phone'))
    if (get('email') && !hasEmail) eErr.email = 'Enter a valid email address.'
    if (get('phone') && !hasPhone) eErr.phone = 'Enter a valid UK phone number.'
    if (!hasEmail && !hasPhone) eErr.email = 'Leave an email or a phone number so we can reach you.'
    setErrors(eErr)
    if (Object.keys(eErr).length) return

    if (get('company')) {
      setDone(true)
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind: 'registration',
          path: criteria.path === 'sales' ? 'sales' : 'lettings',
          source: 'search_alert',
          name: get('name'),
          email: get('email'),
          phone: get('phone'),
          consentMarketing: fd.get('consentMarketing') === 'on',
          utm: readUtm(),
          message: `Register interest for a search with no current matches: ${summary}.`,
          extra: {
            searchSummary: summary,
            transaction: criteria.path || 'all',
            area: criteria.town || 'any',
            minBedrooms: criteria.minBeds || 'any',
            maxPrice: criteria.maxPrice || 'no maximum',
            propertyType: criteria.propertyType || 'any',
          },
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('tenant_register_submit', { source: 'search_alert' })
      setDone(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-none bg-lettings-deep text-on-dark">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-h3">We will keep an eye out</h2>
        <p className="measure mx-auto mt-3 text-body text-ink-soft">
          You are registered for {summary}. We will be in touch the moment something matches,
          often before it reaches the portals.
        </p>
        <a href={SITE.phone.href} className="btn btn-lettings tabular mt-6 inline-flex">
          <Icon name="phone" className="h-5 w-5" />
          {SITE.phone.display}
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6 md:p-8"
      aria-label="Register interest for this search"
    >
      <h2 className="text-h3">Be first to hear</h2>
      <p className="measure mt-2 text-body text-ink-soft">
        Nothing matches <span className="font-medium text-ink">{summary}</span> right now. Leave your
        details and we will tell you the moment one comes in.
      </p>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <Field id={`${id}-name`} name="name" label="Your name" required autoComplete="name" error={errors.name} />
        <Field id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
        <Field id={`${id}-phone`} name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>

      {/* Marketing consent, separate from the registration and unticked by
          default: registering interest is not consent to wider marketing. */}
      <div className="mt-5">
        <label className="flex items-start gap-3 text-small text-ink-soft">
          <input
            type="checkbox"
            name="consentMarketing"
            className="mt-1 h-4 w-4 shrink-0 accent-lettings-deep"
          />
          <span>{CONSENT_WORDING}</span>
        </label>
        <p className="mt-2 text-small text-ink-soft">
          See our{' '}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:no-underline">
            privacy policy
          </a>{' '}
          for how we use your details.
        </p>
      </div>

      {submitError ? (
        <p className="field-error mt-4" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="mt-6">
        <Button type="submit" variant="lettings" loading={submitting}>
          Register my interest
        </Button>
      </div>
    </form>
  )
}
