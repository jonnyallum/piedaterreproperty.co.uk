import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/primitives/Icon'
import { OpenBadge } from '@/components/marketing/OpeningHours'
import { pageMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'

/**
 * Thank-you pages. Each form redirects here on success: a clean conversion
 * surface that survives a refresh and gives room for a useful next step. Always
 * noindex, and excluded from the sitemap. The message sets a real expectation,
 * restates the phone number, and points at one genuinely relevant page.
 */
interface Thanks {
  title: string
  body: string
  nextHref: string
  nextLabel: string
  emergency?: boolean
}

const THANKS: Record<string, Thanks> = {
  valuation: {
    title: 'Your valuation is booked in',
    body: 'We have your details and will call to arrange a convenient time, usually the same working day.',
    nextHref: '/sales/how-we-sell',
    nextLabel: 'See how we sell',
  },
  enquiry: {
    title: 'Your enquiry is on its way',
    body: 'Thank you. We will reply with availability and to arrange a viewing, usually the same working day.',
    nextHref: '/properties',
    nextLabel: 'Browse more properties',
  },
  registration: {
    title: 'You are registered',
    body: 'We will let you know the moment a home that matches your requirements comes up, often before it reaches the portals.',
    nextHref: '/tenants/the-process',
    nextLabel: 'How renting with us works',
  },
  maintenance: {
    title: 'Your maintenance request is logged',
    body: 'Thank you. We will be in touch about next steps. If this is a genuine emergency, such as a gas leak, a major water leak or a total loss of heating, please call us now rather than wait.',
    nextHref: '/tenants',
    nextLabel: 'Tenant information',
    emergency: true,
  },
  contact: {
    title: 'Message received',
    body: 'Thank you for getting in touch. We will reply as soon as we can, usually the same working day.',
    nextHref: '/about',
    nextLabel: 'About Pied-à-Terre Property',
  },
}

export function generateStaticParams() {
  return Object.keys(THANKS).map((kind) => ({ kind }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string }>
}): Promise<Metadata> {
  const { kind } = await params
  const t = THANKS[kind]
  return pageMeta({
    title: t ? t.title : 'Thank you',
    description: 'Thank you. We will be in touch shortly.',
    path: `/thank-you/${kind}`,
    noindex: true,
  })
}

export default async function ThankYouPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  const t = THANKS[kind]
  if (!t) notFound()

  const wa = `https://wa.me/${SITE.whatsapp}`

  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 pt-36 text-center md:px-8 md:pt-44">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lettings-deep text-on-dark">
        <Icon name="check" className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-h1">{t.title}</h1>
      <p className="measure mx-auto mt-4 text-lead text-ink-soft">{t.body}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href={SITE.phone.href} className="btn btn-lettings tabular">
          <Icon name="phone" className="h-5 w-5" />
          {SITE.phone.display}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <Icon name="whatsapp" className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
      <div className="mt-4 flex justify-center">
        <OpenBadge />
      </div>

      <p className="mt-10 border-t border-brass/30 pt-8">
        <Link
          href={t.nextHref}
          className="inline-flex items-center gap-2 text-body text-sales-ink underline underline-offset-4 hover:no-underline"
        >
          {t.nextLabel}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </p>
    </section>
  )
}
