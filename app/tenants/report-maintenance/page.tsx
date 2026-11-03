import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { MaintenanceForm } from '@/components/lead/MaintenanceForm'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Report maintenance',
  description:
    'Report a maintenance issue at your rented property. Add a photo if it helps, tell us how urgent it is, and how to arrange access.',
  path: '/tenants/report-maintenance',
})

export default function ReportMaintenancePage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Report maintenance"
        trail={[
          { name: 'Tenants', path: '/tenants' },
          { name: 'Report maintenance', path: '/tenants/report-maintenance' },
        ]}
        title={
          <>
            Something need <em className="italic">fixing</em>?
          </>
        }
        lead="Report it here in a minute. Add a photo if it helps, and tell us how urgent it is and when we can get access."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="mx-auto max-w-2xl">
          <MaintenanceForm />
        </div>
      </section>
    </>
  )
}
