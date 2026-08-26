import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/marketing/PageHero'
import { ValuationBand } from '@/components/marketing/ValuationBand'
import { JsonLd } from '@/components/seo/JsonLd'
import { longDate } from '@/lib/format'
import { postBySlug, postSlugs } from '@/content/blog'
import { pageMeta, canonical } from '@/lib/seo'
import { SITE } from '@/lib/site'

/**
 * Blog post template (prompt 11 F). Fully working, so the moment a real post is
 * added to content/blog it renders with correct metadata, BlogPosting schema and
 * breadcrumbs. No posts exist at launch, so generateStaticParams is empty.
 */
export function generateStaticParams() {
  return postSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return { title: 'Note not found' }
  return pageMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}` })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: SITE.tradingName },
    publisher: { '@type': 'Organization', name: SITE.tradingName },
    mainEntityOfPage: canonical(`/blog/${post.slug}`),
  }

  return (
    <>
      <JsonLd data={articleSchema} />

      <PageHero
        tone="neutral"
        eyebrow={longDate(post.date)}
        trail={[
          { name: 'Notes', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        title={post.title}
        lead={post.description}
      />

      <article className="mx-auto max-w-content px-6 pb-8 md:px-8">
        <div className="measure flex flex-col gap-4">
          {post.body.map((p, i) => (
            <p key={i} className="text-body text-ink-soft">
              {p}
            </p>
          ))}
        </div>

        {post.town ? (
          <p className="mt-8 text-body">
            <Link href="/areas" className="text-sales-ink underline underline-offset-4">
              Read our full guide to {post.town}
            </Link>
          </p>
        ) : null}
      </article>

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
