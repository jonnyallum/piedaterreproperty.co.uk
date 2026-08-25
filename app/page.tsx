import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Button } from '@/components/primitives/Button'
import { Reveal } from '@/components/primitives/Reveal'
import { inWords } from '@/lib/format'
import { SITE, yearsTrading } from '@/lib/site'

/**
 * Home. Foundation-stage hero so the overlay nav sits on a real scene and the
 * design system is visible end to end. Prompt 02 builds out the full page:
 * search instrument, dual-path split, featured properties, credibility band,
 * founder story, areas marquee, reviews and the valuation band.
 */
export default function HomePage() {
  const years = inWords(yearsTrading())
  return (
    <div>
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden surface-harbour-dusk text-on-dark">
        <Grain fixed={false} photo />
        <div
          className="relative mx-auto w-full max-w-content px-6 pb-24 pt-40 md:px-8"
          style={{ zIndex: 'var(--z-content)' }}
        >
          <Reveal>
            <Eyebrow tone="on-dark">Lettings . Management . Sales</Eyebrow>
          </Reveal>
          <Reveal as="h1" delay={80} className="mt-5 max-w-4xl text-display">
            {years.charAt(0).toUpperCase() + years.slice(1)} years on{' '}
            <em className="font-display italic text-ochre">this</em> coastline.
          </Reveal>
          <Reveal delay={160} className="mt-6 max-w-xl text-lead text-on-dark/90">
            An independent firm that knows every street from Portchester to Hayling. Now
            selling homes as well as letting and managing them, with {SITE.managedHomesCopy}{' '}
            in our care.
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-wrap gap-4">
            <Button href="/sales/free-valuation" variant="sales">
              Book a free valuation
            </Button>
            <Button href="/properties" variant="secondary" className="btn-invert">
              Browse properties
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-24 md:px-8">
        <p className="measure text-lead text-ink-soft">
          This is the foundation build. The style guide at{' '}
          <a href="/style-guide" className="text-sales-ink underline">
            /style-guide
          </a>{' '}
          proves every token and component before the marketing pages consume them.
        </p>
      </section>
    </div>
  )
}
