/**
 * Blog content model (prompt 11 F). The blog is stubbed now, with the model and a
 * working template but no posts, because local content is the cheapest long-term
 * route to ranking above the national chains, and retrofitting the structure
 * later costs more than defining it up front.
 *
 * A post that ships must be real, useful, local content. The loader validates the
 * shape and, as with the FAQs and area pages, refuses any [CONFIRM] placeholder
 * in published fields.
 */
import { z } from 'zod'

const noConfirm = (label: string) =>
  z.string().refine((s) => !/\[CONFIRM/i.test(s), {
    message: `${label} contains a [CONFIRM] placeholder and cannot be published.`,
  })

export const BlogPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: noConfirm('Blog title').pipe(z.string().min(8).max(80)),
  description: noConfirm('Blog description').pipe(z.string().min(60).max(170)),
  /** ISO date published. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** ISO date last updated, for the sitemap and the article schema. */
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  /** Optional town this post is about, for the local internal link graph. */
  town: z.string().optional(),
  /** Body as an array of paragraphs. Kept plain so it validates and is portable. */
  body: z.array(noConfirm('Blog body').pipe(z.string().min(1))).min(1),
})

export type BlogPost = z.infer<typeof BlogPostSchema>
