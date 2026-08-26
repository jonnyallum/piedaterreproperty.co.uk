'use client'

/**
 * FaqGroups. The interactive body of the /faqs page (prompt 09).
 *
 * Accessibility and correctness:
 * - Each question is a real <button> with aria-expanded and aria-controls, so it
 *   is keyboard operable and announced correctly. The answer panel is always in
 *   the DOM (toggled with the hidden attribute), so every answer is present for a
 *   crawler and matches the FAQPage schema, and collapsed content is still found.
 * - The first two answers in each group are open by default, so the page has
 *   visible content for a reader who never clicks.
 * - Opening an answer reflects it in the URL hash, so any single answer is
 *   directly linkable, and arriving with a matching hash opens and scrolls to it.
 * - A client-side, debounced search filters the whole set, with an empty state
 *   that offers the phone number rather than a dead end.
 *
 * The search only hides items in the browser; the server-rendered HTML and the
 * schema always contain the full set.
 */
import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'
import { GROUP_META, groupSlug, type FaqEntry, type FaqGroup } from '@/content/faqs/schema'
import { cn } from '@/lib/cn'

interface FaqGroupsProps {
  groups: { group: FaqGroup; entries: FaqEntry[] }[]
}

export function FaqGroups({ groups }: FaqGroupsProps) {
  // Which answers are open. Seeded so the first two in every group start open.
  const [open, setOpen] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    for (const g of groups) for (const e of g.entries.slice(0, 2)) initial.add(e.id)
    return initial
  })
  const [rawQuery, setRawQuery] = useState('')
  const [query, setQuery] = useState('')

  // Debounce the filter so typing stays smooth.
  useEffect(() => {
    const id = setTimeout(() => setQuery(rawQuery.trim().toLowerCase()), 150)
    return () => clearTimeout(id)
  }, [rawQuery])

  // Open and scroll to an answer linked directly by hash.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace('#', ''))
    if (!hash) return
    const exists = groups.some((g) => g.entries.some((e) => e.id === hash))
    if (!exists) return
    setOpen((prev) => new Set(prev).add(hash))
    // Defer so the panel is expanded before we scroll to it.
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' })
    })
  }, [groups])

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev)
      const willOpen = !next.has(id)
      if (willOpen) next.add(id)
      else next.delete(id)
      // Reflect the open answer in the URL without a scroll jump.
      if (willOpen && typeof history !== 'undefined') {
        history.replaceState(null, '', `#${id}`)
      }
      return next
    })
  }

  const filtered = useMemo(() => {
    if (!query) return groups
    return groups
      .map((g) => ({
        group: g.group,
        entries: g.entries.filter((e) =>
          `${e.question} ${e.answer.join(' ')}`.toLowerCase().includes(query)
        ),
      }))
      .filter((g) => g.entries.length > 0)
  }, [groups, query])

  const total = filtered.reduce((n, g) => n + g.entries.length, 0)

  return (
    <>
      <div className="mb-12">
        <label htmlFor="faq-search" className="field-label">
          Search the questions
        </label>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
            <Icon name="search" className="h-5 w-5" />
          </span>
          <input
            id="faq-search"
            type="search"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Try 'deposit', 'fees' or 'notice'"
            className="field-control pl-12"
            autoComplete="off"
          />
        </div>
        {query ? (
          <p className="mt-2 text-small text-ink-soft" role="status">
            {total} {total === 1 ? 'question' : 'questions'} match &ldquo;{rawQuery.trim()}&rdquo;
          </p>
        ) : null}
      </div>

      {total === 0 ? (
        <div className="rounded-md border border-brass/40 bg-well p-8 text-center">
          <h2 className="text-h3">No questions match that</h2>
          <p className="measure mx-auto mt-2 text-body text-ink-soft">
            You can clear the search and browse by topic, or just ask us. You will reach the same
            people who would have written the answer.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setRawQuery('')} className="btn btn-secondary">
              Clear search
            </button>
            <a href={SITE.phone.href} className="btn btn-lettings tabular">
              <Icon name="phone" className="h-5 w-5" />
              {SITE.phone.display}
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {filtered.map(({ group, entries }) => (
            <section key={group} id={groupSlug(group)} className="scroll-mt-28">
              <h2 className="text-h2">{GROUP_META[group].heading}</h2>
              <p className="measure mt-2 text-body text-ink-soft">{GROUP_META[group].blurb}</p>

              <div className="mt-6 divide-y divide-brass/40 border-y border-brass/40">
                {entries.map((entry) => {
                  const isOpen = open.has(entry.id)
                  const panelId = `${entry.id}-panel`
                  return (
                    <div key={entry.id} id={entry.id} className="scroll-mt-28">
                      <h3>
                        <button
                          type="button"
                          onClick={() => toggle(entry.id)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-h3 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                        >
                          {entry.question}
                          <Icon
                            name="chevron-down"
                            className={cn(
                              'h-5 w-5 shrink-0 text-brass transition-transform',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </button>
                      </h3>
                      <div id={panelId} hidden={!isOpen} className="pb-6">
                        <div className="measure flex flex-col gap-4">
                          {entry.answer.map((p, i) => (
                            <p key={i} className="text-body text-ink-soft">
                              {p}
                            </p>
                          ))}
                        </div>

                        {entry.relatedLinks.length ? (
                          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                            {entry.relatedLinks.map((link) => (
                              <li key={link.href}>
                                <a
                                  href={link.href}
                                  className="inline-flex items-center gap-2 text-small font-medium text-sales-ink hover:underline"
                                >
                                  <Icon name="arrow-right" className="h-4 w-4" />
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {entry.lastReviewed ? (
                          <p className="mt-4 text-small text-ink-soft">
                            Last reviewed {formatReviewed(entry.lastReviewed)}.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>

              {entries.some((e) => e.lastReviewed) ? (
                <p className="mt-5 text-small text-ink-soft">
                  Answers here that touch law or regulation are general guidance, not legal
                  advice. For your circumstances, please take professional advice.
                </p>
              ) : null}
            </section>
          ))}
        </div>
      )}
    </>
  )
}

function formatReviewed(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}
