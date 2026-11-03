/**
 * ProseSections. The shared legal page layout: a stack of titled sections in
 * the house measure. Each section is a row with a yellow index tab, a
 * condensed heading and the text, divided by the black mullion, so long legal
 * pages read as one family with the rest of the site.
 */
import type { LegalSection } from '@/content/legal'

function idFor(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ProseSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="flex flex-col border-y-[length:var(--pane-gap)] border-night">
      {sections.map((section, i) => (
        <section
          key={section.title}
          aria-labelledby={idFor(section.title)}
          className="grid gap-4 border-t-[length:var(--pane-gap)] border-night py-8 first:border-t-0 md:grid-cols-[6rem_1fr] md:gap-8"
        >
          <p className="tabular font-display text-h1 leading-none text-ink" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </p>
          <div>
            <h2 id={idFor(section.title)} className="text-h2">
              {section.title}
            </h2>
            <p className="measure mt-3 text-body text-ink-soft">{section.body}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
