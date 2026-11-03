import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/marketing/Breadcrumbs'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { KeyFacts } from '@/components/property/KeyFacts'
import { EpcBar } from '@/components/property/EpcBar'
import { MaterialInfo } from '@/components/property/MaterialInfo'
import { EnquiryForm } from '@/components/property/EnquiryForm'
import { ContactRoutes } from '@/components/lead/ContactRoutes'
import { PrintButton } from '@/components/property/PrintButton'
import { PrintSheet } from '@/components/property/PrintSheet'
import { MapPanel } from '@/components/property/MapPanel'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Icon } from '@/components/primitives/Icon'
import { STATUS_LABEL, STATUS_TONE, isArchivedStatus } from '@/components/property/status'
import { getBySlug, allSlugs, similarProperties } from '@/lib/properties'
import { formatPrice } from '@/lib/format'
import { pageMeta, propertyJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const property = getBySlug(slug)
  if (!property) return { title: 'Property not found' }
  return pageMeta({
    title: `${property.displayAddress}, ${formatPrice(property.price)}`,
    description: property.summary,
    path: `/properties/${property.slug}`,
    ogImage: property.images[0]?.src,
  })
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = getBySlug(slug)
  if (!property) notFound()

  const isSale = property.transactionType === 'sale'
  const epc = isSale ? property.materialInformation.epc : property.epc
  const archived = isArchivedStatus(property.status)
  const similar = similarProperties(property, 3)
  const registerHref = isSale ? '/properties?path=sales' : '/tenants/register'
  const whatsappMessage = `Hello, I would like to enquire about ${property.displayAddress} (ref ${property.id}).`

  return (
    <>
      <JsonLd data={propertyJsonLd(property)} />

      <article className="print:hidden">
        <section className="mx-auto max-w-content px-6 pt-28 md:px-8 md:pt-32">
          <Breadcrumbs
            trail={[
              { name: 'Properties', path: '/properties' },
              { name: property.displayAddress, path: `/properties/${property.slug}` },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="status-chip" data-tone={STATUS_TONE[property.status]}>
                  {STATUS_LABEL[property.status]}
                </span>
                <span className="tabular text-small text-ink-soft">{property.postcodeOutcode}</span>
              </div>
              <h1 className="mt-3 text-h1">{property.displayAddress}</h1>
              <p className="measure mt-3 text-lead text-ink-soft">{property.summary}</p>
            </div>
            <p className="font-display text-h2 tabular whitespace-nowrap text-ink">
              {formatPrice(property.price)}
            </p>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-content px-6 md:px-8">
          <PropertyGallery images={property.images} addressLabel={property.displayAddress} />
        </section>

        <section className="mx-auto max-w-content px-6 py-12 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div className="flex flex-col gap-12">
              {archived ? (
                <div className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-6 md:p-7">
                  <h2 className="text-h3">
                    This {isSale ? 'home has sold' : 'home has been let'}.
                  </h2>
                  <p className="measure mt-2 text-body text-ink-soft">
                    It is kept here as part of our track record. Tell us what you are looking for and
                    we will let you know the moment something similar comes in.
                  </p>
                  <Link href={registerHref} className="btn btn-lettings mt-5 inline-flex">
                    Tell us what you want
                  </Link>
                </div>
              ) : null}

              <KeyFacts property={property} />

              <div>
                <h2 className="text-h3">About this property</h2>
                <div className="measure mt-4 flex flex-col gap-4">
                  {property.description.map((para, i) => (
                    <p key={i} className="text-body text-ink-soft">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {property.features.length ? (
                <div>
                  <h2 className="text-h3">Features</h2>
                  <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {property.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-body text-ink">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {property.floorplans?.length ? (
                <div>
                  <h2 className="text-h3">Floorplan</h2>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {property.floorplans.map((plan) => (
                      <li key={plan.src}>
                        <a
                          href={plan.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                        >
                          <Icon name="expand" className="h-5 w-5" />
                          {plan.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {epc ? (
                <div className="rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-6 md:p-7">
                  <EpcBar epc={epc} />
                </div>
              ) : null}

              {isSale ? <MaterialInfo info={property.materialInformation} /> : null}

              <div>
                <h2 className="text-h3">Location</h2>
                <p className="measure mt-2 text-small text-ink-soft">
                  {property.displayAddress}, {property.postcodeOutcode}. The exact address is confirmed
                  when you enquire.
                </p>
                <div className="mt-4">
                  <MapPanel
                    lat={property.fullAddress.lat}
                    lng={property.fullAddress.lng}
                    centerLat={SITE.office.lat}
                    centerLng={SITE.office.lng}
                    label={`Map showing the area around ${property.displayAddress}`}
                    note={`A view of ${property.town} and the surrounding area. The exact address is confirmed on enquiry.`}
                  />
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
              <EnquiryForm
                propertyId={property.id}
                slug={property.slug}
                displayAddress={property.displayAddress}
                transactionType={property.transactionType}
              />
              <ContactRoutes heading="Prefer to talk?" whatsappMessage={whatsappMessage} />
              <div className="flex items-center justify-between rounded-none border-[length:var(--pane-gap)] border-ink bg-well px-5 py-4">
                <PrintButton />
                <span className="tabular text-small text-ink-soft">Ref {property.id}</span>
              </div>
            </aside>
          </div>
        </section>

        {similar.length ? (
          <section className="border-t-[length:var(--pane-gap)] border-ink bg-oat">
            <div className="mx-auto max-w-content px-6 py-16 md:px-8">
              <h2 className="text-h2">Similar properties</h2>
              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((item) => (
                  <PropertyCard key={item.id} property={item} />
                ))}
              </div>
              <p className="mt-10">
                <Link
                  href={`/properties?path=${isSale ? 'sales' : 'lettings'}`}
                  className="text-body text-sales-ink underline underline-offset-4 hover:no-underline"
                >
                  See all {isSale ? 'homes for sale' : 'homes to rent'}
                </Link>
              </p>
            </div>
          </section>
        ) : null}
      </article>

      <PrintSheet property={property} />
    </>
  )
}
