/**
 * ValuationBand. The full-width Kiln gradient call to action that sits above the
 * footer on most pages. One sentence, one magnetic button, no distractions.
 * Reused site-wide so every page has a low-friction route to a valuation.
 */
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Button } from '@/components/primitives/Button'
import { MagneticButton } from '@/components/primitives/MagneticButton'

interface ValuationBandProps {
  heading?: string
  copy?: string
  cta?: string
  href?: string
}

export function ValuationBand({
  heading = 'Find out what your property is worth',
  copy = 'A free, honest valuation from people who know these streets. No obligation, no hard sell.',
  cta = 'Book a free valuation',
  href = '/sales/free-valuation',
}: ValuationBandProps) {
  return (
    <section className="relative isolate overflow-hidden surface-kiln text-on-dark">
      <Grain fixed={false} photo />
      <div
        className="relative mx-auto flex max-w-content flex-col items-center px-6 py-24 text-center md:px-8"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <Eyebrow tone="on-dark">Free valuation</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-h1">{heading}</h2>
        <p className="measure mt-5 text-lead text-on-dark/90">{copy}</p>
        <div className="mt-9">
          <MagneticButton>
            <Button href={href} variant="secondary" className="btn-invert btn-arch">
              {cta}
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
