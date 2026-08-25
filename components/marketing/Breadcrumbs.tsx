/**
 * Breadcrumbs. A visible trail plus matching BreadcrumbList JSON-LD. The last
 * item is the current page and is not a link. Home is always first.
 */
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbJsonLd } from '@/lib/seo'
import { Icon } from '@/components/primitives/Icon'

export interface Crumb {
  name: string
  path: string
}

interface BreadcrumbsProps {
  trail: Crumb[]
  /** On dark hero grounds, use the light tone. */
  tone?: 'ink' | 'on-dark'
}

export function Breadcrumbs({ trail, tone = 'ink' }: BreadcrumbsProps) {
  const full: Crumb[] = [{ name: 'Home', path: '/' }, ...trail]
  const color = tone === 'on-dark' ? 'text-on-dark/80' : 'text-ink-soft'
  return (
    <nav aria-label="Breadcrumb" className={color}>
      <JsonLd data={breadcrumbJsonLd(full)} />
      <ol className="flex flex-wrap items-center gap-2 text-small">
        {full.map((crumb, i) => {
          const last = i === full.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.path} className="transition-opacity hover:opacity-70">
                  {crumb.name}
                </Link>
              )}
              {!last ? (
                <Icon name="chevron-down" className="h-3.5 w-3.5 -rotate-90 opacity-60" />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
