/**
 * Faq. An accessible disclosure list built on native details and summary, so it
 * is keyboard operable and expandable in place with no JavaScript. Styled to
 * the system: brass hairlines, a chevron that rotates when open.
 */
import type { Faq as FaqItem } from '@/content/faqs'
import { Icon } from '@/components/primitives/Icon'

interface FaqProps {
  items: FaqItem[]
}

export function Faq({ items }: FaqProps) {
  return (
    <div className="divide-y divide-brass/40 border-y border-brass/40">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-h3 text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <Icon
              name="chevron-down"
              className="h-5 w-5 shrink-0 text-brass transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="measure pb-6 text-body text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
