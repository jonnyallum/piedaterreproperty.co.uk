/**
 * FAQ content. Written truthfully in the house voice, no invented facts or
 * figures. Fee specifics are deliberately left general until Charisma confirms
 * the sales commission and tie-in terms (see ASSET_REQUEST_LIST); a question
 * that would need an unconfirmed number says so plainly rather than guessing.
 *
 * Prompt 09 expands this to the full grouped set with FAQPage schema. The home
 * page shows the four highest-intent questions marked `home`.
 */
export interface Faq {
  q: string
  a: string
  group: 'Selling' | 'Lettings' | 'Tenants' | 'General'
  home?: boolean
}

export const FAQS: Faq[] = [
  {
    q: 'How much does a valuation cost?',
    a: 'Nothing. A valuation of your home for sale or to let is free and without obligation. We come out, look properly, and give you an honest figure with the reasoning behind it.',
    group: 'General',
    home: true,
  },
  {
    q: 'Do you cover my area?',
    a: 'We work across Portsmouth, Havant, Waterlooville, Emsworth and Hayling Island, plus the towns and villages between the coast and the South Downs.',
    group: 'General',
    home: true,
  },
  {
    q: 'Will I deal with the same people throughout?',
    a: 'Yes. You are not passed between departments or call centres. The person who values your property is the person you deal with through to completion or to a tenant moving in.',
    group: 'General',
    home: true,
  },
  {
    q: 'Are you regulated, and is my money protected?',
    a: 'We are members of The Property Ombudsman for redress, and client money is protected under a recognised client money protection scheme. Tenant deposits are held in a government-approved scheme. These are not optional extras; they are how a firm should be run.',
    group: 'General',
    home: true,
  },
  {
    q: 'How quickly can you get my property on the market?',
    a: 'Once we have your instruction, the paperwork required by law, and photography arranged, we can usually list within a few days. We will give you a realistic date at the valuation rather than an optimistic one.',
    group: 'Selling',
  },
  {
    q: 'What happens at the end of a tenancy?',
    a: 'We carry out a check-out against the inventory, agree any deductions fairly, return the deposit through the protection scheme, and prepare the property for the next tenant or for its return to you.',
    group: 'Lettings',
  },
]

export const HOME_FAQS = FAQS.filter((f) => f.home)
