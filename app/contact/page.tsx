import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { OpeningHours } from '@/components/marketing/OpeningHours'
import { ContactForm } from '@/components/lead/ContactForm'
import { MapPanel } from '@/components/property/MapPanel'
import { Field, TextareaField } from '@/components/primitives/Field'
import { Button } from '@/components/primitives/Button'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE } from '@/lib/site'
import { CONSENT_WORDING } from '@/lib/leads'
import { pageMeta, realEstateAgentJsonLd } from '@/lib/seo'
import { SectionBar } from '@/components/primitives/SectionBar'

export const metadata: Metadata = pageMeta({
  title: 'Contact us',
  description:
    'Call, message or visit Pied-à-Terre Property at Trafalgar House Business Centre, 233 Southampton Road, Portchester, PO6 4PY. Opening hours, map and a message form. You reach the office, not a queue.',
  path: '/contact',
})

const WHATSAPP = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  'Hello, I would like to speak to someone about my property.'
)}`

export default function ContactPage() {
  return (
    <>
      <JsonLd data={realEstateAgentJsonLd()} />

      <PageHero
        tone="lettings"
        eyebrow="Contact"
        trail={[{ name: 'Contact', path: '/contact' }]}
        title={
          <>
            Talk to a real person, the <em className="italic">same</em> day.
          </>
        }
        lead="Whatever you need, the quickest route is a call or a message. You reach the office in Portchester, not a queue and not a call centre."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left: the fast routes, then the office and hours. */}
          <div>
            {/* Option one and two: call and WhatsApp, first. */}
            <div className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-6 md:p-8">
              <Eyebrow>The fastest way to reach us</Eyebrow>
              <p className="measure mt-3 text-body text-ink-soft">
                For anything time-sensitive, call. For a quick question, WhatsApp is easiest. A
                message form is below if you would rather write.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={SITE.phone.href} className="btn btn-lettings tabular">
                  <Icon name="phone" className="h-5 w-5" />
                  {SITE.phone.display}
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Icon name="whatsapp" className="h-5 w-5" />
                  WhatsApp
                </a>
                <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
                  <Icon name="mail" className="h-5 w-5" />
                  Email
                </a>
              </div>
            </div>

            {/* The trading office, clearly the one to visit. */}
            <div className="mt-8 rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6 md:p-8">
              <Eyebrow>Visit the office</Eyebrow>
              <p className="mt-3 flex items-start gap-3 text-body text-ink">
                <Icon name="pin" className="mt-1 h-5 w-5 shrink-0 text-brass" />
                <span>
                  {SITE.office.line1}
                  <br />
                  {SITE.office.town}
                  <br />
                  {SITE.office.postcode}
                </span>
              </p>
              <div className="mt-6">
                <MapPanel
                  lat={SITE.office.lat}
                  lng={SITE.office.lng}
                  centerLat={SITE.office.lat}
                  centerLng={SITE.office.lng}
                  label="Map of the Pied-à-Terre Property office at Trafalgar House Business Centre, 233 Southampton Road, Portchester"
                  buttonLabel="Show the office on a map"
                />
              </div>
            </div>

            {/* Opening hours with the live open or closed state. */}
            <div className="mt-8 rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6 md:p-8">
              <Eyebrow>Opening hours</Eyebrow>
              <OpeningHours className="mt-4" />
              <p className="mt-4 text-small text-ink-soft">
                Outside these times, leave a message or
                WhatsApp and we will come back to you the next working day.
              </p>
            </div>
          </div>

          {/* Right: option three, the message form. */}
          <div>
            <SectionBar label="Or send a message" className="max-w-md" />
            <h2 className="mt-6 text-h1">Write to us</h2>
            <p className="measure mt-3 text-body text-ink-soft">
              Leave your details and how we can help. It reaches the office directly and we aim to
              reply the same working day.
            </p>

            <div className="mt-6">
              <div className="js-only">
                <ContactForm />
              </div>

              {/* No-JavaScript fallback: a standard POST answered with a 303 to the
                  thank-you page, so a visitor can always reach us. */}
              <noscript>
                <form
                  action="/api/lead"
                  method="post"
                  className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6 md:p-7"
                  aria-label="Send us a message"
                >
                  <input type="hidden" name="source" value="contact" />
                  <input type="hidden" name="kind" value="contact" />
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="nf-c-company">Company</label>
                    <input id="nf-c-company" name="company" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid gap-5">
                    <Field id="nf-c-name" name="name" label="Your name" required autoComplete="name" />
                    <Field id="nf-c-email" name="email" label="Email" type="email" autoComplete="email" />
                    <Field id="nf-c-phone" name="phone" label="Phone" type="tel" autoComplete="tel" />
                    <TextareaField id="nf-c-message" name="message" label="How can we help?" required />
                    <label className="flex items-start gap-3 text-small text-ink-soft">
                      <input type="checkbox" name="consentMarketing" className="mt-1 h-4 w-4 shrink-0 accent-lettings-deep" />
                      <span>{CONSENT_WORDING}</span>
                    </label>
                  </div>
                  <div className="mt-6">
                    <Button type="submit" variant="lettings">
                      Send message
                    </Button>
                  </div>
                </form>
              </noscript>
            </div>
          </div>
        </div>
      </section>

      {/* Registered office, clearly distinct from the trading office so nobody
          turns up at the accountant's door. */}
      <section className="border-t-[length:var(--pane-gap)] border-ink bg-oat">
        <div className="mx-auto max-w-content px-6 py-12 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow text-ink-soft">Where to visit us</p>
              <p className="mt-2 text-body text-ink">
                {SITE.office.line1}, {SITE.office.town}, {SITE.office.postcode}
              </p>
              <p className="mt-1 text-small text-ink-soft">
                Our trading office. This is the one to come to.
              </p>
            </div>
            <div>
              <p className="eyebrow text-ink-soft">Registered office</p>
              <p className="mt-2 text-body text-ink">
                {SITE.legalEntity}, company number {SITE.companyNumber}.
                <br />
                {SITE.registeredOffice.line1}, {SITE.registeredOffice.line2},{' '}
                {SITE.registeredOffice.town}, {SITE.registeredOffice.postcode}.
              </p>
              <p className="mt-1 text-small text-ink-soft">
                This is our accountant&rsquo;s address for company paperwork only. Please do not visit
                here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
