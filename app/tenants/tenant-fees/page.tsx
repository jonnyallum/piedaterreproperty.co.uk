import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { Icon } from '@/components/primitives/Icon'
import { TENANT_FEES } from '@/content/tenants'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Tenant fees',
  description:
    'What a letting agent can and cannot charge a tenant under the Tenant Fees Act 2019, set out plainly.',
  path: '/tenants/tenant-fees',
})

export default function TenantFeesPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Tenant fees"
        trail={[
          { name: 'Tenants', path: '/tenants' },
          { name: 'Tenant fees', path: '/tenants/tenant-fees' },
        ]}
        title={
          <>
            What we can, and <em className="italic text-ochre">cannot</em>, charge.
          </>
        }
        lead="The Tenant Fees Act 2019 sets out exactly what a letting agent may charge a tenant. We follow it to the letter, and here it is in plain terms."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-md border border-brass/40 bg-well p-7">
            <div className="flex items-center gap-2 text-lettings-deep">
              <Icon name="check" className="h-5 w-5" />
              <h2 className="text-h3 text-ink">What can be charged</h2>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {TENANT_FEES.permitted.map((item) => (
                <li key={item} className="measure flex items-start gap-2 text-body text-ink-soft">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-lettings" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-brass/40 bg-ground p-7">
            <div className="flex items-center gap-2 text-sales-ink">
              <Icon name="close" className="h-5 w-5" />
              <h2 className="text-h3 text-ink">What cannot be charged</h2>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {TENANT_FEES.prohibited.map((item) => (
                <li key={item} className="measure flex items-start gap-2 text-body text-ink-soft">
                  <Icon name="close" className="mt-1 h-4 w-4 shrink-0 text-sales-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LegalNotice reviewed={TENANT_FEES.reviewed} />
      </section>
    </>
  )
}
