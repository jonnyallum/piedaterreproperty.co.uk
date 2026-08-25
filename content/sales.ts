/**
 * Sales section content, in the house voice. No invented facts, no fee
 * percentages or registration numbers (those wait for Charisma to confirm).
 * The three pillars are the argument the whole section makes: fifteen years on
 * one patch beats a national brand or an online-only price.
 *
 * Framing rule enforced here: never imply the firm has sold houses for fifteen
 * years. It has let and managed them for fifteen years, and is now selling.
 */
import type { Faq } from './faqs'

export interface Pillar {
  title: string
  body: string
}

export const SALES_PILLARS: Pillar[] = [
  {
    title: 'We already know this patch, street by street',
    body: 'Not a region, five towns. We have valued, let, inspected and maintained homes on these roads for fifteen years. We know which streets have parking, which schools people move for, and what a buyer will actually pay.',
  },
  {
    title: 'The same people, from valuation to completion',
    body: 'No call centre, and no handing you to a progression team you have never met. The person who values your home is the person who answers when you ring in week seven.',
  },
  {
    title: 'Regulated, insured, and still here afterwards',
    body: 'A redress scheme, client money protection, and fifteen years of filed accounts. We are a local firm with an office you can walk into, not a portal listing with a phone number.',
  },
]

export interface ValuationStep {
  title: string
  body: string
}

/** What a valuation actually involves. Removes the fear of a pushy valuer. */
export const VALUATION_STEPS: ValuationStep[] = [
  {
    title: 'We visit',
    body: 'We come to the property, at a time that suits you, and look at it properly rather than glancing round for ten minutes.',
  },
  {
    title: 'We look at the evidence',
    body: 'We compare it against what has genuinely sold nearby and what is on the market now, not a hopeful figure to win the instruction.',
  },
  {
    title: 'We tell you what we think, and why',
    body: 'A realistic figure with the reasoning behind it, in plain terms, including anything worth doing first and anything that might slow a sale.',
  },
  {
    title: 'You decide',
    body: 'No pressure and no obligation. If the timing is not right, that is fine. When you are ready, you will know where we stand.',
  },
]

export interface ProcessStage {
  title: string
  body: string
}

/** The end-to-end sale process for /sales/how-we-sell. */
export const SALES_PROCESS: ProcessStage[] = [
  {
    title: 'Free market appraisal',
    body: 'We value the property against real comparable evidence and agree a marketing price and a plan with you, in writing.',
  },
  {
    title: 'Preparing the property',
    body: 'Considered photography, a floorplan and an Energy Performance Certificate arranged, so the home is presented honestly and well.',
  },
  {
    title: 'Material information, up front',
    body: 'We gather tenure, price, council tax band and the other facts a buyer is entitled to before marketing. Collecting them early prevents fall-throughs later, and it is now required by law on every listing.',
  },
  {
    title: 'Marketing',
    body: 'The major portals, a board where appropriate, our own database of applicants, and our landlords and past tenants, who are often the first buyers.',
  },
  {
    title: 'Viewings, feedback and offers',
    body: 'Accompanied viewings, honest feedback passed back to you, and every offer put to you with the context to judge it.',
  },
  {
    title: 'Checks on the buyer',
    body: 'Identity and anti-money laundering checks and proof of funds, on buyers as well as sellers. It is a legal requirement, and we make it painless.',
  },
  {
    title: 'Sale agreed to exchange',
    body: 'We manage the chain, liaise with solicitors, keep surveys moving and keep you informed, because this is the stage where sales are won or lost.',
  },
  {
    title: 'Completion, and afterwards',
    body: 'Keys handed over, and a firm you can still ring the week after. Many sellers become landlords, and many landlords become sellers.',
  },
]

export const SALES_FAQS: Faq[] = [
  {
    q: 'Have you always sold houses?',
    a: 'No, and we will not pretend otherwise. We have let and managed homes on this patch for fifteen years, and we are now adding residential sales. The local knowledge that makes us good at lettings is exactly what makes us well placed to sell.',
    group: 'Selling',
  },
  {
    q: 'What does a valuation cost, and am I tied in for booking one?',
    a: 'A valuation is free and carries no obligation at all. Booking one does not commit you to instructing us, or to selling. It is simply an honest figure and a conversation.',
    group: 'Selling',
  },
  {
    q: 'What is your fee to sell my home?',
    a: 'We publish our fee clearly rather than hiding it, which is unusual locally. The exact figure and terms are confirmed at valuation and set out in writing before you instruct, with VAT stated on every number and no hidden extras.',
    group: 'Selling',
  },
  {
    q: 'Will you value my home higher to win the instruction?',
    a: 'No. An inflated valuation wins the instruction and then costs you weeks on the market and a reduction anyway. We give you a figure we can stand behind and the evidence for it.',
    group: 'Selling',
  },
  {
    q: 'What is material information, and why do you ask for it early?',
    a: 'It is the set of facts a buyer is entitled to know: tenure, price, council tax band, and any issues such as flood risk or a right of way. The law now requires it on every listing. Gathering it at the start prevents a sale collapsing over something that could have been dealt with up front.',
    group: 'Selling',
  },
  {
    q: 'Do you handle the sale after an offer is accepted?',
    a: 'Yes, and it is where a local firm earns its fee. We chase the chain, liaise with solicitors, keep surveys moving and keep you updated, right through to completion.',
    group: 'Selling',
  },
]
