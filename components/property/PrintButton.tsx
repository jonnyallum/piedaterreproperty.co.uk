'use client'

/**
 * PrintButton. Buyers print particulars, so this triggers the print sheet that
 * the detail page renders for print media. Hidden from the printout itself.
 */
import { Icon } from '@/components/primitives/Icon'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 text-small text-ink-soft underline underline-offset-4 transition-colors hover:text-ink hover:no-underline"
    >
      <Icon name="printer" className="h-4 w-4" />
      Print these particulars
    </button>
  )
}
