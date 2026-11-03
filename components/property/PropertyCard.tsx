/**
 * PropertyCard. A listing as a framed window: a black frame around the photo,
 * a status chip top-left, and a solid sill beneath carrying the price in
 * condensed capitals, the address, and a row of beds, baths, receptions and
 * EPC separated by mullions. The whole card is one link; on hover the sill
 * flips to yellow and the photo lifts. Feature cards run taller.
 */
import Link from 'next/link'
import Image from 'next/image'
import { PropertyPlaceholder } from './PropertyPlaceholder'
import { STATUS_LABEL, STATUS_TONE } from './status'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { formatPrice } from '@/lib/format'
import type { Property } from '@/lib/schemas/property'

function Meta({ icon, value, label }: { icon: IconName; value: string | number; label: string }) {
  return (
    <span className="inline-flex flex-1 items-center justify-center gap-1.5 px-2 py-2 text-small font-bold">
      <Icon name={icon} className="h-4 w-4" />
      <span className="tabular">
        {value}
        <span className="sr-only"> {label}</span>
      </span>
    </span>
  )
}

export function PropertyCard({ property, feature = false }: { property: Property; feature?: boolean }) {
  const cover = property.images[0]
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="property-card group block border-[length:var(--pane-gap)] border-night bg-night focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-ochre"
    >
      <div
        className={`property-media relative overflow-hidden ${feature ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="(max-width: 48rem) 100vw, (max-width: 80rem) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            placeholder={cover.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={cover.blurDataURL}
          />
        ) : (
          <PropertyPlaceholder />
        )}
        <span
          className="status-chip absolute left-0 top-0"
          data-tone={STATUS_TONE[property.status]}
          style={{ zIndex: 'var(--z-content)' }}
        >
          {STATUS_LABEL[property.status]}
        </span>
      </div>

      <div className="bg-ochre text-ink transition-colors group-hover:bg-bone">
        <div className="flex items-start justify-between gap-4 p-4">
          <div>
            <p className="font-display text-h2 leading-none tabular">{formatPrice(property.price)}</p>
            <p className="mt-2 text-body font-bold leading-snug">{property.displayAddress}</p>
          </div>
          <Icon
            name="arrow-right"
            className="mt-1 h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1"
          />
        </div>
        <div className="flex divide-x-[length:var(--pane-gap)] divide-night border-t-[length:var(--pane-gap)] border-night">
          {property.bedrooms != null ? (
            <Meta icon="bed" value={property.bedrooms} label="bedrooms" />
          ) : null}
          {property.bathrooms != null ? (
            <Meta icon="bath" value={property.bathrooms} label="bathrooms" />
          ) : null}
          {property.receptions != null ? (
            <Meta icon="sofa" value={property.receptions} label="receptions" />
          ) : null}
          {property.epc ? <Meta icon="leaf" value={property.epc.rating} label="EPC rating" /> : null}
        </div>
      </div>
    </Link>
  )
}
