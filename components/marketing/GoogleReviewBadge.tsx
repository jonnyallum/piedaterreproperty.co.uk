import { Icon } from '@/components/primitives/Icon'

interface GoogleReviewBadgeProps {
  href: string
}

/** A restrained review badge that opens the business's verified Google form. */
export function GoogleReviewBadge({ href }: GoogleReviewBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="google-review-badge group"
      aria-label="Review Pied-à-Terre Property on Google"
    >
      <span className="google-review-g" aria-hidden="true">G</span>
      <span>
        <span className="block text-small font-medium text-ink-soft">Review us on</span>
        <span className="block text-body font-semibold text-ink">Google</span>
      </span>
      <span className="ml-auto text-ochre" aria-hidden="true">★★★★★</span>
      <Icon
        name="arrow-up-right"
        className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5"
      />
    </a>
  )
}
