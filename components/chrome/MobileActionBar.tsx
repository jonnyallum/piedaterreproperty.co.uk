'use client'

/**
 * MobileActionBar. A fixed bottom bar below 768px with three targets: Call,
 * WhatsApp and Free valuation. The single highest-converting element on a
 * property site, and absent from the old site. Each tap is tracked.
 *
 * Page content adds matching bottom padding (see the utility applied in
 * layout) so this bar never covers a form submit button.
 */
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { Icon } from '@/components/primitives/Icon'
import { track } from '@/lib/analytics'

export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 grid grid-cols-3 border-t border-brass/40 bg-ground/95 backdrop-blur-md md:hidden"
      style={{ zIndex: 'var(--z-sticky-bar)' }}
      aria-label="Quick contact"
    >
      <a
        href={SITE.phone.href}
        onClick={() => track('call_click', { location: 'sticky_bar' })}
        className="flex flex-col items-center gap-1 py-3 text-ink"
      >
        <Icon name="phone" className="h-5 w-5 text-lettings" />
        <span className="text-small font-medium">Call</span>
      </a>
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { location: 'sticky_bar' })}
        className="flex flex-col items-center gap-1 border-x border-brass/40 py-3 text-ink"
      >
        <Icon name="whatsapp" className="h-5 w-5 text-lettings" />
        <span className="text-small font-medium">WhatsApp</span>
      </a>
      <Link
        href="/sales/free-valuation"
        onClick={() => track('nav_cta_click', { location: 'sticky_bar' })}
        className="flex flex-col items-center gap-1 py-3 text-sales-ink"
      >
        <Icon name="arch" className="h-5 w-5" />
        <span className="text-small font-medium">Valuation</span>
      </Link>
    </div>
  )
}
