/**
 * DualPath. The self-select fork, immediately below the hero statement. Two
 * large arch-topped targets: sell (terracotta, Kiln) and let (verdigris). The
 * single most important structural decision on the page: a visitor picks a side
 * in one click, and the colour follows them across the site.
 */
import Link from 'next/link'
import { Grain } from '@/components/primitives/Grain'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { Icon } from '@/components/primitives/Icon'

interface PathCard {
  href: string
  eyebrow: string
  title: string
  copy: string
  surface: string
}

const CARDS: PathCard[] = [
  {
    href: '/sales',
    eyebrow: 'Vendors',
    title: 'I want to sell',
    copy: 'A local sale, handled by the same people from valuation to completion.',
    surface: 'surface-kiln',
  },
  {
    href: '/lettings',
    eyebrow: 'Landlords',
    title: 'I want to let',
    copy: 'Fifteen years of lettings and management, and a landlord book that stays.',
    surface: 'surface-tide',
  },
]

export function DualPath() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {CARDS.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className={`group relative isolate flex min-h-56 flex-col justify-end overflow-hidden p-7 text-on-dark arch-shallow ${card.surface}`}
        >
          <Grain fixed={false} photo />
          <div className="relative" style={{ zIndex: 'var(--z-content)' }}>
            <Eyebrow tone="on-dark">{card.eyebrow}</Eyebrow>
            <h2 className="mt-2 flex items-center gap-3 text-h2">
              {card.title}
              <Icon
                name="arrow-right"
                className="h-6 w-6 transition-transform group-hover:translate-x-1"
              />
            </h2>
            <p className="measure mt-2 text-body text-on-dark/90">{card.copy}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
