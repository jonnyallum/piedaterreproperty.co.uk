'use client'

/**
 * Captures utm_* query parameters into sessionStorage on landing (prompt 14 D),
 * so campaign attribution survives across the visit and attaches to any lead the
 * visitor submits. Rendered once in the root layout; renders nothing.
 */
import { useEffect } from 'react'
import { captureUtm } from '@/lib/utm'

export function UtmCapture() {
  // Runs on the initial full page load, which is when a campaign link lands with
  // its utm_* parameters. Internal client navigation keeps the captured set.
  useEffect(() => {
    captureUtm()
  }, [])
  return null
}
