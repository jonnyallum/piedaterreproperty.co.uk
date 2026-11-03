'use client'

/**
 * EnquiryForm. The inline enquiry on a property detail page. Every submission
 * carries the property reference, address and slug, so the office knows which
 * property before they pick up the phone. Mirrors the rest of the lead system:
 * honeypot, real validation, a clear done state, and one contactable route
 * required. Posts to /api/lead with source "property-enquiry".
 */
import { useId, useState } from 'react'
import { Field, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'
import { readUtm } from '@/lib/utm'
import { CONSENT_WORDING } from '@/lib/leads'
import { track } from '@/lib/analytics'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/

interface EnquiryFormProps {
  propertyId: string
  slug: string
  displayAddress: string
  transactionType: 'sale' | 'letting'
}

export function EnquiryForm({
  propertyId,
  slug,
  displayAddress,
  transactionType,
}: EnquiryFormProps) {
  const id = useId()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

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
    if (!hasEmail && !hasPhone) eErr.email = 'Leave an email or a phone number so we can reply.'
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
          kind: 'enquiry',
          path: transactionType === 'sale' ? 'sales' : 'lettings',
          source: 'property_enquiry',
          name: get('name'),
          email: get('email'),
          phone: get('phone'),
          message: get('message'),
          consentMarketing: consent,
          utm: readUtm(),
          propertyRef: propertyId,
          propertyAddress: displayAddress,
          propertySlug: slug,
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('enquiry_submit', { source: 'property_enquiry', property: propertyId })
      setDone(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-none border-[length:var(--pane-gap)] border-night bg-ground p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-none bg-lettings-deep text-on-dark">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-h3">Enquiry sent</h2>
        <p className="measure mx-auto mt-3 text-body text-ink-soft">
          Thank you. We have your enquiry about {displayAddress} and will be in touch shortly,
          usually the same working day.
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
      className="rounded-none border-[length:var(--pane-gap)] border-night bg-ground p-6 md:p-7"
      aria-label={`Enquire about ${displayAddress}`}
    >
      <h2 className="text-h3">Enquire about this property</h2>
      <p className="mt-2 text-small text-ink-soft">
        We will reply with availability and arrange a viewing.
      </p>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 grid gap-5">
        <Field id={`${id}-name`} name="name" label="Your name" required autoComplete="name" error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          <Field id={`${id}-phone`} name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
        </div>
        <TextareaField
          id={`${id}-message`}
          name="message"
          label="Message"
          defaultValue={`I would like to arrange a viewing of ${displayAddress}.`}
        />
        <div>
          <label className="flex items-start gap-3 text-small text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
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
      </div>

      {submitError ? (
        <p className="field-error mt-4" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="mt-6">
        <Button type="submit" variant={transactionType === 'sale' ? 'sales' : 'lettings'} loading={submitting}>
          Send enquiry
        </Button>
      </div>
    </form>
  )
}
