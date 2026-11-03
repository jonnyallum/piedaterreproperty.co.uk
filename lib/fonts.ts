/**
 * Self-hosted type. next/font downloads, subsets and self-hosts these at build
 * time and injects a metric-matched fallback so headings do not reflow when the
 * web font arrives. No third-party font request is made at runtime.
 *
 * Barlow Condensed is the display face: a heavy, tall signage-style sans used
 * in capitals for headlines, labels and tiles. Manrope is the UI and body face.
 */
import { Barlow_Condensed, Manrope } from 'next/font/google'

export const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-barlow',
  fallback: ['Arial Narrow', 'Helvetica', 'Arial', 'sans-serif'],
})

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

export const fontVariables = `${barlowCondensed.variable} ${manrope.variable}`
