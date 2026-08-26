/**
 * CredentialCard. A credential explained, not just a logo. Prompt 08: a vendor
 * choosing between three agents is looking for exactly this, and most local sites
 * only show a badge. Each card names the scheme, says in plain English what it
 * means for the customer, and carries the reference where we hold one.
 *
 * Server component. The award mark and scheme logos are tracked in
 * ASSET_REQUEST_LIST; until they arrive the card leads with the name set in the
 * display face rather than a placeholder image, which never looks unfinished.
 */
import { Icon } from '@/components/primitives/Icon'

interface CredentialCardProps {
  name: string
  /** What the scheme is, in one line. */
  what: string
  /** What it means for the customer, in plain English. */
  meaning: string
  /** Reference or membership number, where we hold one. */
  reference?: string
  /** Shown when a claim is not yet confirmed, so nothing unverified reads as live. */
  pending?: boolean
}

export function CredentialCard({ name, what, meaning, reference, pending }: CredentialCardProps) {
  return (
    <div className="flex flex-col rounded-md border border-brass/40 bg-ground p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-well text-brass">
        <Icon name="shield" className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-h3">{name}</h3>
      <p className="mt-2 text-small font-medium text-ink">{what}</p>
      <p className="measure mt-2 text-small text-ink-soft">{meaning}</p>
      {reference ? (
        <p className="tabular mt-4 border-t border-brass/30 pt-4 text-small text-ink-soft">
          Reference {reference}
        </p>
      ) : null}
      {pending ? (
        <p className="mt-4 border-t border-brass/30 pt-4 text-small text-ink-soft">
          Being added for the sales arm, confirmed before any sales service goes live.
        </p>
      ) : null}
    </div>
  )
}
