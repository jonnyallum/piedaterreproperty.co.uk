/**
 * Tenant content, rewritten in the new voice from the old site's Process page,
 * which was genuinely thorough. The original had a broken step sequence (it
 * jumped from step 1 to step 5); this restructures it into eight correct,
 * sequential steps and keeps both obligation lists and the move-out checklist,
 * which are strong, well-ranking content.
 *
 * Legal summaries carry a `reviewed` ISO date rendered by LegalNotice. Update it
 * whenever the content is checked against current law. Prose uses typographic
 * apostrophes (U+2019), which read better and are valid inside these strings.
 */
import type { Stage } from '@/components/marketing/ProcessTimeline'

export const TENANT_PROCESS: Stage[] = [
  {
    title: 'Before you begin',
    body: 'Decide what you can afford, how much space you need and which area suits you. Renting is quicker to arrange than buying, but it still involves time and money, so it is worth being clear on your requirements first. If you are unsure what you can afford, a government affordability calculator is a good starting point.',
  },
  {
    title: 'Finding a property and viewing',
    body: 'Set up alerts on the major portals so you hear about new homes quickly, because good properties let fast. Registering with local agents helps too, as you may be told about a property before it is advertised. When something suits, contact the agent to arrange a viewing, and offer two or three possible times, since the current tenant may still be in the property.',
  },
  {
    title: 'Applying: holding deposit and references',
    body: 'To reserve a property you provide identification and pay a holding deposit of one week’s rent. References are then obtained through a referencing agent, your current landlord or managing agent, and your employer where applicable, alongside a right to rent check and a credit check. If a guarantor is needed, the same checks apply to them.',
  },
  {
    title: 'The outcome',
    body: 'We will tell you whether your application has been successful as soon as the referencing is complete, and explain the next step either way.',
  },
  {
    title: 'Paperwork and moving in',
    body: 'If references are successful we prepare a tenancy agreement setting out your obligations and the landlord’s. Read it carefully and raise any query before signing. You pay your security deposit, which we protect with the Deposit Protection Scheme, and your first month’s rent. Just before you move in you receive an inventory and condition schedule, which protects both you and the landlord at the end of the tenancy. We strongly recommend contents insurance, as the landlord’s cover usually protects only the building.',
  },
  {
    title: 'During the tenancy',
    body: 'You will be told whether the landlord or the agent manages the property, so you know who to contact. Pay your rent on time and look after the home. The obligations on both sides are set out below.',
  },
  {
    title: 'Moving out',
    body: 'Give notice as set out in your agreement, noting that the notice period is often tied to your rent due date. We arrange a check-out appointment to inspect the property, and it is best if you can be present. Rent must be up to date, including the final month, and the security deposit cannot be used as the last month’s rent.',
  },
  {
    title: 'Getting your deposit back',
    body: 'The final condition of the property is compared against the inventory taken when you moved in, allowing for reasonable wear and tear. Where repairs, cleaning or missing items are needed, a fair deduction is agreed. Deposits are held with the Deposit Protection Scheme, which can step in if an agreement cannot be reached.',
  },
]

export const LANDLORD_DUTIES: string[] = [
  'Insure the building',
  'Pay the service charge where applicable',
  'Allow you to live undisturbed',
  'Deal with repairs and maintenance promptly',
  'Keep all services in working order',
  'Have any gas appliances checked every year',
  'Provide instructions for appliances they have supplied',
  'Provide smoke and carbon monoxide alarms, fitted in compliant positions',
  'Consider redecoration and updating over a long tenancy',
]

export const TENANT_DUTIES: string[] = [
  'Pay your council tax',
  'Pay your utility bills',
  'Pay your TV licence',
  'Keep the property in good order',
  'Report any required maintenance promptly',
  'Maintain the gardens where applicable',
  'Keep the windows clean where applicable',
  'Keep the property secure',
  'Dispose of rubbish properly',
  'Avoid unnecessary disturbance to neighbours',
  'Ventilate the property to avoid condensation and mould',
]

export const MOVE_OUT_CHECKLIST: string[] = [
  'Redirect your mail, requesting it several days in advance',
  'Take meter readings before you leave',
  'Clear excess rubbish, taking larger items to the recycling centre',
  'Leave the gardens as you found them, where applicable',
  'Return all keys to the managing agent or landlord',
  'Cancel any media and broadband services',
  'Cancel your rent standing order',
  'Leave the property clean and in its original condition, allowing for reasonable wear and tear',
]

/** Holding deposit terms, Tenant Fees Act 2019. Legally required content. */
export const HOLDING_DEPOSIT = {
  reviewed: '2026-08-01',
  amount: 'One week’s rent',
  points: [
    {
      title: 'How much it is',
      body: 'A holding deposit is capped at one week’s rent. It reserves the property while we carry out referencing, and it counts towards your first rent or deposit once the tenancy begins.',
    },
    {
      title: 'When it is refunded',
      body: 'If we decide not to proceed, or the landlord withdraws, your holding deposit is refunded in full. It is also refunded if you are not offered the tenancy for a reason within our control.',
    },
    {
      title: 'When it can be retained',
      body: 'It may be retained if you provide false or misleading information that affects the decision to let, if you fail a right to rent check, or if you withdraw or fail to take reasonable steps to enter the tenancy. We will always explain in writing.',
    },
    {
      title: 'The statutory deadline',
      body: 'Unless a longer period is agreed in writing, the deadline for entering the tenancy is fifteen days from when the holding deposit is received. Where a refund is due, it is repaid within seven days.',
    },
  ],
}

/** Tenant fees, Tenant Fees Act 2019. Legally required content. */
export const TENANT_FEES = {
  reviewed: '2026-08-01',
  permitted: [
    'Rent',
    'A refundable tenancy deposit, capped at five weeks’ rent where the annual rent is under fifty thousand pounds',
    'A refundable holding deposit, capped at one week’s rent',
    'Payments to change the tenancy when you request it, capped at fifty pounds unless the landlord’s costs are higher',
    'Payments for early termination when you request it',
    'Utilities, communication services, TV licence and council tax',
    'A default fee for late rent or a replacement key, where set out in your agreement',
  ],
  prohibited: [
    'Charges for viewings',
    'Charges for referencing or credit checks',
    'Charges for the inventory or check-out',
    'Administration or renewal fees',
    'Charges for a professional clean as a blanket condition',
  ],
}
