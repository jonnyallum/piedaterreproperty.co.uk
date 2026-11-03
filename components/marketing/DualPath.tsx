/**
 * DualPath. The self-select fork: two large square panes, sell on yellow and
 * let on black, each a single link with an index tab and an arrow that slides
 * on hover. A visitor picks a side in one click.
 */
import Link from 'next/link'
import { Icon } from '@/components/primitives/Icon'
import { MullionGrid } from '@/components/primitives/Mullion'

const CARDS = [
  {
    href: '/sales',
    tag: 'Vendors',
    title: 'I want to sell',
    copy: 'A local sale, handled by the same people from valuation to completion.',
    ground: 'yellow' as const,
  },
  {
    href: '/lettings',
    tag: 'Landlords',
    title: 'I want to let',
    copy: 'Fifteen years of lettings and management, and a landlord book that stays.',
    ground: 'black' as const,
  },
]

export function DualPath() {
  return (
    <MullionGrid className="sm:grid-cols-2">
      {CARDS.map((card) => (
        <Link
          href={card.href}
          key={card.href}
          className={
            'group flex min-h-64 flex-col justify-between p-6 transition-colors hover:bg-ink hover:text-on-dark md:p-8 ' +
            (card.ground === 'yellow' ? 'bg-ochre text-ink' : 'bg-night text-on-dark hover:bg-ochre hover:text-ink')
          }
        >
          <p className="eyebrow font-bold">{card.tag}</p>
          <div>
            <h2 className="flex items-center gap-3 text-h1">
              {card.title}
              <Icon
                name="arrow-right"
                className="h-8 w-8 transition-transform group-hover:translate-x-2"
              />
            </h2>
            <p className="measure mt-2 text-body opacity-90">{card.copy}</p>
          </div>
        </Link>
      ))}
    </MullionGrid>
  )
}
