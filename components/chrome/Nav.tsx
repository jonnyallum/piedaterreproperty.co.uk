'use client'

/**
 * Nav. Transparent over the hero on the home page, transitioning to an indigo
 * bar with blur and a brass hairline after 80px of scroll. On interior pages it
 * is solid from the top. The phone number is a real tel: link that fires an
 * analytics event; the primary CTA is Free valuation in the Kiln gradient.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PRIMARY_NAV } from './nav-data'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { SITE } from '@/lib/site'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

export function Nav() {
  const pathname = usePathname()
  const overlay = pathname === '/'
  const [scrolled, setScrolled] = useState(!overlay)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!overlay) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overlay])

  const solid = scrolled
  const onDark = overlay && !scrolled
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 transition-colors',
        solid ? 'bg-indigo backdrop-blur-md' : 'bg-transparent'
      )}
      style={{ zIndex: 'var(--z-nav)' }}
      data-scrolled={solid || undefined}
    >
      {solid ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'color-mix(in srgb, var(--c-brass) 45%, transparent)' }}
          aria-hidden="true"
        />
      ) : null}

      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-4 md:px-8">
        <Logo tone={onDark || solid ? 'on-dark' : 'ink'} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-small font-medium transition-opacity hover:opacity-70',
                    onDark || solid ? 'text-on-dark' : 'text-ink'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.phone.href}
            onClick={() => track('call_click', { location: 'nav' })}
            className={cn(
              'tabular hidden text-small font-medium md:inline-flex md:items-center md:gap-2',
              onDark || solid ? 'text-on-dark' : 'text-ink'
            )}
          >
            <Icon name="phone" className="h-5 w-5" />
            {SITE.phone.display}
          </a>

          <Button
            href="/sales/free-valuation"
            variant="sales"
            className="hidden md:inline-flex"
          >
            Free valuation
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn('btn btn-icon lg:hidden', (onDark || solid) && 'text-on-dark')}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} returnFocusTo={menuButtonRef} />
    </header>
  )
}
