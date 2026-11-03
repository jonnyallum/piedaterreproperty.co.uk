/**
 * CredentialStrip (prompt 10 D). A compact row of the firm's credentials as
 * social proof, each linking to its plain-English explanation on /about rather
 * than being a dead logo. HMRC AML appears only once confirmed for the sales arm.
 * Server component.
 */
import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'

const MARKS: { label: string; detail: string }[] = [
  { label: 'The Property Ombudsman', detail: `Redress, member ${SITE.accreditations.tpoReference}` },
  { label: 'Money Shield', detail: 'Client money protection' },
  { label: 'Deposit Protection Scheme', detail: 'Tenant deposits held safely' },
  { label: 'Lettings Award', detail: SITE.accreditations.award },
]

export function CredentialStrip({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {MARKS.map((m) => (
        <li key={m.label}>
          <Link
            href="/about#credentials"
            className="flex h-full items-start gap-3 rounded-none border-[length:var(--pane-gap)] border-ink bg-ground p-4 transition-colors hover:bg-hover"
          >
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
            <span>
              <span className="block text-body font-medium text-ink">{m.label}</span>
              <span className="block text-small text-ink-soft">{m.detail}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
