'use client'

/**
 * MaintenanceForm. Built to work on a phone with a poor signal: any photo is
 * compressed client-side to a small JPEG before sending, the payload stays
 * small, and the success state is plain and survives a slow network.
 *
 * Genuine emergencies are routed away from the form to the correct external
 * numbers, prominently, at the top. Posts to /api/lead with source
 * "tenant-maintenance".
 */
import { useId, useState } from 'react'
import { Field, SelectField, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'
import { CONSENT_WORDING } from '@/lib/leads'
import { track } from '@/lib/analytics'

const PHONE = /^(\+?44\s?|0)(\d\s?){9,10}\d$/
const CATEGORIES = [
  'Heating or hot water',
  'Plumbing or a leak',
  'Electrical',
  'Appliance',
  'Damp or mould',
  'Doors, windows or locks',
  'Exterior or garden',
  'Something else',
]
const URGENCIES = ['Not urgent', 'Needs attention this week', 'Urgent, affecting daily living']

/** Downscale and re-encode an image to a small JPEG data URL. */
async function compressImage(file: File, maxDim = 1280, quality = 0.6): Promise<string> {
  const bitmapUrl = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error('Could not read the image.'))
      el.src = bitmapUrl
    })
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
    const w = Math.round(img.width * scale)
    const h = Math.round(img.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not process the image.')
    ctx.drawImage(img, 0, 0, w, h)
    return canvas.toDataURL('image/jpeg', quality)
  } finally {
    URL.revokeObjectURL(bitmapUrl)
  }
}

export function MaintenanceForm() {
  const id = useId()
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [photo, setPhoto] = useState<string>('')
  const [photoNote, setPhotoNote] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState('')

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoNote('Preparing your photo, this keeps the upload small.')
    try {
      const dataUrl = await compressImage(file)
      // Guard the payload size; if still large, ask them to describe instead.
      if (dataUrl.length > 700_000) {
        setPhoto('')
        setPhotoNote('That photo is very large. Please describe the issue instead.')
      } else {
        setPhoto(dataUrl)
        setPhotoNote('Photo attached.')
      }
    } catch {
      setPhoto('')
      setPhotoNote('We could not read that image. You can describe the issue instead.')
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? '').trim()

    const eErr: Record<string, string> = {}
    if (get('name').length < 2) eErr.name = 'Enter your name.'
    if (!PHONE.test(get('phone'))) eErr.phone = 'Enter a valid UK phone number.'
    if (!get('address')) eErr.address = 'Enter the property address.'
    if (!get('category')) eErr.category = 'Choose a category.'
    if (get('description').length < 5) eErr.description = 'Please describe the issue.'
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
          kind: 'maintenance',
          path: 'lettings',
          source: 'maintenance',
          name: get('name'),
          phone: get('phone'),
          email: get('email') || undefined,
          message: get('description'),
          consentMarketing: consent,
          extra: {
            address: get('address'),
            category: get('category'),
            urgency: get('urgency'),
            access: get('access'),
            photo,
          },
        }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Something went wrong.')
      track('maintenance_submit', { source: 'maintenance' })
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
        <h2 className="mt-5 text-h3">Reported, thank you</h2>
        <p className="measure mx-auto mt-3 text-body text-ink-soft">
          We have your report and will be in touch to arrange access and a repair. If it
          becomes urgent, please call the office.
        </p>
        <a href={SITE.phone.href} className="btn btn-lettings tabular mt-6 inline-flex">
          <Icon name="phone" className="h-5 w-5" />
          {SITE.phone.display}
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Emergency route, prominent, away from the form */}
      <div className="mb-8 rounded-md border-2 border-sales/60 bg-well p-5">
        <p className="flex items-center gap-2 text-h3 text-sales-ink">
          <Icon name="phone" className="h-5 w-5" />
          Is it an emergency?
        </p>
        <ul className="measure mt-3 flex flex-col gap-2 text-small text-ink">
          <li>If you smell gas, call the National Gas Emergency Service on 0800 111 999.</li>
          <li>If there is a power cut, call 105.</li>
          <li>If there is a risk to life or a fire, call 999.</li>
          <li>
            For an urgent property emergency such as major water ingress or no heat in
            winter, call our office on{' '}
            <a href={SITE.phone.href} className="tabular font-medium text-sales-ink underline">
              {SITE.phone.display}
            </a>
            .
          </li>
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-md border border-brass/40 bg-ground p-6 md:p-8"
        aria-label="Report a maintenance issue"
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`${id}-company`}>Company</label>
          <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <fieldset className="grid gap-5">
          <legend className="eyebrow mb-1">Your details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${id}-name`} name="name" label="Your name" required autoComplete="name" error={errors.name} />
            <Field id={`${id}-phone`} name="phone" label="Phone" type="tel" required autoComplete="tel" error={errors.phone} />
          </div>
          <Field id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" />
          <Field id={`${id}-address`} name="address" label="Property address" required error={errors.address} autoComplete="street-address" />
        </fieldset>

        <fieldset className="mt-6 grid gap-5">
          <legend className="eyebrow mb-1">The issue</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField id={`${id}-category`} name="category" label="Category" required error={errors.category}>
              <option value="">Choose a category</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </SelectField>
            <SelectField id={`${id}-urgency`} name="urgency" label="How urgent">
              <option value="">Choose</option>
              {URGENCIES.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </SelectField>
          </div>
          <TextareaField
            id={`${id}-description`}
            name="description"
            label="Describe the issue"
            required
            error={errors.description}
            placeholder="What is wrong, since when, and where in the property."
          />
          <TextareaField
            id={`${id}-access`}
            name="access"
            label="Access arrangements"
            placeholder="When we can visit, and how to get in."
          />
          <div>
            <label htmlFor={`${id}-photo`} className="field-label">
              A photo (optional)
            </label>
            <input
              id={`${id}-photo`}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onPhoto}
              className="field-control"
            />
            {photoNote ? (
              <p className="field-hint" role="status">
                {photoNote}
              </p>
            ) : (
              <p className="field-hint">We shrink it on your phone first, so it sends on a weak signal.</p>
            )}
          </div>
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
            Send report
          </Button>
        </div>
      </form>
    </div>
  )
}
