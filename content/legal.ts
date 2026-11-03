/**
 * Legal and compliance content (prompt 13), written in the house voice and
 * grounded in COMPANY_FACTS.md. Nothing here states a fact that is not in the
 * facts file or a public statutory requirement; items the firm has not yet
 * confirmed are phrased honestly rather than invented. Each page carries a
 * `reviewed` date rendered by LegalNotice, so the content is auditable.
 *
 * Prose uses typographic apostrophes, which are valid inside these strings.
 * Extended dashes are banned by the check:dashes guard.
 */

export const LEGAL_REVIEWED = '2026-08-26'

export interface LegalSection {
  title: string
  body: string
}

/** /privacy-policy */
export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: 'Who is responsible for your data',
    body: 'The data controller is Solent C Property Services Limited, a company registered in England and Wales, company number 07482593, trading as Pied-à-Terre Property. Our registered office is C/O Sterling Accounting, 9a Waterberry Drive, Waterlooville, PO7 7TH, and our trading office is Trafalgar House Business Centre, 233 Southampton Road, Portchester, PO6 4PY. We are registered with the Information Commissioner\'s Office, and our registration number is available on request. You can reach us by phone on 07756 869185 or by email at hello@piedaterreproperty.co.uk.',
  },
  {
    title: 'What we collect and why',
    body: 'We collect only what each enquiry needs. For a valuation we ask for your name, contact details and information about the property. For a tenant registration we ask for your name, contact details, income and references. For a maintenance request we ask for your name, contact details and the details of the issue. Where the law requires it, for example for right to rent and anti-money laundering checks, we collect identity documents and, for sales, evidence of the source of funds.',
  },
  {
    title: 'The lawful basis for each purpose',
    body: 'We rely on legitimate interests to respond to an enquiry you send us, because it is in both our interests to answer you. We rely on contract to administer a tenancy you enter into with a landlord we act for. We rely on a legal obligation for right to rent checks and for anti-money laundering checks, which the law requires before we can act for you. We rely on your consent for marketing, and you can withdraw that consent at any time.',
  },
  {
    title: 'Who we share your data with',
    body: 'We share data only where a task needs it: referencing providers, the Deposit Protection Scheme, contractors carrying out maintenance, solicitors involved in a sale or tenancy, property portals where we advertise a home, the anti-money laundering checking tool, and our email provider. Each recipient is bound to use the data only for the purpose we share it for.',
  },
  {
    title: 'How long we keep your data',
    body: 'Anti-money laundering records are kept for five years after the end of the business relationship, which is the statutory period. Tenancy and landlord records are kept for six years after the end of the relationship, the period within which a contract claim could be brought. An enquiry that does not become a relationship is kept for twelve months so we can follow it up, then deleted. Marketing consent is kept until you withdraw it.',
  },
  {
    title: 'Your rights',
    body: 'You have the right to see the data we hold about you, to ask for it to be corrected, deleted or restricted, to object to processing, and to ask for a copy in a portable form. Where processing relies on your consent, you can withdraw it at any time. To exercise any of these rights, call 07756 869185, email hello@piedaterreproperty.co.uk, or write to us at our trading office.',
  },
  {
    title: 'International transfers',
    body: 'We keep your data within the United Kingdom wherever possible. Where a provider processes data outside the UK, we make sure appropriate safeguards are in place so your data has the same protection it would have here.',
  },
  {
    title: 'Complaints',
    body: 'If you are unhappy with how we handle your data, tell us first and we will put it right. You also have the right to complain to the Information Commissioner\'s Office at ico.org.uk, which is the supervisory authority for data protection in the UK.',
  },
]

/** /complaints-procedure */
export const COMPLAINT_STEPS: LegalSection[] = [
  {
    title: 'Tell us what happened',
    body: 'The quickest way to raise a complaint is by phone on 07756 869185 or by email at hello@piedaterreproperty.co.uk. You can also write to us at Trafalgar House Business Centre, 233 Southampton Road, Portchester, PO6 4PY. Please say what went wrong and what you would like us to do about it.',
  },
  {
    title: 'We acknowledge it within two working days',
    body: 'We will confirm we have your complaint and explain who is dealing with it, and how long the process will take.',
  },
  {
    title: 'We investigate and respond',
    body: 'We aim to resolve every complaint within eight weeks. Our response sets out the outcome, the reasons, and what to do if you are not satisfied. If we need longer, we will tell you why and when you can expect the final response.',
  },
  {
    title: 'Escalate to The Property Ombudsman',
    body: 'If you remain unhappy, you can refer the complaint to The Property Ombudsman (TPO), free of charge. We are a member, reference D13453. TPO can consider a complaint referred within twelve months of our final response. Contact TPO through tpos.co.uk, which explains their process and current timescales. Our lettings and management work is covered by TPO\'s codes; when our sales arm launches, the same procedure will cover the sales code.',
  },
]

