/**
 * UK formatting helpers. British conventions only: pounds with comma
 * separators and no decimals on whole pounds, dates as "21 August 2026" in
 * prose, phone numbers spaced as written.
 */

const GBP = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

const GBP_PENCE = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** "£1,350". Whole pounds carry no decimals; pass withPence for exact figures. */
export function gbp(amount: number, withPence = false): string {
  return withPence ? GBP_PENCE.format(amount) : GBP.format(amount)
}

/** "£1,350 per calendar month" */
export function pcm(amount: number): string {
  return `${gbp(amount)} per calendar month`
}

/** "£140 per night" */
export function perNight(amount: number): string {
  return `${gbp(amount)} per night`
}

const LONG_DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/** "21 August 2026", for prose. */
export function longDate(value: Date | string): string {
  const d = typeof value === 'string' ? new Date(value) : value
  return LONG_DATE.format(d)
}

/** "21/08/2026", for tables. */
export function shortDate(value: Date | string): string {
  const d = typeof value === 'string' ? new Date(value) : value
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${d.getFullYear()}`
}

/** "2026-08-21", ISO, for datetime attributes and structured data. */
export function isoDate(value: Date | string): string {
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toISOString().slice(0, 10)
}

interface PriceLike {
  amount: number
  qualifier: 'guide' | 'offers_over' | 'oiro' | 'fixed' | 'poa'
  frequency?: 'pcm' | 'pw' | 'per_night'
}

const FREQ: Record<NonNullable<PriceLike['frequency']>, string> = {
  pcm: 'pcm',
  pw: 'per week',
  per_night: 'per night',
}

/** Format a property price with qualifier and frequency: "£1,350 pcm". */
export function formatPrice(price: PriceLike): string {
  if (price.qualifier === 'poa') return 'Price on application'
  const money = gbp(price.amount)
  const freq = price.frequency ? ` ${FREQ[price.frequency]}` : ''
  if (price.qualifier === 'guide') return `Guide price ${money}${freq}`
  if (price.qualifier === 'offers_over') return `Offers over ${money}${freq}`
  if (price.qualifier === 'oiro') return `Offers in the region of ${money}${freq}`
  return `${money}${freq}`
}

/** Floor area in both units, feet first for UK buyers: "1,076 sq ft (100 sq m)". */
export function floorArea(sqft: number): string {
  const sqm = Math.round(sqft * 0.092903)
  return `${sqft.toLocaleString('en-GB')} sq ft (${sqm.toLocaleString('en-GB')} sq m)`
}

/** Uppercase postcode with a single space, "PO6 4PY". */
export function postcode(value: string): string {
  const clean = value.toUpperCase().replace(/\s+/g, '')
  if (clean.length < 5) return value.toUpperCase()
  return `${clean.slice(0, clean.length - 3)} ${clean.slice(-3)}`
}

/** Grammatical list: ["a","b","c"] to "a, b and c". */
export function list(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

const NUMBER_WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
] as const

/** Small numbers spelled out for prose, "fifteen". Falls back to digits. */
export function inWords(n: number): string {
  return NUMBER_WORDS[n] ?? String(n)
}
