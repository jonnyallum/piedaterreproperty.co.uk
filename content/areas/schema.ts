/**
 * Area page content model. Each of the five primary towns has one of these,
 * authored as genuine local knowledge, geographic and qualitative, never
 * invented statistics. Validated with Zod so a malformed or thin town page fails
 * the build rather than diluting the site (prompt 07 honesty rule).
 *
 * The dynamic sections (available stock, recent lets, reviews) are composed by
 * the page from live data and are not stored here.
 */
import { z } from 'zod'

/** Prompt 07: a town page under this length dilutes the site, so it fails. */
export const MIN_AREA_WORDS = 600

/** Every prose field on a town page, in the order the page renders them. */
export function areaProse(a: {
  intro: string
  housingStock: string[]
  whoMovesHere: string[]
  gettingAround: string[]
  schoolsAndAmenities: string[]
  marketNotes: string[]
}): string[] {
  return [
    a.intro,
    ...a.housingStock,
    ...a.whoMovesHere,
    ...a.gettingAround,
    ...a.schoolsAndAmenities,
    ...a.marketNotes,
  ]
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

const AreaContentShape = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  /** Hand-written, unique. Kept under ~60 characters where possible. */
  metaTitle: z.string().min(10).max(70),
  /** Hand-written, unique, 140 to 155 characters. */
  metaDescription: z.string().min(120).max(170),
  /** One h1 per page: "Estate and letting agents in [town]" or a natural variant. */
  h1: z.string().min(10),
  /** Hero: one honest sentence about what the town is actually like. */
  intro: z.string().min(40),
  /** The periods, styles and streets you actually find here. */
  housingStock: z.array(z.string().min(40)).min(1),
  /** Who moves here and why: commuters, families, downsizers, sailors. */
  whoMovesHere: z.array(z.string().min(40)).min(1),
  /** Transport and journey times: stations, the A3(M), the M27. */
  gettingAround: z.array(z.string().min(40)).min(1),
  /** Schools and amenities, named and factual, no ratings that will date. */
  schoolsAndAmenities: z.array(z.string().min(40)).min(1),
  /** Qualitative market notes only. No invented figures. Rendered on the page. */
  marketNotes: z.array(z.string().min(40)).min(1),
  /**
   * Author-facing notes about figures deliberately withheld pending Charisma's
   * confirmation. These are NEVER rendered on the page and are surfaced only in
   * ASSET_REQUEST_LIST, so a [CONFIRM] marker here is expected and allowed.
   */
  confirmNotes: z.array(z.string().min(4)).default([]),
  /** Outcodes genuinely associated with the town, for internal relevance. */
  postcodes: z.array(z.string().min(2)).min(1),
  /** At least two other town slugs to link to, for the internal link graph. */
  nearby: z.array(z.string().min(2)).min(2),
})

/**
 * The word-count gate. Prompt 07: "a thin town page is worse than no town page,
 * because it dilutes the whole site". So a short page fails the build rather
 * than shipping. Proven against a deliberately truncated town, which is the
 * only way to know a guard works.
 */
export const AreaContentSchema = AreaContentShape.superRefine((a, ctx) => {
  const words = areaProse(a).reduce((n, p) => n + wordCount(p), 0)
  if (words < MIN_AREA_WORDS) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Area page "${a.slug}" has ${words} words of prose, below the ${MIN_AREA_WORDS} word minimum. Write more local detail or remove the page.`,
    })
  }
  // No [CONFIRM] marker may reach a rendered field. Author notes belong in
  // confirmNotes, which the page never renders. Proven by injecting a marker.
  for (const p of areaProse(a)) {
    if (/\[CONFIRM/i.test(p)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Area page "${a.slug}" has a [CONFIRM] marker in rendered content. Move it to confirmNotes so it is not published.`,
      })
    }
  }
})

export type AreaContent = z.infer<typeof AreaContentSchema>