/** /terms */
export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: 'Using this website',
    body: 'These terms govern your use of piedaterreproperty.co.uk. By using the site you accept them. If you do not agree with any part of them, please stop using the site.',
  },
  {
    title: 'Information only',
    body: 'The content on this site is for general information about Pied-à-Terre Property and the homes and services we offer. It is not legal, tax, investment or financial advice. Property details are provided in good faith by sellers and landlords, and you should rely on your own searches, surveys and legal advice before committing to a transaction.',
  },
  {
    title: 'Intellectual property',
    body: 'The design, text, photography and graphics on this site belong to Pied-à-Terre Property or its licensors. You may view and print pages for personal use, but you may not copy, reproduce or redistribute the content for commercial purposes without our written permission.',
  },
  {
    title: 'Acceptable use',
    body: 'You agree not to misuse the site, including attempting to gain unauthorised access, introducing malicious code, or using the site in a way that could damage or impair it. Enquiries you send must be genuine and must not be automated or misleading.',
  },
  {
    title: 'Third-party links',
    body: 'The site links to external services such as Google Maps, Instagram, Facebook and The Property Ombudsman. We do not control those sites and are not responsible for their content or their privacy practices.',
  },
  {
    title: 'Liability',
    body: 'We maintain the site with reasonable care, but we do not guarantee it will be uninterrupted or free of errors. Nothing in these terms limits liability that cannot be limited by law, including liability for death or personal injury caused by negligence or for fraud.',
  },
  {
    title: 'Changes and governing law',
    body: 'We may update these terms from time to time; the date below shows the latest review. These terms are governed by the law of England and Wales, and any dispute is subject to the exclusive jurisdiction of the courts of England and Wales.',
  },
]

/** /accessibility */
export const ACCESSIBILITY_POINTS: LegalSection[] = [
  {
    title: 'Our commitment',
    body: 'We aim to make piedaterreproperty.co.uk accessible to everyone, whatever their ability or technology. We build to the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA, which is the recognised standard for public-facing services in the UK.',
  },
  {
    title: 'What we have built in',
    body: 'Every page is operable by keyboard, with a visible focus indicator throughout. Motion effects respect the prefers-reduced-motion setting, and content can be resized to 200 per cent without loss of function. Pages have one heading structure with no skipped levels, forms have visible labels and errors announced to screen readers, and colour is never the only way information is conveyed.',
  },
  {
    title: 'Known issues',
    body: 'We are yet to run a full independent accessibility audit of the finished site; this statement will be updated when that audit completes. Photography is being produced, and when listings carry real photographs we will ensure they have meaningful alternative text.',
  },
  {
    title: 'Reporting a problem',
    body: 'If you find anything hard to use, tell us and we will fix it. Call 07756 869185, email hello@piedaterreproperty.co.uk, or write to us at Trafalgar House Business Centre, 233 Southampton Road, Portchester, PO6 4PY. We will acknowledge your report within two working days and confirm what we have done.',
  },
]

/** /material-information */
export const MATERIAL_INFORMATION_POINTS: LegalSection[] = [
  {
    title: 'What material information is',
    body: 'Material information is the set of facts a buyer needs to know before they decide whether to enquire about a home: tenure, price, council tax band, charges, utilities, parking, flood risk and any restrictions. Publishing it up front means you can rule a property in or out without a wasted viewing, and you can compare homes fairly.',
  },
  {
    title: 'Why we publish it',
    body: 'We publish material information on every sales listing as part of the National Trading Standards material information requirements, which sit alongside the Digital Markets, Competition and Consumers Act. It is provided in good faith by the seller, and we update it as facts change.',
  },
  {
    title: 'What to do with it',
    body: 'Material information is a starting point, not a substitute for your own checks. Before you commit, rely on the results of your survey, your solicitor\'s searches and your own questions to the seller. If anything on a listing looks wrong or missing, tell us and we will check it.',
  },
]
