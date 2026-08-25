/**
 * The five primary towns. Slug, display name and one line of genuine local
 * detail, geographic and true, no invented market statistics. Prompt 07 builds
 * the full /areas/[town] pages from this same data, extended with Charisma's
 * local knowledge once supplied.
 */
export interface Area {
  slug: string
  name: string
  /** One honest line for the home grid and area hub card. */
  blurb: string
}

export const AREAS: Area[] = [
  {
    slug: 'havant',
    name: 'Havant',
    blurb:
      'A market town at the top of Langstone Harbour, well connected by rail and close to the water at Langstone and Hayling.',
  },
  {
    slug: 'portsmouth',
    name: 'Portsmouth',
    blurb:
      'A dense island city of Victorian terraces and harbour-side apartments, from Southsea seafront to Old Portsmouth.',
  },
  {
    slug: 'waterlooville',
    name: 'Waterlooville',
    blurb:
      'An inland town north of Portsmouth with post-war and newer housing, popular with families for space and schools.',
  },
  {
    slug: 'emsworth',
    name: 'Emsworth',
    blurb:
      'A tidal harbour village on the Hampshire and Sussex border, Georgian brick, the mill ponds and a working quay.',
  },
  {
    slug: 'hayling-island',
    name: 'Hayling Island',
    blurb:
      'A coastal island of shingle beaches, sailing clubs and bungalows, reached by the bridge from Langstone.',
  },
]

export function areaBySlug(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug)
}
