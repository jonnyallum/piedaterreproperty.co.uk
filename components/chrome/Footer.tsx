/**
 * Footer. Opens with a yellow call strip, then a mullion grid of panes: the
 * contact pane, one pane per sitemap column. Below it the credentials, the
 * full legal line with company number and registered office, and the legal
 * page links, and last the Portsmouth skyline standing under a giant
 * wordmark. Server component.
 */
import Link from 'next/link'
import { FOOTER_NAV, LEGAL_NAV } from './nav-data'
import { Logo } from './Logo'
import { ConsentLink } from './ConsentLink'
import { Skyline } from '@/components/marketing/Skyline'
import { Icon } from '@/components/primitives/Icon'
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
    <footer className="bg-night text-on-dark">
      {/* Call strip */}
      <div className="bg-ground text-ink">
        <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8 md:py-14">
          <p className="font-display text-h1 leading-[0.9]">
            Thinking of a move?
            <br />
            Talk to someone local.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={SITE.phone.href} className="btn btn-sales tabular">
              <Icon name="phone" className="h-5 w-5" />
              {SITE.phone.display}
            </a>
            <Link href="/sales/free-valuation" className="btn btn-secondary btn-invert">
              Free valuation
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 py-14 md:px-8 md:py-20">
        <div className="grid gap-[var(--pane-gap)] border-[length:var(--pane-gap)] border-ochre bg-[var(--pt-ochre)] sm:grid-cols-2 lg:grid-cols-6">
          <div className="bg-night p-6 sm:col-span-2 lg:col-span-2">
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
              className="mt-5 inline-flex items-center gap-2 text-small text-ochre hover:underline"
            >
              See what our customers said on Google
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          </div>

          {FOOTER_NAV.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="bg-night p-6">
              <p className="font-display text-h3 uppercase leading-none text-ochre">{col.heading}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-on-dark/85 transition-colors hover:text-ochre"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 text-small text-on-dark/70">
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            {CREDENTIALS.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-2">
                {i > 0 ? (
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-ochre" />
                ) : null}
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
              <Link key={link.href} href={link.href} className="hover:text-ochre">
                {link.label}
              </Link>
            ))}
            <ConsentLink />
            <span className="tabular">
              © {year} {SITE.legalEntity}
            </span>
          </div>
        </div>
      </div>

      {/* Skyline under a giant wordmark. */}
      <div className="relative overflow-hidden border-t-[length:var(--pane-gap)] border-ochre">
        <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full text-indigo" />
        <p
          aria-hidden="true"
          className="brand-word brand-giant relative select-none justify-center overflow-hidden pb-4 pt-10"
        >
          <span>pied </span>
          <span className="brand-a">a</span>
          <em className="not-italic"> terre</em>
        </p>
      </div>
    </footer>
  )
}
