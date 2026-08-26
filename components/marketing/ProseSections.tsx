/**
 * ProseSections. The shared legal page layout: a stack of titled sections in
 * the house measure, styled to the system rather than raw document prose.
 * Used by the privacy, terms, complaints, accessibility and material
 * information pages so they all read as one family.
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
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <section key={section.title} aria-labelledby={idFor(section.title)}>
          <h2 id={idFor(section.title)} className="text-h3">
            {section.title}
          </h2>
          <p className="measure mt-3 text-body text-ink-soft">{section.body}</p>
        </section>
      ))}
    </div>
  )
}
