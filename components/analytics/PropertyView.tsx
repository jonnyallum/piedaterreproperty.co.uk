'use client'

/**
 * Records the view stage for one property (mission T09). The property reference is
 * the listing id, never an address. Fires once per property per page view, and only
 * if the visitor has granted analytics consent (track() enforces that).
 */
import { useEffect } from 'react'
import { track } from '@/lib/analytics'

export function PropertyView({ propertyId }: { propertyId: string }) {
  useEffect(() => {
    track('property_view', { property: propertyId })
  }, [propertyId])
  return null
}
