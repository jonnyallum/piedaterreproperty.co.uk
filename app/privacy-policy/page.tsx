import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ProseSections } from '@/components/marketing/ProseSections'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { PRIVACY_SECTIONS, LEGAL_REVIEWED } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Privacy policy',
  description:
    'How Solent C Property Services Limited, trading as Pied-à-Terre Property, collects, uses and protects your personal data, and the rights you hold.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Privacy policy"
        trail={[{ name: 'Privacy policy', path: '/privacy-policy' }]}
        title={
          <>
            How we look after <em className="italic text-ochre">your data</em>.
          </>
        }
        lead="What we collect, why we collect it, who we share it with, and the rights you hold over it. In plain terms."
      />
      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <ProseSections sections={PRIVACY_SECTIONS} />
        <LegalNotice reviewed={LEGAL_REVIEWED} />
      </section>
    </>
  )
}
