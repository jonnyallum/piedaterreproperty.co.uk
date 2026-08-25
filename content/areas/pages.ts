/**
 * The authored town-page content, validated at module load so a thin, malformed
 * or templated town page fails the build. Until a town is authored it simply has
 * no page, rather than a templated placeholder (prompt 07 honesty rule).
 *
 * Three guards run here, and each has been proven against a deliberately broken
 * input rather than assumed to work:
 *
 * 1. Shape and length, from the schema: every field present, every meta title
 *    and description hand written and within range, at least 600 words of prose.
 * 2. Distinctness: no sentence may appear on two towns with only the name
 *    swapped. This is the guard that stops the five pages collapsing into one
 *    template, which is the specific failure prompt 07 warns about.
 * 3. Link graph: every town links to at least two other towns that actually
 *    exist, and never to itself.
 */
import { AreaContentSchema, areaProse, type AreaContent } from './schema'
import { AREA_CONTENT } from './content-data'

export const AREA_PAGES: AreaContent[] = AreaContentSchema.array().parse(AREA_CONTENT)

/**
 * Reduce a sentence to a comparable form: lowercase, no punctuation, and with
 * every town name removed, so "the housing stock in Havant is varied" and "the
 * housing stock in Emsworth is varied" collapse to the same string and are
 * caught. That substitution is the whole point of the check.
 */
function fingerprint(sentence: string, townNames: string[]): string {
  let s = sentence.toLowerCase()
  for (const name of townNames) s = s.split(name.toLowerCase()).join(' ')
  return s.replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 8)
}

function assertDistinct(pages: AreaContent[]): void {
  const townNames = pages.map((p) => p.name)
  const seen = new Map<string, string>()
  for (const page of pages) {
    for (const paragraph of areaProse(page)) {
      for (const sentence of sentences(paragraph)) {
        const key = fingerprint(sentence, townNames)
        const owner = seen.get(key)
        if (owner && owner !== page.slug) {
          throw new Error(
            `Templated area content: a sentence appears on both "${owner}" and "${page.slug}" with only the town name changed. Rewrite it. Sentence: ${sentence}`
          )
        }
        seen.set(key, page.slug)
      }
    }
  }
}

function assertLinkGraph(pages: AreaContent[]): void {
  const slugs = new Set(pages.map((p) => p.slug))
  for (const page of pages) {
    const targets = new Set(page.nearby)
    if (targets.has(page.slug)) {
      throw new Error(`Area "${page.slug}" lists itself as a nearby town.`)
    }
    for (const target of targets) {
      if (!slugs.has(target)) {
        throw new Error(`Area "${page.slug}" links to "${target}", which has no page.`)
      }
    }
    if (targets.size < 2) {
      throw new Error(`Area "${page.slug}" links to fewer than two other town pages.`)
    }
  }
}

assertDistinct(AREA_PAGES)
assertLinkGraph(AREA_PAGES)

export function getAreaContent(slug: string): AreaContent | undefined {
  return AREA_PAGES.find((a) => a.slug === slug)
}

export function areaSlugs(): string[] {
  return AREA_PAGES.map((a) => a.slug)
}
