import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { CredentialCard } from '@/components/marketing/CredentialCard'
import { CountUp } from '@/components/marketing/CountUp'
import { Arch } from '@/components/primitives/Arch'
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { JsonLd } from '@/components/seo/JsonLd'
import { COVERAGE, SITE, yearsTrading } from '@/lib/site'
import { pageMeta, realEstateAgentJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'About Pied-à-Terre Property',
  description:
    'An independent lettings and management firm on the Solent coast since 2011, now adding residential sales. Who we are, our credentials, and what we do not do.',
  path: '/about',
})

/**
 * The numbers we can stand behind today. Sales completed is deliberately absent:
 * the sales arm has not completed a sale yet, so publishing a figure would be an
 * invented statistic. It is added here the day the first sale completes.
 */
const NUMBERS = [
  { value: yearsTrading(), label: 'years on this coastline' },
  { value: 35, prefix: '~', label: 'homes under management' },
  { value: COVERAGE.primary.length + COVERAGE.wider.length, label: 'principal coastal areas covered' },
]

/**
 * The limits, stated plainly. Prompt 08: stating what you do not do is the
 * strongest trust device available and almost nobody uses it.
 */
const LIMITS = [
  {
    title: 'We grow without handing you off',
    body: 'Our reach now runs from Southampton to Chichester and through the Hampshire towns between them. We only accept work the same local team can still service personally.',
  },
  {
    title: 'We are not the cheapest',
    body: 'There is always a cheaper fee somewhere. What we sell is fifteen years of local knowledge, client money protection and a person who answers the phone. If price is the only thing that matters, we are not the right firm.',
  },
  {
    title: 'We do not hand you on',
    body: 'You will not be passed to a progression team you have never met, or a call centre in another city. The people who value your home are the people who see it through.',
  },
]

