'use client'

/**
 * ValuationForm. The conversion instrument: three steps, progress shown as a
 * filling brass rule, real per-step validation and error states, and a clear
 * thank-you state on success.
 *
 * It respects the sales licensing gate. When path is "sales" and the section is
 * pre-launch, the copy becomes "register your interest" rather than a live
 * valuation offer. The lettings path is always a live rental valuation.
 *
 * Submits to /api/lead. Resend delivery, WhatsApp handoff and analytics are
 * finalised in prompt 06; the analytics events fire from here already.
 */
import { useId, useRef, useState } from 'react'
import { Field, SelectField, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { BrassRule } from '@/components/primitives/BrassRule'
import { Icon } from '@/components/primitives/Icon'
import { SITE, SALES_LIVE, COVERAGE } from '@/lib/site'
import { AREAS } from '@/content/areas'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Path = 'sales' | 'lettings'

interface ValuationFormProps {
  path: Path
  /** Lead-source attribution, for campaign measurement. */
  source?: string
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
const TOWNS = [...AREAS.map((a) => a.name), ...COVERAGE.secondary]
const TYPES = ['House', 'Flat or apartment', 'Bungalow', 'Maisonette', 'Other']

export function ValuationForm({ path, source }: ValuationFormProps) {
  const idBase = useId()
  const preLaunch = path === 'sales' && !SALES_LIVE
  const registerMode = preLaunch

  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const headingRef = useRef<HTMLParagraphElement | null>(null)

  const set = (key: keyof FormState, value: string) =>
    setData((d) => ({ ...d, [key]: value }))

  function validateStep(current: number): boolean {
    const e: Record<string, string> = {}
    if (current === 0) {
      if (!data.postcode.trim()) e.postcode = 'Enter the property postcode or town.'
      if (!data.propertyType) e.propertyType = 'Choose a property type.'
    }
    if (current === 1) {
      if (data.name.trim().length < 2) e.name = 'Enter your name.'
      if (!EMAIL.test(data.email)) e.email = 'Enter a valid email address.'
      if (!PHONE.test(data.phone.trim())) e.phone = 'Enter a valid UK phone number.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (!validateStep(step)) return
    if (step === 0) track('valuation_start', { path, source: source ?? 'site' })
    track('valuation_step', { path, step: step + 1 })
    setStep((s) => Math.min(s + 1, 2))
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
          path,
          source: source ?? 'site',
          name: data.name,
          email: data.email,
          phone: data.phone,
          postcode: data.postcode,
          propertyType: data.propertyType,
          bedrooms: data.bedrooms,
          timeframe: data.timeframe,
          message: data.message,
          company: data.company,
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('valuation_submit', { path, source: source ?? 'site' })
      setDone(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-md border border-brass/40 bg-ground p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lettings-deep text-on-dark">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-h3">
          {registerMode ? 'You are on the list' : 'Thank you, that is booked in'}
        </h2>
        <p className="measure mx-auto mt-3 text-body text-ink-soft">
          {registerMode
            ? 'We will contact you the week we open our sales books, with a free market appraisal ready to arrange.'
            : 'We have your details and will call you to arrange a convenient time, usually the same working day.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={SITE.phone.href} external variant="lettings">
            <Icon name="phone" className="h-5 w-5" />
            Call {SITE.phone.display}
          </Button>
        </div>
      </div>
    )
  }

  const total = 3
  const legends = [
    'About the property',
    registerMode ? 'About you' : 'How to reach you',
    registerMode ? 'Anything else' : 'Timing and anything else',
  ]

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-md border border-brass/40 bg-ground p-6 md:p-8"
      aria-label={registerMode ? 'Register your interest' : 'Book a free valuation'}
    >
      {/* Progress as a filling brass rule */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p ref={headingRef} tabIndex={-1} className="eyebrow outline-none">
            Step {step + 1} of {total} . {legends[step]}
          </p>
        </div>
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
    </form>
  )
}
