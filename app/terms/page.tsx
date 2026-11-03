import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ProseSections } from '@/components/marketing/ProseSections'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { TERMS_SECTIONS, LEGAL_REVIEWED } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Website terms of use',
  description:
    'The terms that govern your use of piedaterreproperty.co.uk, the information on it, and the limits of our responsibility.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Terms of use"
        trail={[{ name: 'Terms of use', path: '/terms' }]}
        title={
          <>
            The ground rules for <em className="italic">this site</em>.
          </>
        }
        lead="These terms cover your use of piedaterreproperty.co.uk. They are separate from any agency agreement you enter with us."
      />
      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <ProseSections sections={TERMS_SECTIONS} />
        <LegalNotice reviewed={LEGAL_REVIEWED} />
      </section>
    </>
  )
}
