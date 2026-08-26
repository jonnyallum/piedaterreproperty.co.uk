/**
 * Footer. Harbour Dusk gradient under grain. Carries the sitemap, the trading
 * office and contact details, opening hours, the credential row, social links,
 * the full legal line with company number and registered office, and the legal
 * page links. Server component.
 */
import Link from 'next/link'
import { FOOTER_NAV, LEGAL_NAV } from './nav-data'
import { Logo } from './Logo'
import { ConsentLink } from './ConsentLink'
import { Grain } from '@/components/primitives/Grain'
import { Icon } from '@/components/primitives/Icon'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { SITE } from '@/lib/site'

const CREDENTIALS = [
  `The Property Ombudsman, membership ${SITE.accreditations.tpoReference}`,
  'Money Shield Client Money Protection',
  'Deposit Protection Scheme',
  SITE.accreditations.award,
]

function openingHoursSummary() {
  const worked = SITE.openingHours.filter((h) => h.open && h.close)
  const first = worked[0]
  const last = worked[worked.length - 1]
  if (!first || !last) return 'Please call for our opening hours'
  return `${first.day} to ${last.day}, ${first.open} to ${first.close}`
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative isolate overflow-hidden surface-harbour-dusk text-on-dark">
      <Grain fixed={false} />
      <div className="relative mx-auto max-w-content px-6 py-20 md:px-8" style={{ zIndex: 'var(--z-content)' }}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="on-dark" />
            <address className="mt-6 not-italic text-small leading-relaxed text-on-dark/85">
              {SITE.office.line1}
              <br />
              {SITE.office.town}, {SITE.office.postcode}
            </address>
            <div className="mt-4 flex flex-col gap-2 text-small">
              <a href={SITE.phone.href} className="tabular inline-flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4" />
                {SITE.phone.display}
              </a>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2">
                <Icon name="mail" className="h-4 w-4" />
                {SITE.email}
              </a>
              <p className="inline-flex items-center gap-2 text-on-dark/85">
                <Icon name="clock" className="h-4 w-4" />
                {openingHoursSummary()}
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.urls.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon"
                aria-label="Pied-à-Terre Property on Instagram"
              >
                <Icon name="instagram" className="h-5 w-5" />
              </a>
              <a
                href={SITE.urls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon"
                aria-label="Pied-à-Terre Property on Facebook"
              >
                <Icon name="facebook" className="h-5 w-5" />
              </a>
            </div>
            <a
              href={SITE.urls.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-small text-on-dark/80 hover:text-on-dark hover:underline"
            >
              See what our customers said on Google
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <Eyebrow tone="on-dark">{col.heading}</Eyebrow>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small text-on-dark/85 transition-opacity hover:opacity-100 hover:text-on-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <hr className="my-12 border-0 border-t border-brass/40" />

        <div className="flex flex-col gap-3 text-small text-on-dark/70">
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            {CREDENTIALS.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true" className="text-brass">.</span> : null}
                {c}
              </span>
            ))}
          </p>
          <p className="measure">
            Pied-à-Terre Property is a trading name of {SITE.legalEntity}, registered in
            England and Wales, company number {SITE.companyNumber}. Registered office:{' '}
            {SITE.registeredOffice.line1}, {SITE.registeredOffice.line2},{' '}
            {SITE.registeredOffice.town}, {SITE.registeredOffice.postcode}.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_NAV.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-on-dark">
                {link.label}
              </Link>
            ))}
            <ConsentLink />
            <span className="tabular">© {year} {SITE.legalEntity}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
