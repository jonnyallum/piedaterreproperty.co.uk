/**
 * PropertyCard. Arch-topped image (or a branded placeholder), a status chip, the
 * price in Fraunces with tabular numerals, the address, and a meta row of beds,
 * baths, receptions and EPC. The whole card is one link; the focus ring follows
 * the arch silhouette. Dye-bloom hover and image scale live in globals.css.
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
    <span className="inline-flex items-center gap-1.5 text-small text-ink-soft">
      <Icon name={icon} className="h-4 w-4 text-brass" />
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
      className="property-card group block focus-visible:outline-none"
    >
      <div className={`property-media rounded-[1.75rem] ${feature ? 'aspect-[4/5]' : 'aspect-[4/3]'} group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-brass`}>
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="(max-width: 48rem) 100vw, (max-width: 80rem) 50vw, 33vw"
            className="h-full w-full object-cover"
            placeholder={cover.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={cover.blurDataURL}
          />
        ) : (
          <PropertyPlaceholder />
        )}
        <span
          className="status-chip absolute left-4 top-4"
          data-tone={STATUS_TONE[property.status]}
          style={{ zIndex: 'var(--z-content)' }}
        >
          {STATUS_LABEL[property.status]}
        </span>
      </div>

      <div className="mt-4">
        <p className="font-display text-h3 font-normal tabular text-ink">
          {formatPrice(property.price)}
        </p>
        <p className="mt-1 text-body font-medium text-ink">{property.displayAddress}</p>
        <p className="measure mt-1 text-small text-ink-soft">{property.summary}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {property.bedrooms != null ? (
            <Meta icon="bed" value={property.bedrooms} label="bedrooms" />
          ) : null}
          {property.bathrooms != null ? (
            <Meta icon="bath" value={property.bathrooms} label="bathrooms" />
          ) : null}
          {property.receptions != null ? (
            <Meta icon="sofa" value={property.receptions} label="receptions" />
          ) : null}
          {property.epc ? (
            <Meta icon="leaf" value={property.epc.rating} label="EPC rating" />
          ) : null}
        </div>
      </div>
    </Link>
  )
}
