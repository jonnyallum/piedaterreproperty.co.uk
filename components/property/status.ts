/** Human labels and chip tones for a listing status. */
import type { PropertyStatus } from '@/lib/schemas/property'

export const STATUS_LABEL: Record<PropertyStatus, string> = {
  available: 'Available',
  under_offer: 'Under offer',
  sold_stc: 'Sold STC',
  let_agreed: 'Let agreed',
  let: 'Let',
  sold: 'Sold',
  withdrawn: 'Withdrawn',
}

type ChipTone = 'brass' | 'verdigris' | 'muted'

export const STATUS_TONE: Record<PropertyStatus, ChipTone> = {
  available: 'verdigris',
  under_offer: 'brass',
  sold_stc: 'brass',
  let_agreed: 'brass',
  let: 'muted',
  sold: 'muted',
  withdrawn: 'muted',
}

/** True when the listing has completed and is kept only as a track record. */
export function isArchivedStatus(status: PropertyStatus): boolean {
  return status === 'let' || status === 'sold' || status === 'withdrawn'
}
