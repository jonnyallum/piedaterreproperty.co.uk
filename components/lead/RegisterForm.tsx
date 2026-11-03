'use client'

/**
 * RegisterForm. Feeds the applicant database with the property-requirement
 * fields that make it useful: locations, budget, bedrooms, move date, pets,
 * employment status and guarantor availability. One clear step, real
 * validation. Posts to /api/lead with source "tenant-register".
 */
import { useId, useState } from 'react'
import { Field, SelectField, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SITE, COVERAGE_PLACES } from '@/lib/site'
import { readUtm } from '@/lib/utm'
import { CONSENT_WORDING } from '@/lib/leads'
import { track } from '@/lib/analytics'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/
const TOWNS = COVERAGE_PLACES

export function RegisterForm() {
  const id = useId()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const get = (k: string) => String(fd.get(k) ?? '').trim()

    const eErr: Record<string, string> = {}
    if (get('name').length < 2) eErr.name = 'Enter your name.'
    if (!EMAIL.test(get('email'))) eErr.email = 'Enter a valid email address.'
    if (!PHONE.test(get('phone'))) eErr.phone = 'Enter a valid UK phone number.'
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
          path: 'lettings',
          source: 'tenant_register',
          name: get('name'),
          email: get('email'),
          phone: get('phone'),
          consentMarketing: consent,
          utm: readUtm(),
          extra: {
            locations: get('locations'),
            budget: get('budget'),
            bedrooms: get('bedrooms'),
            moveDate: get('moveDate'),
            pets: get('pets'),
            employment: get('employment'),
            guarantor: get('guarantor'),
            notes: get('notes'),
          },
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('tenant_register_submit', { source: 'tenant_register' })
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
        <h2 className="mt-5 text-h3">You are registered</h2>
        <p className="measure mx-auto mt-3 text-body text-ink-soft">
          We will be in touch when a property that matches your requirements comes up,
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
      className="rounded-none border-[length:var(--pane-gap)] border-night bg-ground p-6 md:p-8"
      aria-label="Register with us"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="grid gap-5">
        <legend className="eyebrow mb-1">About you</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-name`} name="name" label="Your name" required autoComplete="name" error={errors.name} />
          <Field id={`${id}-email`} name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
        </div>
        <Field id={`${id}-phone`} name="phone" label="Phone" type="tel" required autoComplete="tel" error={errors.phone} />
      </fieldset>

      <fieldset className="mt-6 grid gap-5">
        <legend className="eyebrow mb-1">What you are looking for</legend>
        <Field
          id={`${id}-locations`}
          name="locations"
          label="Preferred areas"
          list={`${id}-towns`}
          placeholder="Havant, Emsworth, Hayling Island"
          hint="One or more of the towns we cover."
        />
        <datalist id={`${id}-towns`}>
          {TOWNS.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField id={`${id}-budget`} name="budget" label="Maximum budget">
            <option value="">No maximum</option>
            {[750, 1000, 1250, 1500, 2000, 3000].map((b) => (
              <option key={b} value={`${b}`}>{`Up to £${b.toLocaleString('en-GB')} pcm`}</option>
            ))}
          </SelectField>
          <SelectField id={`${id}-bedrooms`} name="bedrooms" label="Bedrooms">
            <option value="">Any</option>
            {['Studio', '1', '2', '3', '4 or more'].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </SelectField>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${id}-move`} name="moveDate" label="Ideal move date" type="month" />
          <SelectField id={`${id}-pets`} name="pets" label="Any pets?">
            <option value="">Prefer not to say</option>
            <option>No pets</option>
            <option>One cat or dog</option>
            <option>More than one pet</option>
          </SelectField>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField id={`${id}-employment`} name="employment" label="Employment status">
            <option value="">Prefer not to say</option>
            <option>Employed</option>
            <option>Self-employed</option>
            <option>Retired</option>
            <option>Student</option>
            <option>Other</option>
          </SelectField>
          <SelectField id={`${id}-guarantor`} name="guarantor" label="Guarantor available?">
            <option value="">Not sure yet</option>
            <option>Yes, if needed</option>
            <option>No</option>
          </SelectField>
        </div>
        <TextareaField
          id={`${id}-notes`}
          name="notes"
          label="Anything else we should know"
          placeholder="Accessibility needs, a parking requirement, a deadline."
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
      </fieldset>

      {submitError ? (
        <p className="field-error mt-4" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="mt-7">
        <Button type="submit" variant="lettings" loading={submitting}>
          Register with us
        </Button>
      </div>
    </form>
  )
}
