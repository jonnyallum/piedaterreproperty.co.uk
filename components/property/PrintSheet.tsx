/**
 * PrintSheet. A clean, single sheet of property particulars for print media.
 * Hidden on screen (`hidden print:block`); the global print rules in globals.css
 * strip the site chrome so this is the only thing on the page. It carries the
 * property reference and the office contact details so a printed sheet is
 * self-contained and traceable back to one listing.
 */
import { STATUS_LABEL } from './status'
import { formatPrice, gbp, longDate, list } from '@/lib/format'
import { SITE } from '@/lib/site'
import type { Property } from '@/lib/schemas/property'

function facts(property: Property): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: 'Type', value: property.propertyType },
  ]
  if (property.bedrooms != null) rows.push({ label: 'Bedrooms', value: String(property.bedrooms) })
  if (property.bathrooms != null) rows.push({ label: 'Bathrooms', value: String(property.bathrooms) })
  if (property.receptions != null) rows.push({ label: 'Receptions', value: String(property.receptions) })
  if (property.transactionType === 'sale') {
    rows.push({ label: 'Tenure', value: property.tenure.replace(/_/g, ' ') })
    rows.push({ label: 'Council tax', value: `Band ${property.councilTaxBand}` })
    rows.push({ label: 'EPC', value: property.materialInformation.epc.rating })
  } else {
    if (property.availableFrom)
      rows.push({ label: 'Available', value: longDate(property.availableFrom) })
    if (property.deposit != null) rows.push({ label: 'Deposit', value: gbp(property.deposit) })
    if (property.furnished) rows.push({ label: 'Furnishing', value: property.furnished.replace(/_/g, ' ') })
    if (property.epc) rows.push({ label: 'EPC', value: property.epc.rating })
  }
  return rows
}

export function PrintSheet({ property }: { property: Property }) {
  const images = property.images.slice(0, 6)
  return (
    <div id="pt-print" className="hidden print:block">
      <header className="flex items-baseline justify-between border-b border-ink pb-3">
        <div>
          <p className="font-display text-h3 text-ink">{SITE.tradingName}</p>
          <p className="text-small text-ink-soft">
            {SITE.phone.display} . {SITE.email}
          </p>
        </div>
        <div className="text-right text-small text-ink-soft">
          <p>Property particulars</p>
          <p className="tabular">Ref {property.id}</p>
        </div>
      </header>

      <div className="mt-4">
        <p className="tabular text-small text-ink-soft">{STATUS_LABEL[property.status]}</p>
        {/* Not an h1: the page already has one visible h1 with this address, and
            two would break the single-h1 rule. This print-only sheet uses a
            styled paragraph so the printed particulars still lead with it. */}
        <p className="mt-1 font-display text-h2 text-ink">{property.displayAddress}</p>
        <p className="tabular mt-1 text-h3 text-ink">{formatPrice(property.price)}</p>
        <p className="mt-1 text-body text-ink-soft">{property.summary}</p>
      </div>

      {images.length ? (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {images.map((img) => (
            /* eslint-disable-next-line @next/next/no-img-element -- print media needs eager intrinsic images, not the next/image runtime */
            <img key={img.src} src={img.src} alt={img.alt} className="w-full rounded-sm object-cover" />
          ))}
        </div>
      ) : null}

      <dl className="mt-5 grid grid-cols-4 gap-x-6 gap-y-2">
        {facts(property).map((f) => (
          <div key={f.label}>
            <dt className="text-small text-ink-soft">{f.label}</dt>
            <dd className="tabular text-body text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        {property.description.map((para, i) => (
          <p key={i} className="mt-2 text-body text-ink">
            {para}
          </p>
        ))}
      </div>

      {property.features.length ? (
        <p className="mt-4 text-body text-ink">
          <span className="font-medium">Features: </span>
          {list(property.features)}.
        </p>
      ) : null}

      {property.transactionType === 'sale' ? (
        <div className="mt-4">
          <p className="font-medium text-ink">Material information</p>
          <p className="text-small text-ink">
            {materialSummary(property)}
          </p>
        </div>
      ) : null}

      <footer className="mt-6 border-t border-ink pt-3 text-small text-ink-soft">
        <p>
          {SITE.legalEntity}, company number {SITE.companyNumber}. Registered office{' '}
          {SITE.registeredOffice.line2}, {SITE.registeredOffice.town}, {SITE.registeredOffice.postcode}.
        </p>
        <p className="mt-1">
          These particulars are a guide only and do not form part of any offer or contract. Measurements
          and details should be verified before reliance. Ref {property.id}.
        </p>
      </footer>
    </div>
  )
}

function materialSummary(property: Extract<Property, { transactionType: 'sale' }>): string {
  const m = property.materialInformation
  const parts = [
    `Tenure ${m.tenure.replace(/_/g, ' ')}`,
    `council tax band ${m.councilTaxBand}`,
    `EPC ${m.epc.rating}`,
    `heating ${m.heating.toLowerCase()}`,
    `construction ${m.construction.toLowerCase()}`,
    m.parking.length ? `parking ${list(m.parking).toLowerCase()}` : 'no parking',
    `flood risk ${m.floodRisk.toLowerCase()}`,
  ]
  return `${parts.join(', ')}.`
}
