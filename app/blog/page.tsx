import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { Icon } from '@/components/primitives/Icon'
import { longDate } from '@/lib/format'
import { sortedPosts } from '@/content/blog'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'Local property notes',
  description:
    'Notes on the Solent coast property market from an independent local agent: selling, letting, and the towns we know street by street. Written for people who live here.',
  path: '/blog',
})

/**
 * Blog index (prompt 11 F). Stubbed at launch with a working template and no
 * posts, so the honest state is an empty list, never a fake article. Posts added
 * to content/blog appear here automatically.
 */
export default function BlogPage() {
  const posts = sortedPosts()

  return (
    <>
      <PageHero
        tone="neutral"
        eyebrow="Local notes"
        trail={[{ name: 'Notes', path: '/blog' }]}
        title={
          <>
            Notes from people who <em className="italic text-sales-ink">live</em> here.
          </>
        }
        lead="Practical, local writing on the Solent coast market: what is selling, what is letting, and the things worth knowing before you move. Straightforward, and never filler."
      />

      <section className="mx-auto max-w-content px-6 py-20 md:px-8">
        {posts.length === 0 ? (
          <div className="rounded-md border border-brass/40 bg-well p-8 md:p-10">
            <h2 className="text-h3">The first notes are on their way</h2>
            <p className="measure mt-3 text-body text-ink-soft">
              We are writing our first local guides now. In the meantime, the town pages already hold
              genuine local knowledge on each of the places we cover, and we are always happy to
              answer a question directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/areas" className="btn btn-secondary">
                Read the area guides
              </Link>
              <Link href="/contact" className="btn btn-lettings">
                Ask us anything
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-small text-ink-soft">{longDate(post.date)}</p>
                  <h2 className="mt-2 text-h3 group-hover:text-sales-ink">{post.title}</h2>
                  <p className="measure mt-2 text-body text-ink-soft">{post.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-small font-medium text-sales-ink">
                    Read note
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <ValuationBand
        tone="lettings"
        heading="Thinking of making a move?"
        copy="A free, honest valuation from a firm that knows the local market. No obligation."
        cta="Book a valuation"
        href="/lettings/rental-valuation"
      />
    </>
  )
}
