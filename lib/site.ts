/**
 * Company facts, typed. The single source of truth for every factual claim on
 * the site, mirroring _reference/COMPANY_FACTS.md. Nothing on the website may
 * state a fact that is not here.
 *
 * Fields marked with a `confirm` comment are not yet verified with the client
 * and must not be published as fact until they are. They carry honest
 * placeholders of the right length and register, tracked in ASSET_REQUEST_LIST.
 */

export const SITE = {
  tradingName: 'Pied-à-Terre Property',
  legalEntity: 'Solent C Property Services Limited',
  companyNumber: '07482593',
  director: 'Charisma Marie Smith',
  directorDisplay: 'Charisma Smith',

  registeredOffice: {
    line1: 'C/O Sterling Accounting',
    line2: '9a Waterberry Drive',
    town: 'Waterlooville',
    postcode: 'PO7 7TH',
  },

  /** The trading office. Used in LocalBusiness schema, contact page and GBP. */
  office: {
    line1: 'Trafalgar House Business Centre, 233 Southampton Road',
    town: 'Portchester',
    postcode: 'PO6 4PY',
    // Portchester trading office coordinates, for the contact map.
    lat: 50.8368,
    lng: -1.1132,
  },

  phone: {
    display: '07756 869185',
    href: 'tel:+447756869185',
  },

  email: 'enquiries@piedaterreproperty.co.uk',

  // WhatsApp business number in international form, digits only.
  whatsapp: '447756869185',

  urls: {
    production: 'https://piedaterreproperty.co.uk',
    instagram: 'https://instagram.com/pied_a_terre_property',
    facebook: 'https://www.facebook.com/Pied-à-Terre-Property-208212646451645/',
    tpo: 'https://www.tpos.co.uk',
    googleBusiness: 'https://maps.app.goo.gl/vBzUW3wVUET9SGwUA',
    googleReview:
      'https://www.google.com/search?hl=en-GB&gl=uk&q=29,+Pied-%C3%A0-terre+Property,+The+Oakwood+Centre,+Downley+Rd,+Havant+PO9+2NP&ludocid=7532606762005395162&lsig=AB86z5UKehhaCpg-NhC2kJaw6xir#lrd=0x487445ae907f8d3f:0x688931f0ca0976da,3',
  },

  founded: 2011,

  /** Confirmed by the client: 8.30am to 5.30pm, Monday to Friday, closed weekends. */
  openingHours: [
    { day: 'Monday', open: '08:30', close: '17:30' },
    { day: 'Tuesday', open: '08:30', close: '17:30' },
    { day: 'Wednesday', open: '08:30', close: '17:30' },
    { day: 'Thursday', open: '08:30', close: '17:30' },
    { day: 'Friday', open: '08:30', close: '17:30' },
    { day: 'Saturday', open: null, close: null },
    { day: 'Sunday', open: null, close: null },
  ],

  accreditations: {
    tpoReference: 'D13453', // confirm: current and sales redress added
    moneyShield: true,
    dps: true,
    award: 'British Property Lettings Award, 2018 to 2019',
    // confirm: ICO registration number
    ico: '',
  },

  /**
   * The sales arm cannot advertise a live service until all three are held.
   * Until then the sales section runs in pre-launch mode.
   */
  salesReadiness: {
    hmrcAml: false, // confirm: registration number and date
    tpoSalesCode: false, // confirm
    professionalIndemnity: false, // confirm: PI extended to estate agency work
  },

  managedHomesCopy: 'around 35 managed homes',
} as const

export type OpeningHour = (typeof SITE.openingHours)[number]

/**
 * True only when the firm is licensed to trade sales. A single build-time flag,
 * NEXT_PUBLIC_SALES_LIVE, is the switch between the pre-launch and live variants
 * of the whole sales section. It must not be set to "true" until all three
 * registrations in `salesReadiness` are genuinely confirmed. Default is
 * pre-launch.
 */
export const SALES_LIVE = process.env.NEXT_PUBLIC_SALES_LIVE === 'true'

/** Years trading, computed so copy never dates. Described as "fifteen years". */
export function yearsTrading(now = new Date()): number {
  return now.getFullYear() - SITE.founded
}

export const COVERAGE = {
  primary: ['Havant', 'Portsmouth', 'Waterlooville', 'Emsworth', 'Hayling Island'],
  wider: [
    'Fareham',
    'Gosport',
    'Portchester',
    'Southsea',
    'Petersfield',
  ],
  secondary: [
    'Eastleigh',
    'Cosham',
    'Drayton',
    'Bedhampton',
    'Langstone',
    'Denmead',
    'Cowplain',
    'Lovedean',
    'Clanfield',
    'Horndean',
    'Rowlands Castle',
    'Westbourne',
    'Southbourne',
    'Bosham',
  ],
} as const

export const COVERAGE_PLACES: readonly string[] = [
  ...COVERAGE.primary,
  ...COVERAGE.wider,
  ...COVERAGE.secondary,
]

/**
 * Resolve a town supplied in a query string to the canonical spelling we cover,
 * or undefined. Used to pre-fill the valuation forms from the area page CTAs
 * (prompt 07). Deliberately an allow list: a value that arrives in a URL is
 * never echoed back into a form field unless it is a town we actually serve,
 * so the CTA cannot be used to plant arbitrary text on our own pages.
 */
export function canonicalTown(input: string | string[] | undefined): string | undefined {
  const raw = (Array.isArray(input) ? input[0] : input)?.trim().toLowerCase()
  if (!raw) return undefined
  return COVERAGE_PLACES.find((town) => town.toLowerCase() === raw)
}
