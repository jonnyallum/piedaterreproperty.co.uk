import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeKuulaUrl } from '@/lib/vision/schema'
import { VisionCompare } from './VisionCompare'

export const metadata: Metadata = {
  title: 'Vision private demonstration | Pied-à-Terre Property',
  description: 'Private prototype of original and digitally furnished property tours.',
  robots: { index: false, follow: false },
}

export default function VisionDemoPage() {
  // Opt-in only. Existing sales service readiness is not modified.
  if (process.env.VISION_DEMO_ENABLED !== 'true') notFound()

  const original = safeKuulaUrl(process.env.VISION_DEMO_ORIGINAL_URL)
  const concept = safeKuulaUrl(process.env.VISION_DEMO_CONCEPT_URL)

  return (
    <main className="min-h-screen bg-oat text-ink">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8">
        <p className="eyebrow text-sales-ink">Pied-à-Terre Vision | Internal demonstration</p>
        <h1 className="mt-6 text-h1">See the home. Imagine the possibilities.</h1>
        <p className="measure mt-5 text-lead text-ink-soft">
          Explore the real property first, then compare it with a digitally furnished concept.
          This prototype is not a published sales listing.
        </p>
        <section className="mt-12" aria-label="Immersive property tour">
          {original && concept ? (
            <VisionCompare originalUrl={original} conceptUrl={concept} />
          ) : (
            <div className="border border-ink/20 bg-well p-8">
              <h2 className="text-h2">Awaiting pilot panoramas</h2>
              <p className="measure mt-3 text-body text-ink-soft">
                Add approved HTTPS Kuula URLs to VISION_DEMO_ORIGINAL_URL and
                VISION_DEMO_CONCEPT_URL in the protected preview environment.
                The viewer will appear here automatically.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
