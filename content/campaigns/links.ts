/**
 * Campaign short-link registry (prompt 14 A and D). Each printed or posted asset
 * points at a short, human URL such as piedaterreproperty.co.uk/l/emsworth. The
 * /l/[campaign] route looks the slug up here, applies the UTM parameters server
 * side and redirects to the real landing page, so the printed URL stays short
 * while the lead is still attributed correctly.
 *
 * tracking.md in this folder is the human-readable mirror of this table. Keep the
 * two in step: this file is what the code uses, that file is what a person reads.
 */
export interface Campaign {
  /** The slug in /l/<slug>. Lower case, kebab, no spaces. */
  slug: string
  /** Internal landing path the slug redirects to. */
  destination: string
  utm: {
    source: string
    medium: string
    campaign: string
    content?: string
  }
  /** Plain description for the tracking table and the hit log. */
  label: string
}

export const CAMPAIGNS: Campaign[] = [
  {
    slug: 'landlords',
    destination: '/sales/landlords',
    utm: { source: 'letter', medium: 'post', campaign: 'sales-launch', content: 'warm-landlords' },
    label: 'Warm-market landlord letter and email',
  },
  {
    slug: 'sell',
    destination: '/sales/thinking-of-selling',
    utm: { source: 'leaflet', medium: 'print', campaign: 'sales-launch', content: 'general' },
    label: 'General vendor leaflet and QR code',
  },
  {
    slug: 'havant',
    destination: '/sales/thinking-of-selling',
    utm: { source: 'card', medium: 'street', campaign: 'sales-launch', content: 'havant' },
    label: 'Havant street-farming card',
  },
  {
    slug: 'emsworth',
    destination: '/sales/thinking-of-selling',
    utm: { source: 'card', medium: 'street', campaign: 'sales-launch', content: 'emsworth' },
    label: 'Emsworth street-farming card',
  },
  {
    slug: 'waterlooville',
    destination: '/sales/thinking-of-selling',
    utm: { source: 'card', medium: 'street', campaign: 'sales-launch', content: 'waterlooville' },
    label: 'Waterlooville street-farming card',
  },
  {
    slug: 'portsmouth',
    destination: '/sales/thinking-of-selling',
    utm: { source: 'card', medium: 'street', campaign: 'sales-launch', content: 'portsmouth' },
    label: 'Portsmouth street-farming card',
  },
  {
    slug: 'hayling',
    destination: '/sales/thinking-of-selling',
    utm: { source: 'card', medium: 'street', campaign: 'sales-launch', content: 'hayling-island' },
    label: 'Hayling Island street-farming card',
  },
]

/** Find a campaign by its short-link slug, if it exists. */
export function findCampaign(slug: string): Campaign | undefined {
  return CAMPAIGNS.find((c) => c.slug === slug.toLowerCase())
}
