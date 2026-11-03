'use client'

/**
 * ContactForm. The general contact form, positioned as the third option on the
 * contact page after phone and WhatsApp (prompt 08), because a serious enquirer
 * about a large asset usually wants to talk. Mirrors the rest of the lead system:
 * honeypot, real per-field validation, one contactable route required, a clear
 * done state, and a timing value so the server can reject scripted submissions.
 * Posts to /api/lead with source "contact".
 *
 * A no-JS visitor never sees this component (it is wrapped in .js-only on the
 * page); they get the native fallback form beneath it instead.
 */
import { useId, useRef, useState } from 'react'
import { Field, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'
import { readUtm } from '@/lib/utm'
import { CONSENT_WORDING } from '@/lib/leads'
import { track } from '@/lib/analytics'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/

export function ContactForm() {
  const id = useId()
  const startedAt = useRef<number>(Date.now())
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
    if (get('message').length < 4) eErr.message = 'Tell us how we can help.'
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
          kind: 'contact',
          source: 'contact',
          name: get('name'),
          email: get('email'),
          phone: get('phone'),
          message: get('message'),
          consentMarketing: consent,
          utm: readUtm(),
          elapsedMs: Date.now() - startedAt.current,
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('contact_submit', { source: 'contact' })
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
        <h2 className="mt-5 text-h3">Message sent</h2>
        <p className="measure mx-auto mt-3 text-body text-ink-soft">
          Thank you. Your message has reached the office and we aim to reply the same working
          day. If it is urgent, the fastest route is always a call.
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
      className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6 md:p-7"
      aria-label="Send us a message"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5">
        <Field id={`${id}-name`} name="name" label="Your name" required autoComplete="name" error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          <Field id={`${id}-phone`} name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
        </div>
        <TextareaField id={`${id}-message`} name="message" label="How can we help?" required error={errors.message} />
        <label className="flex items-start gap-3 text-small text-ink-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-lettings-deep"
          />
          <span>{CONSENT_WORDING}</span>
        </label>
      </div>

      {submitError ? (
        <p className="field-error mt-4" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="mt-6">
        <Button type="submit" variant="lettings" loading={submitting}>
          Send message
        </Button>
      </div>
    </form>
  )
}
