/**
 * Self-hosted type. next/font downloads, subsets and self-hosts these at build
 * time and injects a metric-matched fallback so headings do not reflow when the
 * web font arrives. No third-party font request is made at runtime.
 *
 * Instrument Serif is the display face: tall, condensed, editorial, with a true
 * italic used for single emphasised words. Manrope is the UI and body face.
 */
import { Instrument_Serif, Manrope } from 'next/font/google'

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  fallback: ['Times New Roman', 'serif'],
})

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

export const fontVariables = `${instrumentSerif.variable} ${manrope.variable}`
