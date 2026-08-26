/**
 * FAQ loader (prompt 09). Validates the authored set at module load, so a
 * malformed entry, a duplicate id, an internal link to a page that does not
 * exist, or a [CONFIRM] placeholder in any rendered string, all fail the build
 * rather than shipping.
 */
import { FaqSchema, FAQ_GROUPS, type FaqEntry, type FaqGroup } from './schema'
import { FAQ_DATA } from './data'

export const FAQS: FaqEntry[] = FaqSchema.array().parse(FAQ_DATA)

// Ids are anchors and schema keys, so they must be unique.
const ids = new Set<string>()
for (const f of FAQS) {
  if (ids.has(f.id)) throw new Error(`Duplicate FAQ id: ${f.id}`)
  ids.add(f.id)
}

/**
 * Defence in depth for the [CONFIRM] rule. The schema already rejects it per
 * field; this re-checks the whole rendered surface, questions, answers and link
 * labels together, so no published FAQ string can carry an unconfirmed figure.
 * Proven by injecting a marker and confirming the build fails.
 */
for (const f of FAQS) {
  const rendered = [f.question, ...f.answer, ...f.relatedLinks.map((l) => l.label)]
  for (const s of rendered) {
    if (/\[CONFIRM/i.test(s)) {
      throw new Error(`FAQ "${f.id}" contains a [CONFIRM] placeholder in published content.`)
    }
  }
}

export function faqsByGroup(group: FaqGroup): FaqEntry[] {
  return FAQS.filter((f) => f.group === group)
}

/** Groups in canonical order, each with its entries, skipping any that are empty. */
export function groupedFaqs(): { group: FaqGroup; entries: FaqEntry[] }[] {
  return FAQ_GROUPS.map((group) => ({ group, entries: faqsByGroup(group) })).filter(
    (g) => g.entries.length > 0
  )
}

export function faqById(id: string): FaqEntry | undefined {
  return FAQS.find((f) => f.id === id)
}
