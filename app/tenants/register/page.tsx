import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { RegisterForm } from '@/components/lead/RegisterForm'
import { ContactRoutes } from '@/components/lead/ContactRoutes'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Register with us',
  description:
    'Register your requirements and we will let you know when a home that matches comes up, often before it reaches the portals.',
  path: '/tenants/register',
})

export default function RegisterPage() {
  return (
    <>
      <PageHero
        tone="lettings"
        eyebrow="Register with us"
        trail={[
          { name: 'Tenants', path: '/tenants' },
          { name: 'Register', path: '/tenants/register' },
        ]}
        title={
          <>
            Hear about the right home <em className="italic text-ochre">first</em>.
          </>
        }
        lead="Tell us what you are looking for and where. Good homes let quickly, and registered applicants often hear before a property is even advertised."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <RegisterForm />
          <div className="lg:sticky lg:top-28">
            <ContactRoutes
              heading="Prefer to call?"
              whatsappMessage="Hello, I would like to register as a tenant looking for a property."
            />
          </div>
        </div>
      </section>
    </>
  )
}
