/**
 * KeyFacts. The at-a-glance grid beneath the price: the numbers a buyer or
 * tenant scans first. Branches on transaction type so a sale shows tenure and
 * council tax while a letting shows availability, deposit and furnishing. Only
 * facts we actually hold are rendered; nothing is invented to fill the grid.
 */
import { Icon, type IconName } from '@/components/primitives/Icon'
import { gbp, longDate } from '@/lib/format'
import type { Property } from '@/lib/schemas/property'

interface Fact {
  icon: IconName
  label: string
  value: string
}

function factsFor(property: Property): Fact[] {
  const facts: Fact[] = [{ icon: 'home', label: 'Type', value: property.propertyType }]
  if (property.bedrooms != null)
    facts.push({ icon: 'bed', label: 'Bedrooms', value: String(property.bedrooms) })
  if (property.bathrooms != null)
    facts.push({ icon: 'bath', label: 'Bathrooms', value: String(property.bathrooms) })
  if (property.receptions != null)
    facts.push({ icon: 'sofa', label: 'Receptions', value: String(property.receptions) })

  if (property.transactionType === 'sale') {
    facts.push({ icon: 'key', label: 'Tenure', value: tenureLabel(property.tenure) })
    facts.push({ icon: 'pound', label: 'Council tax', value: `Band ${property.councilTaxBand}` })
    facts.push({ icon: 'leaf', label: 'EPC', value: property.materialInformation.epc.rating })
  } else {
    if (property.availableFrom)
      facts.push({ icon: 'clock', label: 'Available', value: longDate(property.availableFrom) })
    if (property.deposit != null)
      facts.push({ icon: 'pound', label: 'Deposit', value: gbp(property.deposit) })
    if (property.furnished)
      facts.push({ icon: 'sofa', label: 'Furnishing', value: furnishedLabel(property.furnished) })
    if (property.petsConsidered != null)
      facts.push({
        icon: 'check',
        label: 'Pets',
        value: property.petsConsidered ? 'Considered' : 'Not permitted',
      })
    if (property.epc)
      facts.push({ icon: 'leaf', label: 'EPC', value: property.epc.rating })
  }
  return facts
}

function tenureLabel(t: 'freehold' | 'leasehold' | 'share_of_freehold'): string {
  return t === 'share_of_freehold' ? 'Share of freehold' : t.charAt(0).toUpperCase() + t.slice(1)
}

function furnishedLabel(f: 'furnished' | 'unfurnished' | 'part_furnished'): string {
  return f === 'part_furnished' ? 'Part furnished' : f.charAt(0).toUpperCase() + f.slice(1)
}

export function KeyFacts({ property }: { property: Property }) {
  const facts = factsFor(property)
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-none border-[length:var(--pane-gap)] border-ink bg-brass/40 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-ground p-4">
          <dt className="flex items-center gap-3 text-small text-ink-soft">
            <Icon name={fact.icon} className="h-5 w-5 shrink-0 text-brass" />
            {fact.label}
          </dt>
          <dd className="tabular mt-1 pl-8 text-body font-medium text-ink">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
