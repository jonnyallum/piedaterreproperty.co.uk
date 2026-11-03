/**
 * LegalNotice. The dated review line every legal or regulatory summary carries.
 * The date is a real content field so it can be audited, and the wording makes
 * clear the page is general guidance, not legal advice.
 */
import { Icon } from '@/components/primitives/Icon'

interface LegalNoticeProps {
  /** ISO date the content was last reviewed against current law. */
  reviewed: string
}

function monthYear(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export function LegalNotice({ reviewed }: LegalNoticeProps) {
  return (
    <p className="mt-8 flex items-start gap-2 rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-4 text-small text-ink-soft">
      <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
      <span>
        Last reviewed {monthYear(reviewed)}. This is general guidance and not legal advice.
        For your specific circumstances, please take professional advice.
      </span>
    </p>
  )
}
