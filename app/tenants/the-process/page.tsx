import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import {
  TENANT_PROCESS,
  LANDLORD_DUTIES,
  TENANT_DUTIES,
  MOVE_OUT_CHECKLIST,
} from '@/content/tenants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'The process, for tenants',
  description:
    'Renting a property through a letting agent, step by step: budgeting, viewing, holding deposit and references, paperwork, moving in, your obligations, and moving out.',
  path: '/tenants/the-process',
})

function DutyList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-h3">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-body text-ink-soft">
            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-lettings" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TheProcessPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="The process"
        trail={[
          { name: 'Tenants', path: '/tenants' },
          { name: 'The process', path: '/tenants/the-process' },
        ]}
        title={
          <>
            Renting a home, <em className="italic text-ochre">step by step</em>.
          </>
        }
        lead="Renting is a big part of life here, and you may be doing it for the first time. This is a clear guide to how it works through a letting agent, start to finish."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Eight steps</Eyebrow>
            <h2 className="mt-3 text-h2">
              From first search to <em className="italic text-lettings">deposit back</em>.
            </h2>
            <p className="measure mt-4 text-body text-ink-soft">
              If you have a question the guide does not answer, just ask us.
            </p>
          </div>
          <ProcessTimeline stages={TENANT_PROCESS} />
        </div>
      </section>

      {/* Obligations both sides */}
      <section className="bg-oat">
        <div className="mx-auto max-w-content px-6 py-24 md:px-8">
          <Eyebrow>During the tenancy</Eyebrow>
          <h2 className="mt-3 text-h2">Who does what</h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <DutyList title="The landlord or managing agent will" items={LANDLORD_DUTIES} />
            <DutyList title="You, as the tenant, will" items={TENANT_DUTIES} />
          </div>
          <figure className="mt-12 border-l-2 border-brass pl-6">
            <blockquote className="measure font-display text-h3 italic text-ink">
              “You must pay your rent on time and look after the property. Failure to do so
              will put you in breach of your tenancy agreement and at risk of losing your
              home.”
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Move-out checklist */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <Eyebrow>When you move out</Eyebrow>
        <h2 className="mt-3 text-h2">The move-out checklist</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {MOVE_OUT_CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-3 text-body text-ink">
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-lettings" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/tenants/register" variant="lettings">
            Register with us
          </Button>
          <Link href="/tenants/holding-deposits" className="btn btn-secondary">
            About holding deposits
          </Link>
        </div>
      </section>
    </>
  )
}
