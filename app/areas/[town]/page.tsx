import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/marketing/PageHero'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Icon } from '@/components/primitives/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAreaContent, areaSlugs } from '@/content/areas/pages'
import { areaBySlug } from '@/content/areas'
import { propertiesInArea } from '@/lib/properties'
import { pageMeta, realEstateAgentJsonLd, placeJsonLd } from '@/lib/seo'
import type { AreaContent } from '@/content/areas/schema'

export function generateStaticParams() {
  return areaSlugs().map((town) => ({ town }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>
}): Promise<Metadata> {
  const { town } = await params
  const area = getAreaContent(town)
  if (!area) return { title: 'Area not found' }
  return pageMeta({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/areas/${area.slug}`,
  })
}

function Prose({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-h3">{heading}</h2>
      <div className="measure mt-4 flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-body text-ink-soft">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

export default async function AreaPage({ params }: { params: Promise<{ town: string }> }) {
  const { town } = await params
  const area: AreaContent | undefined = getAreaContent(town)
  if (!area) notFound()

  const properties = propertiesInArea(area.name, area.postcodes)
  const nearby = area.nearby
    .map((slug) => areaBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))

  return (
    <>
      <JsonLd data={[realEstateAgentJsonLd(), placeJsonLd(area.name, area.intro)]} />

      <PageHero
        tone="neutral"
        eyebrow="Areas we cover"
        trail={[
          { name: 'Areas', path: '/areas' },
          { name: area.name, path: `/areas/${area.slug}` },
        ]}
        title={area.h1}
        lead={area.intro}
      >
        <Link href={`/sales/free-valuation?town=${encodeURIComponent(area.name)}`} className="btn btn-sales">
          What is your {area.name} home worth?
        </Link>
        <Link href={`/properties?path=lettings&town=${encodeURIComponent(area.name)}`} className="btn btn-lettings">
          Looking to rent in {area.name}?
        </Link>
      </PageHero>

      <div className="mx-auto max-w-content px-6 pb-8 md:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_18rem] lg:gap-12">
          <div className="min-w-0">
            <Prose heading="The housing stock" paragraphs={area.housingStock} />
            <Prose heading="Who moves here" paragraphs={area.whoMovesHere} />
            <Prose heading="Getting around" paragraphs={area.gettingAround} />
            <Prose heading="Schools and amenities" paragraphs={area.schoolsAndAmenities} />
            <Prose heading={`The market in ${area.name}`} paragraphs={area.marketNotes} />
          </div>

          {/* Internal link rail: two nearby towns, both service hubs. */}
          <aside className="mt-12 lg:sticky lg:top-28 lg:mt-16 lg:self-start">
            <div className="rounded-none border-[length:var(--pane-gap)] border-night bg-well p-6">
              <p className="eyebrow text-ink-soft">Nearby</p>
              <ul className="mt-3 flex flex-col gap-2">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/areas/${n.slug}`}
                      className="inline-flex items-center gap-2 text-body text-sales-ink hover:underline"
                    >
                      <Icon name="pin" className="h-4 w-4 text-brass" />
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-6 text-ink-soft">Our services</p>
              <ul className="mt-3 flex flex-col gap-2 text-body">
                <li>
                  <Link href="/sales" className="text-sales-ink hover:underline">
                    Selling with us
                  </Link>
                </li>
                <li>
                  <Link href="/lettings" className="text-lettings-deep hover:underline">
                    Letting and management
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {properties.length ? (
        <section className="border-t-[length:var(--pane-gap)] border-night bg-oat">
          <div className="mx-auto max-w-content px-6 py-16 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-h2">Our properties in and around {area.name}</h2>
              <Link
                href={`/properties?town=${encodeURIComponent(area.name)}`}
                className="text-body text-sales-ink underline underline-offset-4 hover:no-underline"
              >
                See all
              </Link>
            </div>
            <p className="measure mt-2 text-body text-ink-soft">
              Available homes where we have them, and recent lets and sales as proof of work where we
              do not.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t-[length:var(--pane-gap)] border-night bg-oat">
          <div className="mx-auto max-w-content px-6 py-16 text-center md:px-8">
            <h2 className="text-h3">No current listings in {area.name}</h2>
            <p className="measure mx-auto mt-2 text-body text-ink-soft">
              Homes here move quickly. Register your interest and we will tell you the moment
              something comes up.
            </p>
            <Link href="/tenants/register" className="btn btn-lettings mt-6 inline-flex">
              Register your interest
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
