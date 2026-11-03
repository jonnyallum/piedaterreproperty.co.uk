/**
 * ValuationFallback. The no-JavaScript path for the valuation form. Rendered
 * inside <noscript>, so it appears only when scripting is off, and posts as a
 * standard form-encoded POST to /api/lead, which validates and answers with a
 * 303 redirect to the thank-you page. Progressive enhancement is not optional
 * for a lead form: this guarantees a visitor can always reach us.
 *
 * Server component. The interactive ValuationForm is hidden for these visitors
 * by the .js-only wrapper on the page.
 */
import { Field, SelectField, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { CONSENT_WORDING } from '@/lib/leads'

interface ValuationFallbackProps {
  path: 'sales' | 'lettings'
  source: string
  registerMode: boolean
  /** Town pre-filled from an area page CTA, already validated server side. */
  initialTown?: string
}

const TYPES = ['House', 'Flat or apartment', 'Bungalow', 'Maisonette', 'Other']

export function ValuationFallback({
  path,
  source,
  registerMode,
  initialTown,
}: ValuationFallbackProps) {
  return (
    <noscript>
      <form
        action="/api/lead"
        method="post"
        className="rounded-none border-[length:var(--pane-gap)] border-night bg-ground p-6 md:p-8"
        aria-label={registerMode ? 'Register your interest' : 'Book a free valuation'}
      >
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="kind" value="valuation" />
        <input type="hidden" name="path" value={path} />
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="nf-company">Company</label>
          <input id="nf-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5">
          <Field
            id="nf-postcode"
            name="postcode"
            label="Property postcode or town"
            required
            placeholder="PO6 4PY or Portchester"
            defaultValue={initialTown}
          />
          <SelectField id="nf-type" name="propertyType" label="Property type" required>
            <option value="">Choose a type</option>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </SelectField>
          <SelectField id="nf-beds" name="bedrooms" label="Bedrooms">
            <option value="">Prefer not to say</option>
            {['Studio', '1', '2', '3', '4', '5 or more'].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </SelectField>
          <Field id="nf-name" name="name" label="Your name" required autoComplete="name" />
          <Field id="nf-email" name="email" label="Email" type="email" required autoComplete="email" />
          <Field id="nf-phone" name="phone" label="Phone" type="tel" required autoComplete="tel" />
          <TextareaField id="nf-message" name="message" label="Anything you would like us to know" />
          <label className="flex items-start gap-3 text-small text-ink-soft">
            <input type="checkbox" name="consentMarketing" className="mt-1 h-4 w-4 shrink-0 accent-lettings-deep" />
            <span>{CONSENT_WORDING}</span>
          </label>
        </div>

        <div className="mt-7">
          <Button type="submit" variant={path === 'sales' ? 'sales' : 'lettings'}>
            {registerMode ? 'Register my interest' : 'Request my valuation'}
          </Button>
        </div>
      </form>
    </noscript>
  )
}
