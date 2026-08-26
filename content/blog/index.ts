/**
 * Blog loader. Validates posts at module load, rejects duplicate slugs, and
 * returns them newest first.
 */
import { BlogPostSchema, type BlogPost } from './schema'
import { BLOG_POSTS } from './posts'

export const POSTS: BlogPost[] = BlogPostSchema.array().parse(BLOG_POSTS)

const slugs = new Set<string>()
for (const p of POSTS) {
  if (slugs.has(p.slug)) throw new Error(`Duplicate blog slug: ${p.slug}`)
  slugs.add(p.slug)
}

export function sortedPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
}

export function postBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function postSlugs(): string[] {
  return POSTS.map((p) => p.slug)
}
