import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Renting with us, for tenants',
  description:
    'Renting a home on the Solent coast: how the process works, how to register, how to report maintenance, and your holding deposit and fee rights.',
  path: '/tenants',
})

const CARDS = [
  {
    href: '/tenants/the-process',
    title: 'The process',
    body: 'A clear, step-by-step guide to renting through us, from first search to getting your deposit back.',
    icon: 'arch' as const,
  },
  {
    href: '/tenants/register',
    title: 'Register with us',
    body: 'Tell us what you are looking for and we will let you know when it comes up, often first.',
    icon: 'check' as const,
  },
  {
    href: '/tenants/report-maintenance',
    title: 'Report maintenance',
    body: 'Something needs fixing? Report it in a minute, with a photo if it helps.',
    icon: 'phone' as const,
  },
  {
    href: '/tenants/holding-deposits',
    title: 'Holding deposits',
    body: 'What a holding deposit is, when it is refunded, and when it can be kept.',
    icon: 'clock' as const,
  },
  {
    href: '/tenants/tenant-fees',
    title: 'Tenant fees',
    body: 'What can and cannot be charged under the Tenant Fees Act 2019.',
    icon: 'mail' as const,
  },
  {
    href: '/properties',
    title: 'Browse homes to rent',
    body: 'See what is available now across the South Coast and Hampshire.',
    icon: 'pin' as const,
  },
]

export default function TenantsHubPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Tenants"
        trail={[{ name: 'Tenants', path: '/tenants' }]}
        title={
          <>
            Renting, made <em className="italic text-ochre">straightforward</em>.
          </>
        }
        lead="Today's tenant is tomorrow's buyer, and we treat you that way. New homes are added every week, and everything you need to rent with us is here."
      >
        <Button href="/properties" variant="lettings">
          Browse homes to rent
        </Button>
        <Button href="/tenants/register" variant="secondary" className="btn-invert">
          Register with us
        </Button>
      </PageHero>

      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <Eyebrow>Everything for tenants</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-md border border-brass/40 bg-ground p-7 transition-colors hover:bg-well"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-well text-lettings">
                <Icon name={card.icon} className="h-5 w-5" />
              </span>
              <h2 className="mt-5 flex items-center gap-2 text-h3">
                {card.title}
                <Icon
                  name="arrow-up-right"
                  className="h-4 w-4 text-brass transition-transform group-hover:translate-x-0.5"
                />
              </h2>
              <p className="measure mt-2 text-body text-ink-soft">{card.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