export default function AboutPage() {
  const years = yearsTrading()
  return (
    <>
      <JsonLd data={realEstateAgentJsonLd()} />

      <PageHero
        tone="neutral"
        eyebrow="About us"
        trail={[{ name: 'About', path: '/about' }]}
        title={
          <>
            You will deal with <em className="italic text-sales-ink">us</em>, not a call centre.
          </>
        }
        lead="An independent firm rooted on the Solent coast since 2011, now working from Southampton to Chichester and across Hampshire without becoming a branch network. People instruct people, so it is worth knowing who you would be instructing."
      />

      {/* 1. The founder's story. Draft copy in the house voice, awaiting the
          founder's approval. No biographical, family or origin detail is
          invented. */}
      <section className="bg-oat">
        <div className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-[5fr_7fr] md:px-8">
          <div>
            <Arch variant="full" className="founder-portrait relative aspect-[4/5] w-full bg-indigo">
              <Image
                src="/images/team/charisma-smith.jpg"
                alt="Charisma Smith, founder and director of Pied-à-Terre Property"
                fill
                sizes="(max-width: 48rem) 100vw, 42vw"
                className="object-contain object-top"
              />
              <Grain fixed={false} photo />
              <span className="absolute bottom-5 left-5 right-5" style={{ zIndex: 'var(--z-content)' }}>
                <span className="eyebrow text-on-dark/80">Founder and director</span>
                <span className="mt-1 block text-body font-medium text-on-dark md:text-h3">
                  {SITE.directorDisplay}
                </span>
              </span>
            </Arch>
            <p className="mt-3 text-small text-ink-soft">
              {SITE.directorDisplay}, founder and director.
            </p>
          </div>

          <div>
            <Eyebrow>Our story</Eyebrow>
            <span className="mt-3 inline-block rounded-sm border border-brass/50 bg-well px-3 py-1 text-small text-ink-soft">
              Draft, awaiting the founder&rsquo;s approval
            </span>
            <h2 className="mt-4 text-h2">
              A foot on the ground, kept for the <em className="italic text-sales-ink">long</em> term.
            </h2>

            <p className="dropcap measure mt-6 text-body text-ink">
              Pied-à-Terre means a foot on the ground: a small place you keep for the times you
              need to be somewhere. It is the right name for a firm that has stayed on one
              coastline since 2011. We learned the original towns the only way you can, by
              working them, one landlord and one
              home at a time.
            </p>
            <p className="measure mt-4 text-body text-ink-soft">
              For {years} years we have done one thing and done it properly: letting and
              managing homes from Southampton and Portsmouth through to Havant, Emsworth and
              Chichester. That is long enough to know which
              streets let in a week and which take a month, what a harbour view is really worth,
              and who to call when a boiler fails on a Friday afternoon. It is knowledge you
              cannot buy in from a call centre, and it is the reason landlords stay with us for
              a decade and longer.
            </p>
            <p className="measure mt-4 text-body text-ink-soft">
              Staying small was a choice, not a limit. Around {SITE.managedHomesCopy.replace('around ', '')}
              {' '}sit on our managed book, and we keep it a size we can actually manage, so that
              every property has a person who knows it rather than a file in a queue. When a
              tenant calls, someone who has stood in that kitchen answers. When a landlord needs
              a decision, they speak to the person who made the last one.
            </p>
            <p className="measure mt-4 text-body text-ink-soft">
              Managing a home well is unglamorous work, and that is rather the point. It is
              honest referencing so a landlord gets the right tenant, deposits protected exactly
              as the law requires, inspections that actually happen, and repairs handled by trades
              we have used for years rather than the cheapest name on a search. None of it makes
              for a flashy advert, but it is what keeps a property let, a tenant settled and a
              landlord able to forget they own it.
            </p>
            <p className="measure mt-4 text-body text-ink-soft">
              We are adding residential sales now for a simple reason. For years, landlords and
              tenants who trusted us to look after their lettings have asked us to sell for them
              too, and we have had to send them elsewhere. The same local knowledge that prices
              a rent accurately prices a sale accurately, and the same person who has managed a
              street for a decade is well placed to sell on it. We are building the sales arm
              carefully, with the right registrations in place before we take it live, because
              doing it properly matters more than doing it quickly, and because our name is the
              only thing on the board.
            </p>
            <p className="measure mt-4 text-body text-ink">
              [Placeholder for {SITE.director} to approve or rewrite: the specific reason she
              founded the firm, and the one thing she wants a first-time seller or landlord to
              know before they pick up the phone. Nothing personal is invented here; this
              paragraph is left for her own words.]
            </p>

            <p className="signature mt-8 text-h2">{SITE.directorDisplay}</p>
            <p className="text-small text-ink-soft">Founder and director</p>
          </div>
        </div>
      </section>

      {/* 2. The team. Founder-led until the remaining team photography exists.
          No stock imagery or placeholder avatars (prompt 08). */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <Eyebrow>The team</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-h2">
          A small team, and you will know their <em className="italic text-sales-ink">names</em>.
        </h2>
        <p className="measure mt-4 text-body text-ink-soft">
          We are a compact, local team rather than a branch network. Charisma&rsquo;s portrait is
          now in place; rather than fill the rest of this page with stock photographs or grey
          silhouettes, we are waiting for proper portraits of the people you will actually deal
          with.
        </p>
        <div className="mt-8 rounded-md border border-brass/40 bg-well p-6 md:p-8">
          <p className="text-body text-ink">
            Further team names, roles and photographs are being prepared and will appear here
            before launch. In the meantime, the fastest way to meet us is a call or a valuation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={SITE.phone.href} className="btn btn-lettings tabular">
              <Icon name="phone" className="h-5 w-5" />
              {SITE.phone.display}
            </a>
            <Link href="/contact" className="btn btn-secondary">
              Visit or write to us
            </Link>
          </div>
        </div>
      </section>

      {/* 3. The award, given a proper block. One award presented well. */}
      <section className="border-y border-brass/30 bg-indigo text-on-dark">
        <div className="relative isolate overflow-hidden">
          <Grain fixed={false} />
          <div
            className="relative mx-auto grid max-w-content gap-8 px-6 py-16 md:grid-cols-[auto_1fr] md:items-center md:px-8"
            style={{ zIndex: 'var(--z-content)' }}
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-brass text-brass">
              <Icon name="shield" className="h-11 w-11" />
            </span>
            <div>
              <Eyebrow tone="on-dark">Recognised locally</Eyebrow>
              <h2 className="mt-3 text-h2">{SITE.accreditations.award}</h2>
              <p className="measure mt-3 text-lead text-on-dark/90">
                Awarded for lettings service in our local area. A local award for local service
                is worth more to us than a national badge, because it reflects the towns we
                actually work in. The award mark will appear here once supplied in vector form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Credentials, explained rather than displayed as logos. */}
      <section id="credentials" className="mx-auto max-w-content px-6 py-24 scroll-mt-28 md:px-8">
        <Eyebrow>Credentials, explained</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-h2">
          The safeguards a serious firm carries as <em className="italic text-sales-ink">standard</em>.
        </h2>
        <p className="measure mt-4 text-body text-ink-soft">
          Most sites show a row of logos and leave you to guess what they mean. Here is what each
          one actually does for you, and our reference where we hold one.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CredentialCard
            name="The Property Ombudsman"
            what="Independent redress scheme for lettings and sales."
            meaning="If we ever got something wrong and could not put it right between us, an independent ombudsman can review it and hold us to account. It is your route of appeal, at no cost to you."
            reference={SITE.accreditations.tpoReference}
          />
          <CredentialCard
            name="Money Shield"
            what="Client money protection scheme."
            meaning="Your rent and any money we hold on your behalf is protected. If anything ever happened to it while in our care, the scheme covers it, so your money is never at risk with us."
          />
          <CredentialCard
            name="Deposit Protection Scheme"
            what="Government-approved tenancy deposit scheme."
            meaning="Every tenant's deposit is held in a protected scheme, not in our account, exactly as the law requires. It is returned fairly at the end of the tenancy, with an independent adjudicator if there is ever a dispute."
          />
          <CredentialCard
            name="HMRC Anti-Money Laundering supervision"
            what="Statutory supervision required to trade as an estate agent."
            meaning="Estate agency is a supervised activity. We are putting this in place for the sales arm before we take it live, rather than after, so the sales service is properly registered from day one."
            pending
          />
        </div>
      </section>

      {/* 5. The numbers band. Honest figures only, no sales figure invented. */}
      <section className="border-y border-brass/30 bg-oat">
        <div className="mx-auto max-w-content px-6 py-16 md:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            {NUMBERS.map((n) => (
              <div key={n.label}>
                <p className="font-display text-display leading-none text-sales-ink">
                  <CountUp to={n.value} prefix={n.prefix} />
                </p>
                <p className="mt-2 text-lead text-ink-soft">{n.label}</p>
              </div>
            ))}
          </div>
          <p className="measure mt-10 text-small text-ink-soft">
            Figures are kept honest and current. Sales completed will be shown here once the
            sales arm has a real number to report, and not before.
          </p>
        </div>
      </section>

      {/* 6. What we do not do. */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <Eyebrow>What we do not do</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-h2">
          The limits, said <em className="italic text-sales-ink">plainly</em>.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {LIMITS.map((l) => (
            <div key={l.title} className="rounded-md border border-brass/40 bg-ground p-6">
              <h3 className="text-h3">{l.title}</h3>
              <p className="measure mt-3 text-body text-ink-soft">{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Valuation CTA band. */}
      <ValuationBand
        tone="lettings"
        heading="Talk to the people who will actually handle it"
        copy="A free, honest valuation from a local firm you can name. No obligation, no hard sell."
        cta="Book a valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
