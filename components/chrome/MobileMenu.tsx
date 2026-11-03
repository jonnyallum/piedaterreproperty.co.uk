'use client'

/**
 * MobileMenu. A full-screen Linen Wipe panel holding the primary nav plus a
 * large call button and a WhatsApp button. Behaves as a modal dialog: focus is
 * trapped inside, Escape closes, background scroll is locked, and focus returns
 * to the trigger on close.
 */
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { PRIMARY_NAV } from './nav-data'
import { SITE } from '@/lib/site'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Eyebrow } from '@/components/primitives/Eyebrow'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  returnFocusTo: React.RefObject<HTMLButtonElement | null>
}

export function MobileMenu({ open, onClose, returnFocusTo }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    // Capture the element to restore focus to now, at open time.
    const returnTarget = returnFocusTo.current ?? previouslyFocused
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      returnTarget?.focus()
    }
  }, [open, onClose, returnFocusTo])

  if (!open) return null

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 flex flex-col overflow-y-auto bg-night px-6 pb-10 pt-6 text-on-dark"
      style={{ zIndex: 'var(--z-menu)' }}
    >
      <div className="flex items-center justify-between">
        <Eyebrow tone="on-dark">Menu</Eyebrow>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-icon"
          aria-label="Close menu"
        >
          <Icon name="close" />
        </button>
      </div>

      <nav aria-label="Primary" className="mt-8 flex-1">
        <ul className="flex flex-col border-t-[length:var(--pane-gap)] border-ochre">
          {PRIMARY_NAV.map((item, i) => (
            <li key={item.href} className="border-b-[length:var(--pane-gap)] border-ochre">
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={onClose}
                className="flex items-baseline gap-4 py-3 font-display text-display uppercase leading-none text-on-dark hover:text-ochre"
              >
                <span className="tabular w-8 text-h3 text-ochre">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          href={SITE.phone.href}
          external
          variant="lettings"
          aria-label={`Call the office on ${SITE.phone.display}`}
        >
          <Icon name="phone" className="h-5 w-5" />
          Call {SITE.phone.display}
        </Button>
        <Button
          href={`https://wa.me/${SITE.whatsapp}`}
          external
          variant="secondary"
          aria-label="Message us on WhatsApp"
        >
          <Icon name="whatsapp" className="h-5 w-5" />
          WhatsApp us
        </Button>
        <Button href="/sales/free-valuation" variant="sales">
          Free valuation
        </Button>
      </div>
    </div>
  )
}
