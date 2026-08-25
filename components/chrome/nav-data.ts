/**
 * Shared navigation model, so the desktop nav, the mobile sheet and the footer
 * sitemap never drift apart. `side` drives the sales/lettings colour language.
 */
export interface NavItem {
  label: string
  href: string
  side?: 'sales' | 'lettings'
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Buying', href: '/properties', side: 'sales' },
  { label: 'Selling', href: '/sales', side: 'sales' },
  { label: 'Renting', href: '/tenants', side: 'lettings' },
  { label: 'Landlords', href: '/lettings', side: 'lettings' },
  { label: 'Areas', href: '/areas' },
  { label: 'About', href: '/about' },
]

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

export const FOOTER_NAV: FooterColumn[] = [
  {
    heading: 'Selling',
    links: [
      { label: 'Selling with us', href: '/sales' },
      { label: 'Free valuation', href: '/sales/free-valuation' },
      { label: 'How we sell', href: '/sales/how-we-sell' },
      { label: 'Sales fees', href: '/sales/fees' },
      { label: 'Why a local agent', href: '/sales/why-a-local-agent' },
    ],
  },
  {
    heading: 'Landlords',
    links: [
      { label: 'Lettings and management', href: '/lettings' },
      { label: 'Why choose us', href: '/lettings/why-choose-us' },
      { label: 'Lettings fees', href: '/lettings/fees' },
      { label: 'Landlord obligations', href: '/lettings/landlord-obligations' },
      { label: 'Rental valuation', href: '/lettings/rental-valuation' },
    ],
  },
  {
    heading: 'Tenants',
    links: [
      { label: 'Renting with us', href: '/tenants' },
      { label: 'The process', href: '/tenants/the-process' },
      { label: 'Register with us', href: '/tenants/register' },
      { label: 'Report maintenance', href: '/tenants/report-maintenance' },
      { label: 'Holding deposits', href: '/tenants/holding-deposits' },
    ],
  },
  {
    heading: 'Firm',
    links: [
      { label: 'Properties', href: '/properties' },
      { label: 'Areas we cover', href: '/areas' },
      { label: 'About us', href: '/about' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export const LEGAL_NAV = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Cookie policy', href: '/cookie-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Complaints procedure', href: '/complaints-procedure' },
]
