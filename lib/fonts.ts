/**
 * Self-hosted type. next/font downloads, subsets and self-hosts these at build
 * time and injects a metric-matched fallback so headings do not reflow when the
 * web font arrives. No third-party font request is made at runtime.
 *
 * Fraunces is the display face: a soft, warm serif set in sentence case for
 * headlines, labels and tiles. Manrope is the UI and body face.
 */
import { Fraunces, Manrope } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

export const fontVariables = `${fraunces.variable} ${manrope.variable}`
