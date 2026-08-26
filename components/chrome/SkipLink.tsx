/**
 * SkipLink. The first focusable element on the page. Visually hidden until
 * focused, then jumps to the main landmark. Styled to the system, not left raw.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:rounded-sm focus-visible:bg-night focus-visible:px-4 focus-visible:py-3 focus-visible:text-on-dark"
      style={{ zIndex: 'var(--z-toast)' }}
    >
      Skip to main content
    </a>
  )
}
