'use client'

/**
 * ValuationForm. The conversion instrument: three steps, progress shown as a
 * filling brass rule, real per-step validation with focus moved to the first
 * error, a marketing-consent checkbox unticked by default, and a redirect to a
 * real thank-you URL on success.
 *
 * Robustness: form state is mirrored to sessionStorage so a refresh or a failed
 * submit never loses what was typed, and a timing value is sent so the server
 * can reject scripted submissions. It respects the sales licensing gate: when
 * path is "sales" and the section is pre-launch, the copy becomes "register your
 * interest" rather than a live valuation offer.
 *
 * A no-JS visitor never sees this component (it is wrapped in .js-only on the
 * page); they get the native fallback form in ValuationFallback instead.
 */
import { useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field, SelectField, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { BrassRule } from '@/components/primitives/BrassRule'
import { Icon } from '@/components/primitives/Icon'
import { SALES_LIVE, COVERAGE_PLACES } from '@/lib/site'
import { CONSENT_WORDING } from '@/lib/leads'
import { readUtm } from '@/lib/utm'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Path = 'sales' | 'lettings'

interface ValuationFormProps {
  path: Path
  /** Canonical lead source; defaults to valuation_sales or valuation_lettings. */
  source?: string
  /**
   * Town pre-filled from an area page CTA (prompt 07). Already validated against
   * the coverage allow list on the server, so it is safe to seed into state.
   */
  initialTown?: string
}

interface FormState {
  postcode: string
  propertyType: string
  bedrooms: string
  name: string
  email: string
  phone: string
  timeframe: string
  message: string
  company: string // honeypot
}

const EMPTY: FormState = {
  postcode: '',
  propertyType: '',
  bedrooms: '',
  name: '',
  email: '',
  phone: '',
  timeframe: '',
  message: '',
  company: '',
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/
const TOWNS = COVERAGE_PLACES
const TYPES = ['House', 'Flat or apartment', 'Bungalow', 'Maisonette', 'Other']

export function ValuationForm({ path, source, initialTown }: ValuationFormProps) {
  const idBase = useId()
  const router = useRouter()
  const preLaunch = path === 'sales' && !SALES_LIVE
  const registerMode = preLaunch
  const leadSource = source ?? (path === 'sales' ? 'valuation_sales' : 'valuation_lettings')
  const storeKey = `pt_valuation_${path}`

  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormState>(
    initialTown ? { ...EMPTY, postcode: initialTown } : EMPTY
  )
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const startedAt = useRef<number>(Date.now())
  const formRef = useRef<HTMLFormElement | null>(null)
  const headingRef = useRef<HTMLParagraphElement | null>(null)

  // Restore any in-progress submission after a refresh or a failed send.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storeKey)
      if (raw) {
        const saved = JSON.parse(raw) as { data?: FormState; consent?: boolean }
        if (saved.data) {
          // A pre-filled town survives a stored draft that never reached step one.
          const restored = { ...EMPTY, ...saved.data, company: '' }
          if (initialTown && !restored.postcode.trim()) restored.postcode = initialTown
          setData(restored)
        }
        if (saved.consent) setConsent(true)
      }
    } catch {
      // Ignore a malformed store.
    }
    startedAt.current = Date.now()
  }, [storeKey, initialTown])

  // Mirror state so nothing typed is lost. The honeypot is never persisted.
  useEffect(() => {
    try {
      // Persist everything except the honeypot value.
      sessionStorage.setItem(storeKey, JSON.stringify({ data: { ...data, company: '' }, consent }))
    } catch {
      // Storage may be unavailable (private mode); the form still works.
    }
  }, [data, consent, storeKey])

  const set = (key: keyof FormState, value: string) =>
    setData((d) => ({ ...d, [key]: value }))

  function focusFirstError() {
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
      if (el) el.focus()
      else headingRef.current?.focus()
    })
  }

  function validateStep(current: number): boolean {
    const e: Record<string, string> = {}
    if (current === 0) {
      if (!data.postcode.trim()) e.postcode = 'Enter the property postcode or town.'
      if (!data.propertyType) e.propertyType = 'Choose a property type.'
    }
    if (current === 1) {
      if (data.name.trim().length < 2) e.name = 'Enter your name.'
      if (!EMAIL.test(data.email)) e.email = 'That email does not look right. Please check it.'
      if (!PHONE.test(data.phone.trim()))
        e.phone = 'Enter a UK phone number, so we can call to arrange a time.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (!validateStep(step)) {
      focusFirstError()
      return
    }
    const nextStep = Math.min(step + 1, 2)
    if (step === 0) track('valuation_start', { path, source: leadSource })
    track(nextStep === 1 ? 'valuation_step_2' : 'valuation_step_3', { path })
    setStep(nextStep)
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0))
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateStep(1)) {
      setStep(1)
      focusFirstError()
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind: 'valuation',
          source: leadSource,
          path,
          name: data.name,
          email: data.email,
          phone: data.phone,
          postcode: data.postcode,
          propertyType: data.propertyType,
          bedrooms: data.bedrooms,
          timeframe: data.timeframe,
          message: data.message,
          consentMarketing: consent,
          elapsedMs: Date.now() - startedAt.current,
          pagePath: window.location.pathname,
          referrer: document.referrer || undefined,
          utm: readUtm(),
          company: data.company,
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('valuation_submit', { path, source: leadSource })
      try {
        sessionStorage.removeItem(storeKey)
      } catch {
        // Non-fatal.
      }
      router.push('/thank-you/valuation')
    } catch (err) {
      // The payload is already in sessionStorage; the submit button offers retry.
      setSubmitError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? err.message
          : 'We could not send that just now. Please try again, or call us.'
      )
      setSubmitting(false)
    }
  }

  const total = 3
  const legends = [
    'About the property',
    registerMode ? 'About you' : 'How to reach you',
    registerMode ? 'Anything else' : 'Timing and anything else',
  ]

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="rounded-md border border-brass/40 bg-ground p-6 md:p-8"
      aria-label={registerMode ? 'Register your interest' : 'Book a free valuation'}
    >
      {/* Progress as a filling brass rule */}
      <div className="mb-6">
        <p
          ref={headingRef}
          tabIndex={-1}
          className="eyebrow outline-none"
          aria-live="polite"
        >
          Step {step + 1} of {total} . {legends[step]}
        </p>
        <div className="mt-3 h-0.5 w-full bg-well">
          <BrassRule progress={(step + 1) / total} className="h-0.5" />
        </div>
      </div>

      {/* Honeypot, visually hidden, not announced */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${idBase}-company`}>Company</label>
        <input
          id={`${idBase}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={data.company}
          onChange={(e) => set('company', e.target.value)}
        />
      </div>

      {step === 0 ? (
        <fieldset className="grid gap-5">
          <legend className="sr-only">{legends[0]}</legend>
          <Field
            id={`${idBase}-postcode`}
            label="Property postcode or town"
            list={`${idBase}-towns`}
            required
            value={data.postcode}
            error={errors.postcode}
            onChange={(e) => set('postcode', e.target.value)}
            placeholder="PO6 4PY or Portchester"
          />
          <datalist id={`${idBase}-towns`}>
            {TOWNS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
          <SelectField
            id={`${idBase}-type`}
            label="Property type"
            required
            value={data.propertyType}
            error={errors.propertyType}
            onChange={(e) => set('propertyType', e.target.value)}
          >
            <option value="">Choose a type</option>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </SelectField>
          <SelectField
            id={`${idBase}-beds`}
            label="Bedrooms"
            value={data.bedrooms}
            onChange={(e) => set('bedrooms', e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {['Studio', '1', '2', '3', '4', '5 or more'].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </SelectField>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="grid gap-5">
          <legend className="sr-only">{legends[1]}</legend>
          <Field
            id={`${idBase}-name`}
            label="Your name"
            required
            autoComplete="name"
            value={data.name}
            error={errors.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <Field
            id={`${idBase}-email`}
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            error={errors.email}
            onChange={(e) => set('email', e.target.value)}
          />
          <Field
            id={`${idBase}-phone`}
            label="Phone"
            type="tel"
            required
            autoComplete="tel"
            hint="A UK number, so we can call to arrange a time."
            value={data.phone}
            error={errors.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="grid gap-5">
          <legend className="sr-only">{legends[2]}</legend>
          <SelectField
            id={`${idBase}-timeframe`}
            label={registerMode ? 'When might you sell?' : 'How soon are you looking?'}
            value={data.timeframe}
            onChange={(e) => set('timeframe', e.target.value)}
          >
            <option value="">No fixed timescale</option>
            <option>As soon as possible</option>
            <option>Within three months</option>
            <option>Within six months</option>
            <option>Just researching for now</option>
          </SelectField>
          <TextareaField
            id={`${idBase}-message`}
            label="Anything you would like us to know"
            value={data.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="Access, a deadline, questions, or nothing at all."
          />
          <label className="flex items-start gap-3 text-small text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-lettings-deep"
            />
            <span>{CONSENT_WORDING}</span>
          </label>
        </fieldset>
      ) : null}

      {submitError ? (
        <p className="field-error mt-4" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className={cn('mt-7 flex items-center gap-3', step > 0 && 'justify-between')}>
        {step > 0 ? (
          <Button variant="ghost" onClick={back} type="button">
            Back
          </Button>
        ) : null}
        {step < 2 ? (
          <Button variant={path === 'sales' ? 'sales' : 'lettings'} onClick={next} type="button">
            Continue
            <Icon name="arrow-right" className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant={path === 'sales' ? 'sales' : 'lettings'}
            type="submit"
            loading={submitting}
          >
            {registerMode ? 'Register my interest' : 'Request my valuation'}
          </Button>
        )}
      </div>

      <p className="mt-4 text-small text-ink-soft">
        By submitting you agree to our{' '}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:no-underline">
          privacy policy
        </a>
        . We will only use your details to respond to this enquiry.
      </p>
    </form>
  )
}
