/**
 * Faq. An accessible disclosure list built on native details and summary, so it
 * is keyboard operable and expandable in place with no JavaScript. Styled as
 * a stack of panes: a yellow index tab, the question in condensed capitals and
 * a black chevron tab that rotates when open.
 */
import type { Faq as FaqItem } from '@/content/faqs'
import { Icon } from '@/components/primitives/Icon'

interface FaqProps {
  items: FaqItem[]
}

export function Faq({ items }: FaqProps) {
  return (
    <div className="border-[length:var(--pane-gap)] border-ink bg-ink">
      {items.map((item, i) => (
        <details
          key={item.q}
          className="group border-b-[length:var(--pane-gap)] border-ink bg-ground last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-stretch text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="tabular flex w-14 shrink-0 items-center justify-center bg-ochre font-display text-h3 text-ink md:w-16">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 px-4 py-5 font-display text-h3 uppercase leading-tight">
              {item.q}
            </span>
            <span className="flex w-14 shrink-0 items-center justify-center bg-night text-ochre md:w-16">
              <Icon
                name="chevron-down"
                className="h-5 w-5 transition-transform group-open:rotate-180"
              />
            </span>
          </summary>
          <p className="measure px-4 pb-6 pl-[4.5rem] pt-4 text-body text-ink-soft md:pl-20">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  )
}
