import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ProseSections } from '@/components/marketing/ProseSections'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { ACCESSIBILITY_POINTS, LEGAL_REVIEWED } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Accessibility',
  description:
    'How Pied-à-Terre Property keeps piedaterreproperty.co.uk accessible, the standard we target, known issues and how to report a problem.',
  path: '/accessibility',
})

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Accessibility"
        trail={[{ name: 'Accessibility', path: '/accessibility' }]}
        title={
          <>
            Built so <em className="italic text-ochre">everyone</em> can use it.
          </>
        }
        lead="We build to the Web Content Accessibility Guidelines at level AA, and we fix what you tell us is hard to use."
      />
      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <ProseSections sections={ACCESSIBILITY_POINTS} />
        <LegalNotice reviewed={LEGAL_REVIEWED} />
      </section>
    </>
  )
}
