/**
 * Lettings content, rewritten in the new voice from the old site's Why Choose Us
 * page. The substance was strong and is kept: the marketing strategy, SLR
 * photography finished properly, the To Be Let boards, the applicant database,
 * thorough referencing, the offer to meet the tenant, and the argument that a
 * well maintained home lets faster to a better tenant who stays longer.
 *
 * Fee figures are not published until the Fees and Service Levels page is
 * recovered and confirmed (tracked in ASSET_REQUEST_LIST). Service levels show
 * what is included, not an invented number.
 */

export interface ServiceLevel {
  name: string
  summary: string
  includes: string[]
  /** Fee copy stays general until confirmed. */
  fee: string
}

export const SERVICE_LEVELS: ServiceLevel[] = [
  {
    name: 'Tenant find',
    summary: 'We find and reference the tenant and set the tenancy up. You manage it from there.',
    includes: [
      'Rental valuation and advice',
      'Professional photography and particulars',
      'A To Be Let board where possible',
      'Marketing on the major portals and to our applicant database',
      'Accompanied viewings',
      'Full referencing and right to rent checks',
      'Tenancy agreement and deposit registration',
    ],
    fee: 'Confirmed on the fees and service levels page',
  },
  {
    name: 'Rent collection',
    summary: 'Everything in tenant find, plus we collect the rent and chase any arrears.',
    includes: [
      'Everything in tenant find',
      'Monthly rent collection',
      'Arrears monitoring and chasing',
      'Rent statements',
    ],
    fee: 'Confirmed on the fees and service levels page',
  },
  {
    name: 'Fully managed',
    summary: 'We look after the property and the tenancy day to day, so you do not have to.',
    includes: [
      'Everything in rent collection',
      'Maintenance coordination',
      'Routine inspections',
      'Compliance certificates arranged and tracked',
      'Deposit protection and end of tenancy handling',
      'A single point of contact for you and the tenant',
    ],
    fee: 'Confirmed on the fees and service levels page',
  },
]

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Marketing that works for the rent, not just the advert',
    body: 'Before we market, we advise on anything that would make the property more attractive to a good tenant. It is photographed on a digital SLR and finished on industry standard software, because most tenants decide whether to view from what they see.',
  },
  {
    title: 'The distinctive To Be Let boards',
    body: 'One of our own boards goes up where possible. It attracts passing interest and helps viewers find the property, alongside considered particulars and a listing on the major portals.',
  },
  {
    title: 'A real applicant database',
    body: 'We contact applicants whose criteria match your property before it is even advertised. Since 2011 we have worked to match the right people to every home.',
  },
  {
    title: 'Referencing that actually checks',
    body: 'Every prospective tenant passes our referencing: a credit search and, where applicable, references from a former landlord or managing agent, so there is no reason to expect the rent will not be paid.',
  },
  {
    title: 'You can meet the tenant',
    body: 'We offer you the chance to meet a prospective tenant before you commit, because you should be completely satisfied that we have found the right people for your property.',
  },
  {
    title: 'Well maintained homes let better',
    body: 'A property kept in good order, with a reliable maintenance schedule, lets faster to a better tenant who is happier and stays longer. That is a steadier income for you.',
  },
]

export const WHY_CHOOSE_US_QUOTE =
  'Instead of simply advertising your property, we actively work to ensure that you achieve the highest possible rental.'

export const MANAGEMENT_DIFFERENCE = [
  'Maintenance coordinated with trusted local contractors',
  'Routine inspections, with a report to you',
  'Compliance certificates arranged and tracked so nothing lapses',
  'Rent arrears handled early and firmly',
  'Deposits protected with the Deposit Protection Scheme',
]

/** Landlord legal obligations, verified against current law. High-value SEO. */
export const LANDLORD_OBLIGATIONS = {
  reviewed: '2026-08-01',
  items: [
    {
      title: 'Gas safety',
      body: 'A Gas Safe registered engineer must check any gas appliances and flues every year, and you must give the tenant a copy of the record.',
    },
    {
      title: 'Electrical safety',
      body: 'Fixed electrical installations must be inspected and tested at least every five years by a qualified person, with a report provided to the tenant and, on request, the local authority.',
    },
    {
      title: 'Energy performance',
      body: 'A valid Energy Performance Certificate is required to market a property, and a rented home must currently meet a minimum rating of E unless a valid exemption is registered.',
    },
    {
      title: 'Smoke and carbon monoxide alarms',
      body: 'A smoke alarm is required on every storey used as living accommodation, and a carbon monoxide alarm in any room with a fixed combustion appliance. Alarms must be checked to be working at the start of a tenancy.',
    },
    {
      title: 'Deposit protection',
      body: 'A tenant’s deposit must be protected in a government approved scheme within thirty days, and the prescribed information given to the tenant within the same period.',
    },
    {
      title: 'Right to rent',
      body: 'Before a tenancy begins you must check that the tenant has the right to rent in England, and keep a record of the check.',
    },
    {
      title: 'The How to Rent guide',
      body: 'The current How to Rent guide must be given to the tenant at the start of the tenancy, as it affects your ability to serve certain notices later.',
    },
    {
      title: 'Licensing',
      body: 'Some properties need a licence, in particular houses in multiple occupation, and some areas operate selective licensing. Check with the local authority whether your property is covered.',
    },
    {
      title: 'Repairs and fitness',
      body: 'You are responsible for the structure and exterior, and for heating, hot water, gas, electrics and sanitation, and the home must be fit for human habitation throughout the tenancy.',
    },
  ],
}
