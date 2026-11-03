/**
 * TrustColumn. A compact credential panel that sits beside a form so it never
 * stands alone on a bare page. Credentials, the award, the phone number and a
 * link to real reviews. No review text is invented here.
 */
import Link from 'next/link'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'
import { SITE, yearsTrading } from '@/lib/site'

const MARKS = [
  'The Property Ombudsman, redress',
  'Client money protection',
  'Deposit Protection Scheme',
  SITE.accreditations.award,
]

export function TrustColumn() {
  return (
    <aside className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-6">
      <Eyebrow>Why us</Eyebrow>
      <p className="mt-3 text-h3">
        {yearsTrading()} years on this coast, and still here afterwards.
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {MARKS.map((m) => (
          <li key={m} className="flex items-start gap-2 text-small text-ink">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lettings" />
            {m}
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t-[length:var(--pane-gap)] border-ink pt-5">
        <a
          href={SITE.phone.href}
          className="tabular inline-flex items-center gap-2 text-body font-medium text-ink"
        >
          <Icon name="phone" className="h-5 w-5 text-lettings" />
          {SITE.phone.display}
        </a>
        <Link href="/reviews" className="mt-3 block text-small text-sales-ink underline">
          Read our reviews
        </Link>
      </div>
    </aside>
  )
}
