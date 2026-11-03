'use client'

/**
 * ContactRoutes. The "would rather just talk?" block: a real phone link and a
 * WhatsApp deep link with a context-aware pre-filled message. A meaningful
 * share of leads will not fill in a form, so this is never omitted. Taps are
 * tracked.
 */
import { SITE } from '@/lib/site'
import { Icon } from '@/components/primitives/Icon'
import { track } from '@/lib/analytics'

interface ContactRoutesProps {
  /** Pre-filled WhatsApp message for this page context. */
  whatsappMessage?: string
  heading?: string
}

export function ContactRoutes({
  whatsappMessage = 'Hello, I would like to arrange a valuation.',
  heading = 'Would rather just talk?',
}: ContactRoutesProps) {
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
  return (
    <div className="rounded-none border-[length:var(--pane-gap)] border-ink bg-well p-6">
      <p className="text-h3">{heading}</p>
      <p className="measure mt-2 text-small text-ink-soft">
        Call the office or send a message. You will reach the same people, not a call
        centre.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={SITE.phone.href}
          onClick={() => track('call_click', { location: 'contact_routes' })}
          className="btn btn-lettings tabular"
        >
          <Icon name="phone" className="h-5 w-5" />
          {SITE.phone.display}
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'contact_routes' })}
          className="btn btn-secondary"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
