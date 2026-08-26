/**
 * Self-hosted type. next/font downloads, subsets and self-hosts these at build
 * time, and injects a metric-matched fallback via `adjustFontFallback` so
 * headings do not reflow when the web font arrives. No third-party font request
 * is made from the browser at runtime.
 *
 * Fraunces carries the SOFT and WONK axes for the warm, hand-cut display feel.
 * Inter Tight is the UI face. Martian Mono sets the eyebrows.
 */
import { Fraunces, Inter_Tight, Martian_Mono } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  // Variable weight is required when axes are set; the ramp uses 300 to 500.
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-inter-tight',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

export const martianMono = Martian_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-martian-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  // Only the two faces that carry the LCP heading and the body are preloaded
  // (prompt 12 D). Martian Mono sets only the small uppercase eyebrow labels, so
  // it stays out of the critical path; the metric-matched fallback next/font
  // injects makes its swap imperceptible.
  preload: false,
})

export const fontVariables = `${fraunces.variable} ${interTight.variable} ${martianMono.variable}`
