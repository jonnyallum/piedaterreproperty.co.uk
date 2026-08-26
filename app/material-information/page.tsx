import type { Metadata } from 'next'
import { PageHero } from '@/components/marketing/PageHero'
import { ProseSections } from '@/components/marketing/ProseSections'
import { LegalNotice } from '@/components/marketing/LegalNotice'
import { MATERIAL_INFORMATION_POINTS, LEGAL_REVIEWED } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Material information',
  description:
    'What material information is, why we publish it on every sales listing, and how to use it before you enquire about a home.',
  path: '/material-information',
})

export default function MaterialInformationPage() {
  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Material information"
        trail={[{ name: 'Material information', path: '/material-information' }]}
        title={
          <>
            The facts you are <em className="italic text-ochre">entitled to</em>.
          </>
        }
        lead="Material information is published on every sales listing so you can decide whether a home is worth your time, before you enquire."
      />
      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        <ProseSections sections={MATERIAL_INFORMATION_POINTS} />
        <LegalNotice reviewed={LEGAL_REVIEWED} />
      </section>
    </>
  )
}
