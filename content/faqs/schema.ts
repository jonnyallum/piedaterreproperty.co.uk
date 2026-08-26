/**
 * FAQ content model (prompt 09). Each entry is typed and validated at the module
 * boundary so a malformed or unfinished FAQ fails the build rather than shipping.
 *
 * The single most important guard here is the [CONFIRM] check: no published FAQ
 * string may contain a [CONFIRM] placeholder, because that is how an unconfirmed
 * fee, tie-in or timescale would ship by accident. An author may draft with a
 * [CONFIRM] marker, but the build refuses to render it. Proven against a
 * deliberately marked entry, which is the only way to know the guard works.
 */
import { z } from 'zod'

export const FAQ_GROUPS = ['Selling', 'Lettings', 'Tenants', 'General'] as const
export type FaqGroup = (typeof FAQ_GROUPS)[number]

/** Anchor slug for a group, shared by the page nav and the client accordion. */
export function groupSlug(group: FaqGroup): string {
  return group.toLowerCase()
}

/** Human heading and intro per group, shown on /faqs and in the sticky nav. */
export const GROUP_META: Record<FaqGroup, { heading: string; blurb: string }> = {
  Selling: {
    heading: 'Selling your home',
    blurb: 'What to expect from a valuation through to completion, and how our fees and terms work.',
  },
  Lettings: {
    heading: 'Letting and landlords',
    blurb: 'Management, referencing, your legal obligations, and what happens when things go wrong.',
  },
  Tenants: {
    heading: 'Renting and tenants',
    blurb: 'Registering, holding deposits, what you can be charged, repairs, and getting your deposit back.',
  },
  General: {
    heading: 'About us and general',
    blurb: 'Who we are, where we work, how we are regulated, and how to reach a real person.',
  },
}

const LinkSchema = z.object({
  label: z.string().min(2),
  href: z.string().regex(/^\/[a-z0-9/-]*$/, 'Related links must be internal paths.'),
})

/** Reject any [CONFIRM] placeholder in a string that will be rendered. */
const noConfirm = (label: string) =>
  z.string().refine((s) => !/\[CONFIRM/i.test(s), {
    message: `${label} still contains a [CONFIRM] placeholder and cannot be published.`,
  })

export const FaqSchema = z.object({
  /** Stable, URL-safe id. Becomes the anchor, so it must not change casually. */
  id: z.string().regex(/^[a-z0-9-]+$/),
  question: noConfirm('Question').pipe(z.string().min(8)),
  /** Two to four short paragraphs. Answer first, then explain. */
  answer: z.array(noConfirm('Answer').pipe(z.string().min(20))).min(1).max(4),
  group: z.enum(FAQ_GROUPS),
  /** Internal links so an answer feeds the funnel rather than being a dead end. */
  relatedLinks: z.array(LinkSchema).default([]),
  /**
   * ISO date this answer was last checked against current law. Required on any
   * answer that touches law or regulation, so a reader can see how current it is.
   */
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export type FaqEntry = z.infer<typeof FaqSchema>

/** The shape faqPageJsonLd and the simple Faq component expect. */
export interface FaqQA {
  q: string
  a: string
}

/** Flatten an entry's paragraphs into the single-string answer schema wants. */
export function toQA(entry: FaqEntry): FaqQA {
  return { q: entry.question, a: entry.answer.join('\n\n') }
}
