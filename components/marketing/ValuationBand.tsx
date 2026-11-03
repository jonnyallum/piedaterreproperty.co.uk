/**
 * ValuationBand. The full-width yellow call to action, standing on the Portsmouth skyline, that sits above the
 * footer on most pages. One sentence, one clear button, no distractions.
 * Reused site-wide so every page has a low-friction route to a valuation.
 */
import { Skyline } from './Skyline'
import { SectionBar } from '@/components/primitives/SectionBar'
import { Button } from '@/components/primitives/Button'

interface ValuationBandProps {
  heading?: string
  copy?: string
  cta?: string
  href?: string
  /** Sales or lettings wording. */
  tone?: 'sales' | 'lettings'
}

export function ValuationBand({
  heading = 'Find out what your property is worth',
  copy = 'A free, honest valuation from people who know these streets. No obligation, no hard sell.',
  cta = 'Book a free valuation',
  href = '/sales/free-valuation',
  tone = 'sales',
}: ValuationBandProps) {
  const eyebrow = tone === 'sales' ? 'Free valuation' : 'Rental valuation'
  return (
    <section className="relative isolate overflow-hidden bg-ochre text-ink">
      <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] w-full text-night opacity-90" />
      <div
        className="relative mx-auto max-w-content px-6 pb-56 pt-20 md:px-8 md:pb-72 md:pt-28"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <SectionBar label={eyebrow} className="max-w-md" />
        <h2 className="mt-8 max-w-4xl text-title">{heading}</h2>
        <p className="measure mt-5 text-lead">{copy}</p>
        <div className="mt-9">
          <Button href={href} variant="sales">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
