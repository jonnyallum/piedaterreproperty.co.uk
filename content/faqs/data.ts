/**
 * The authored FAQ set (prompt 09). Validated by the loader in index.ts.
 *
 * Rules for anyone editing this file:
 * 1. Answer the question in the first sentence, then explain. Two to four short
 *    paragraphs. Never bury the answer under context.
 * 2. No fee figure, tie-in length, VAT rate or timescale commitment until it is
 *    confirmed in COMPANY_FACTS. Where an answer would need one, describe the
 *    structure of the answer instead, and never leave a [CONFIRM] marker in a
 *    rendered string: the loader fails the build if it finds one.
 * 3. Any answer touching law or regulation carries a lastReviewed date.
 * 4. British English, no extended hyphens, no emoji, no exclamation marks.
 */
import type { FaqEntry } from './schema'

const REVIEWED = '2026-08-26'

export const FAQ_DATA: FaqEntry[] = [
  // ------------------------------------------------------------- Selling
  {
    id: 'sell-valuation-cost',
    group: 'Selling',
    question: 'How much is my house worth, and is the valuation really free?',
    answer: [
      'The valuation is genuinely free and without obligation. We visit the property, look at it properly, and give you an honest figure with the reasoning behind it, whether or not you go on to instruct us.',
      'A realistic figure matters more than a flattering one. Overpricing to win an instruction wastes the crucial first few weeks a home is on the market, when interest is highest. We would rather tell you a price you can actually achieve.',
    ],
    relatedLinks: [{ label: 'Book a free valuation', href: '/sales/free-valuation' }],
  },
  {
    id: 'sell-what-happens-at-valuation',
    group: 'Selling',
    question: 'What happens at a valuation, and will I be pressured to instruct?',
    answer: [
      'No, you will not be pressured. A valuation is a conversation, not a sales pitch. We look round, ask about the property and your plans, and explain what we think it will achieve and why.',
      'You are free to take the figure away and think about it, or to get other opinions. If you decide we are the right firm, we will set out everything in writing before you commit to anything.',
    ],
    relatedLinks: [
      { label: 'How we sell', href: '/sales/how-we-sell' },
      { label: 'Book a free valuation', href: '/sales/free-valuation' },
    ],
  },
  {
    id: 'sell-how-long-to-sell',
    group: 'Selling',
    question: 'How long does it take to sell in this area?',
    answer: [
      'It depends on the property, the price and the time of year, so we will give you a realistic expectation for your specific home at the valuation rather than a general promise here.',
      'What we can say is that presentation and accurate pricing are the two things most within your control, and both have far more effect on the timescale than anything else. A well presented, sensibly priced home in our towns rarely struggles for interest.',
    ],
    relatedLinks: [{ label: 'The towns we cover', href: '/areas' }],
  },
  {
    id: 'sell-fee-and-vat',
    group: 'Selling',
    question: 'What is your fee, and is there VAT on top?',
    answer: [
      'Our fee is agreed with you in writing before you instruct us, and confirmed in your terms of business, so there are no surprises. At the valuation we will tell you the percentage, whether VAT is added, and exactly what is included for it.',
      'We are not the cheapest firm in the area and do not try to be. What the fee buys is local knowledge, proper marketing and a named person who handles your sale from start to finish.',
    ],
    relatedLinks: [{ label: 'Selling fees', href: '/sales/fees' }],
  },
  {
    id: 'sell-tie-in-period',
    group: 'Selling',
    question: 'What is a tie-in period, and how long is yours?',
    answer: [
      'A tie-in period is the minimum length of time you agree to give one agent sole rights to market your property. During it, you cannot instruct another agent without potentially owing both a fee.',
      'We keep ours fair and set it out clearly in your terms of business before you sign, along with the notice period to end the agreement. You will know exactly what you are agreeing to, in writing, before you commit.',
    ],
    relatedLinks: [{ label: 'Selling fees and terms', href: '/sales/fees' }],
  },
  {
    id: 'sell-sole-vs-multiple-agency',
    group: 'Selling',
    question: 'Sole agency or multiple agency, what is the difference?',
    answer: [
      'Sole agency means one agent has the right to sell your property, and you pay only that agent when it sells. Multiple agency means several agents compete, and whichever sells it is paid, usually at a higher fee to reflect the split risk.',
      'For most homes in our area, sole agency with an agent who knows the local market works better than spreading a property thinly across several. We are happy to explain which suits your situation at the valuation.',
    ],
    relatedLinks: [{ label: 'How we sell', href: '/sales/how-we-sell' }],
  },
  {
    id: 'sell-epc-before-marketing',
    group: 'Selling',
    question: 'Do I need an EPC before you market it, and can you arrange one?',
    answer: [
      'Yes, a valid Energy Performance Certificate must be in place, or commissioned, before a property can be marketed, and it needs to be available to buyers. If you do not already have a current one, we can arrange it for you.',
      'An EPC lasts ten years, so if the property has been sold or let in the last decade there may already be a valid certificate on the national register that we can use.',
    ],
    relatedLinks: [{ label: 'How we sell', href: '/sales/how-we-sell' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'sell-material-information',
    group: 'Selling',
    question: 'What is material information, and why do you need it before marketing?',
    answer: [
      'Material information is the set of facts a buyer needs to make an informed decision, such as the price, tenure, council tax band, and anything that could materially affect the property, like flood risk or a non-standard construction. Since National Trading Standards guidance under consumer protection law, agents must gather and disclose it up front.',
      'We collect it before marketing because leaving it to late in the process is where sales fall through. Getting it right at the start protects you as the seller and keeps the sale moving once an offer is agreed.',
    ],
    relatedLinks: [{ label: 'How we sell', href: '/sales/how-we-sell' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'sell-aml-identity-check',
    group: 'Selling',
    question: 'Why do you need to check my identity?',
    answer: [
      'We are required by anti-money laundering law to verify the identity of our clients before we act for them. This applies to every regulated estate agent, not just us, and it protects everyone in the transaction from fraud.',
      'In practice it means we will ask for photo identification and proof of address, and may use an electronic check. We handle that information carefully and in line with data protection law.',
    ],
    relatedLinks: [{ label: 'About the firm', href: '/about' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'sell-offer-to-completion',
    group: 'Selling',
    question: 'What happens between an offer being accepted and completion?',
    answer: [
      'Once you accept an offer, the property is marked as sold subject to contract and the legal process begins. Both sides instruct conveyancers, the buyer arranges their mortgage and survey, searches are carried out, and enquiries are raised and answered.',
      'When everyone is satisfied and the paperwork is ready, contracts are exchanged, which makes the sale legally binding, and a completion date is set. On completion, the money changes hands and the keys are released.',
      'You will not be handed to a separate progression team you have never met. The person who took your instruction stays with your sale through to completion.',
    ],
    relatedLinks: [{ label: 'How we sell', href: '/sales/how-we-sell' }],
  },
  {
    id: 'sell-property-we-let',
    group: 'Selling',
    question: 'Can I sell a property you currently let for me?',
    answer: [
      'Yes, and it is one of the advantages of instructing the firm that already manages it. We know the property, its condition and its history, and we can advise on whether to sell with the tenant in place as an investment or with vacant possession.',
      'If the property is tenanted, there are notice requirements and the tenant has rights that must be respected. We will handle that correctly and keep both you and the tenant properly informed.',
    ],
    relatedLinks: [
      { label: 'Selling with us', href: '/sales' },
      { label: 'Lettings and management', href: '/lettings' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    id: 'sell-change-my-mind',
    group: 'Selling',
    question: 'What if I change my mind after instructing you?',
    answer: [
      'You can withdraw your property from the market, and the terms for doing so are set out clearly in your agreement before you sign it, including any notice period and whether any costs already incurred are payable.',
      'We would always rather talk it through first. Sometimes a pause, a change of price or a fresh set of photographs is a better answer than withdrawing altogether, and we will give you honest advice either way.',
    ],
    relatedLinks: [{ label: 'Selling fees and terms', href: '/sales/fees' }],
  },

  // ------------------------------------------------------------ Lettings
  {
    id: 'let-management-fees',
    group: 'Lettings',
    question: 'What are your management fees, and what is included?',
    answer: [
      'Our fees depend on the level of service you choose, and we agree them with you in writing before you instruct us, so you know exactly what you are paying and what it covers. At the rental valuation we will set out each option and what is included in each.',
      'What is included as standard, rather than charged as an extra, is one of the most important things to compare between agents. We will be clear about it up front rather than leaving it in the small print.',
    ],
    relatedLinks: [{ label: 'Lettings fees', href: '/lettings/fees' }],
  },
  {
    id: 'let-service-levels',
    group: 'Lettings',
    question: 'What is the difference between tenant find, rent collection and fully managed?',
    answer: [
      'Tenant find means we market the property, find and reference a tenant, and set up the tenancy, then hand it over for you to manage. Rent collection adds the ongoing collection of rent and chasing of arrears. Fully managed means we handle everything, from repairs and inspections to compliance and the end of the tenancy.',
      'Which is right depends on how hands-on you want to be and how close you live to the property. We will talk you through the trade-offs honestly rather than simply pointing you at the most expensive option.',
    ],
    relatedLinks: [
      { label: 'Why choose us', href: '/lettings/why-choose-us' },
      { label: 'Lettings and management', href: '/lettings' },
    ],
  },
  {
    id: 'let-find-and-reference',
    group: 'Lettings',
    question: 'How do you find and reference tenants?',
    answer: [
      'We market the property across the major portals and to our own list of registered applicants, carry out accompanied viewings, and then reference anyone who wants to proceed before you commit to them.',
      'Referencing checks identity, right to rent, employment or income, affordability, and previous landlord references where available. A tenant who passes referencing is far more likely to pay reliably and look after the property, which is the whole point of doing it properly.',
    ],
    relatedLinks: [{ label: 'Why choose us', href: '/lettings/why-choose-us' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'let-legal-obligations',
    group: 'Lettings',
    question: 'What are my legal obligations as a landlord?',
    answer: [
      'A landlord has a wide set of legal duties, covering safety, the tenant deposit, right to rent checks, the information you must provide, and the property being fit to live in. They change from time to time, so keeping current matters.',
      'When we manage a property fully, we handle these obligations on your behalf and keep the records that prove they were met. Our landlord obligations page sets them out in more detail.',
    ],
    relatedLinks: [{ label: 'Landlord obligations', href: '/lettings/landlord-obligations' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'let-certificates',
    group: 'Lettings',
    question: 'What certificates do I need, and how often?',
    answer: [
      'The core requirements are a Gas Safety Record, renewed every year where there is gas, an Electrical Installation Condition Report, renewed at least every five years, and a valid Energy Performance Certificate, which lasts ten years. Working smoke alarms and, where relevant, carbon monoxide alarms must also be in place.',
      'The property must normally meet a minimum energy efficiency standard to be let. When we manage a property, we track these dates and arrange renewals before they lapse, so nothing is missed.',
    ],
    relatedLinks: [{ label: 'Landlord obligations', href: '/lettings/landlord-obligations' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'let-deposit-protection',
    group: 'Lettings',
    question: 'How is the deposit protected?',
    answer: [
      'By law, a tenant deposit for an assured shorthold tenancy must be protected in a government-approved scheme within 30 days of receipt, and the tenant must be given the prescribed information about where it is held. We use the Deposit Protection Scheme.',
      'Protecting the deposit correctly and on time is not optional. Failing to do so can cost a landlord a penalty of up to three times the deposit and can prevent them regaining possession, which is exactly the kind of mistake proper management avoids.',
    ],
    relatedLinks: [{ label: 'Landlord obligations', href: '/lettings/landlord-obligations' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'let-tenant-not-paying',
    group: 'Lettings',
    question: 'What happens if the tenant does not pay?',
    answer: [
      'We act quickly and methodically. Rent is monitored, and if a payment is missed we contact the tenant straight away to understand why and agree how it will be put right, because early contact resolves most cases before they become serious.',
      'If arrears build despite that, we advise you on your options, which can include a formal notice and, as a last resort, possession proceedings, all of which must follow the correct legal process. We keep you informed at every stage.',
    ],
    relatedLinks: [{ label: 'Why choose us', href: '/lettings/why-choose-us' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'let-how-quickly',
    group: 'Lettings',
    question: 'How quickly can you let my property?',
    answer: [
      'Well presented, sensibly priced homes in our towns usually attract interest quickly, but the honest answer depends on the property, the rent and the season, so we will give you a realistic expectation at the valuation.',
      'The steps that take time are the ones worth not rushing: proper referencing, the right paperwork and the required safety certificates. Getting a good tenant matters far more than getting a fast one.',
    ],
    relatedLinks: [{ label: 'Book a rental valuation', href: '/lettings/rental-valuation' }],
  },
  {
    id: 'let-landlord-insurance',
    group: 'Lettings',
    question: 'Do I need landlord insurance?',
    answer: [
      'It is not a legal requirement, but it is strongly advisable, and standard home insurance usually will not cover a let property. Landlord insurance is designed for the risks of letting, such as damage, loss of rent and property owner liability.',
      'We do not sell insurance, so this is simply our honest advice rather than a product pitch. Your mortgage lender may also require appropriate cover as a condition of a buy-to-let mortgage.',
    ],
    relatedLinks: [{ label: 'Landlord obligations', href: '/lettings/landlord-obligations' }],
  },
  {
    id: 'let-meet-tenant',
    group: 'Lettings',
    question: 'Can I meet the tenant before agreeing?',
    answer: [
      'Yes, if you would like to. Many landlords are happy to leave the selection to us once referencing is complete, but it is your property and your decision, and we will arrange an introduction if you want one.',
      'Whatever you decide, the final choice of tenant is always yours to approve. We present referenced applicants with the facts, and you say yes or no.',
    ],
    relatedLinks: [{ label: 'Lettings and management', href: '/lettings' }],
  },
  {
    id: 'let-end-of-tenancy',
    group: 'Lettings',
    question: 'What happens at the end of a tenancy?',
    answer: [
      'We carry out a check-out inspection against the inventory taken at the start, agree any fair deductions for damage beyond normal wear and tear, and return the deposit through the protection scheme. Any dispute can be referred to the scheme adjudicator.',
      'We then prepare the property for the next tenant or hand it back to you, and advise on anything worth doing to keep it letting well. If the tenant is staying on, we handle the renewal or the move to a periodic tenancy.',
    ],
    relatedLinks: [{ label: 'Why choose us', href: '/lettings/why-choose-us' }],
    lastReviewed: REVIEWED,
  },

  // ------------------------------------------------------------- Tenants
  {
    id: 'ten-how-to-register',
    group: 'Tenants',
    question: 'How do I register with you?',
    answer: [
      'Register your details with us and tell us what you are looking for, and we will contact you when something suitable comes up, often before it is widely advertised. You can register online in a couple of minutes.',
      'The more you tell us about your budget, timing and must-haves, the better we can match you, so it is worth being specific.',
    ],
    relatedLinks: [
      { label: 'Register with us', href: '/tenants/register' },
      { label: 'See available properties', href: '/properties' },
    ],
  },
  {
    id: 'ten-holding-deposit',
    group: 'Tenants',
    question: 'What is a holding deposit, and when do I get it back?',
    answer: [
      'A holding deposit reserves a property while your references are checked and the tenancy is set up. Under the Tenant Fees Act 2019 it is capped at one week of rent, and only one property can be reserved at a time.',
      'It is put towards your first rent or deposit once the tenancy goes ahead. If the landlord withdraws, or referencing fails through no fault or false information on your part, it is refunded. If you provide false information or pull out, it may be retained, and the reasons must be given to you in writing.',
    ],
    relatedLinks: [{ label: 'Holding deposits explained', href: '/tenants/holding-deposits' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-checks-on-me',
    group: 'Tenants',
    question: 'What checks will you run on me?',
    answer: [
      'We reference every tenant before a tenancy begins. That means confirming your identity and right to rent in the UK, checking your income or employment and affordability, and seeking a reference from a previous landlord where there is one.',
      'The aim is simply to confirm the tenancy is affordable and sustainable for you, which protects you as much as the landlord. We tell you what we need up front so there are no surprises.',
    ],
    relatedLinks: [{ label: 'The renting process', href: '/tenants/the-process' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-guarantor',
    group: 'Tenants',
    question: 'Do I need a guarantor?',
    answer: [
      'Not always. A guarantor is usually only needed if your income does not quite meet the affordability threshold on its own, if you are a student, or if you have limited UK rental or credit history.',
      'A guarantor agrees to cover the rent if you cannot, and will themselves be referenced. If one is needed for your application, we will tell you early rather than at the last moment.',
    ],
    relatedLinks: [{ label: 'The renting process', href: '/tenants/the-process' }],
  },
  {
    id: 'ten-pay-before-move-in',
    group: 'Tenants',
    question: 'What do I need to pay before I move in?',
    answer: [
      'Typically the first month of rent in advance and a tenancy deposit, less any holding deposit already paid, which is credited towards these. The exact amounts are confirmed to you in writing before you commit.',
      'Under the Tenant Fees Act 2019 the tenancy deposit is capped, at five weeks of rent where the annual rent is under fifty thousand pounds, and six weeks at or above that. You will not be charged fees that the Act prohibits.',
    ],
    relatedLinks: [
      { label: 'What you can be charged', href: '/tenants/tenant-fees' },
      { label: 'Holding deposits explained', href: '/tenants/holding-deposits' },
    ],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-what-can-be-charged',
    group: 'Tenants',
    question: 'What can and cannot I be charged? (Tenant Fees Act 2019)',
    answer: [
      'Since the Tenant Fees Act 2019, the payments a letting agent or landlord can charge a tenant are limited by law to a defined list. These include rent, a capped tenancy deposit, a capped holding deposit, and certain default or variation charges, such as a genuine cost for a lost key or a late payment of rent beyond a set period.',
      'Charges the Act bans include fees for viewings, referencing, inventories, renewals and general administration. If you are ever asked for a payment that is not permitted, it should not be charged. Our tenant fees page lists exactly what applies.',
    ],
    relatedLinks: [{ label: 'What you can be charged', href: '/tenants/tenant-fees' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-report-repair',
    group: 'Tenants',
    question: 'How do I report a repair, and what counts as an emergency?',
    answer: [
      'Report a repair through our maintenance form or by calling the office during opening hours, giving as much detail as you can, with photographs if that helps. For managed properties this reaches us directly so we can act on it.',
      'An emergency is anything that puts people or the property at serious risk, such as a major leak, a total loss of heating in cold weather, a gas smell or a dangerous electrical fault. For a suspected gas leak, call the National Gas Emergency line first, then tell us.',
    ],
    relatedLinks: [{ label: 'Report maintenance', href: '/tenants/report-maintenance' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-pets',
    group: 'Tenants',
    question: 'Can I keep a pet?',
    answer: [
      'It depends on the individual landlord and the property, so always ask before you move in or before bringing a pet home. Many landlords will consider a well behaved pet, particularly with a good tenant.',
      'If a pet is agreed, it is recorded in the tenancy and you remain responsible for any damage it causes. Ask us early and we will put the request to the landlord for you.',
    ],
    relatedLinks: [{ label: 'The renting process', href: '/tenants/the-process' }],
  },
  {
    id: 'ten-notice-to-leave',
    group: 'Tenants',
    question: 'How much notice do I give to leave?',
    answer: [
      'It depends on your tenancy. During a fixed term you are generally committed until it ends, unless there is a break clause. Once a tenancy has become periodic, that is, rolling month to month, a tenant normally gives at least one month of notice ending on a rent period.',
      'Check your tenancy agreement for the exact terms, and tell us as early as you can so we can plan the check-out and the return of your deposit smoothly.',
    ],
    relatedLinks: [{ label: 'The renting process', href: '/tenants/the-process' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-deposit-back',
    group: 'Tenants',
    question: 'How do I get my deposit back in full?',
    answer: [
      'Leave the property in the same condition it was in at the start, allowing for normal wear and tear, and return it clean and clear of your belongings. The inventory taken at check-in is what your check-out is compared against, so it is the reference point that matters.',
      'Your deposit is held in a government-approved scheme and is returned through it. If there is a disagreement over deductions, the scheme provides free, independent adjudication, so a fair outcome does not depend on either side simply insisting.',
    ],
    relatedLinks: [{ label: 'The renting process', href: '/tenants/the-process' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'ten-fixed-term-ends',
    group: 'Tenants',
    question: 'What happens when my fixed term ends?',
    answer: [
      'You usually have three options: sign a new fixed term, let the tenancy continue as a rolling periodic tenancy on the same terms, or give notice and move on. Nothing forces you out simply because the fixed term has ended.',
      'We will normally be in touch before the end of the term to ask what you would like to do, so you have time to decide. Whatever you choose, we will explain the notice and any changes clearly.',
    ],
    relatedLinks: [{ label: 'The renting process', href: '/tenants/the-process' }],
    lastReviewed: REVIEWED,
  },

  // ------------------------------------------------------------- General
  {
    id: 'gen-areas-covered',
    group: 'General',
    question: 'Which areas do you cover?',
    answer: [
      'We work across Portsmouth, Havant, Waterlooville, Emsworth and Hayling Island, plus places such as Portchester, Fareham, Gosport, Denmead and Petersfield.',
      'Knowing a small area properly is the whole point of an independent local agent, so we do not claim to cover the entire county. If you are just outside our patch, ask us anyway and we will tell you honestly whether we are the right firm.',
    ],
    relatedLinks: [{ label: 'The towns we cover', href: '/areas' }],
  },
  {
    id: 'gen-regulated',
    group: 'General',
    question: 'Are you regulated, and what protection do I have?',
    answer: [
      'Yes. We are members of The Property Ombudsman for independent redress, we hold client money protection, and tenant deposits are held in a government-approved scheme. These are the safeguards a properly run firm carries as standard.',
      'Together they mean your money is protected, and that if we ever got something wrong and could not resolve it with you directly, there is an independent body that can review it at no cost to you.',
    ],
    relatedLinks: [{ label: 'About the firm', href: '/about' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'gen-client-money-protection',
    group: 'General',
    question: 'What is client money protection, and do you have it?',
    answer: [
      'Client money protection is a scheme that reimburses landlords and tenants if an agent loses or misuses money held on their behalf, such as rent or deposits. It is a legal requirement for letting agents to belong to one, and we do.',
      'In plain terms, it means the rent and deposits we hold for you are covered. Ask any agent which scheme they belong to; a firm that cannot answer is one to avoid.',
    ],
    relatedLinks: [{ label: 'About the firm', href: '/about' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'gen-tpo-membership',
    group: 'General',
    question: 'What does The Property Ombudsman membership mean for me?',
    answer: [
      'It means there is an independent ombudsman you can turn to if you have a complaint we have not been able to resolve between us. Membership commits us to a code of practice, and the ombudsman can make an award that binds the firm.',
      'It is your route of appeal, and it costs you nothing to use. We would always rather put something right ourselves first, but it is right that you have somewhere independent to go if we do not.',
    ],
    relatedLinks: [{ label: 'About the firm', href: '/about' }],
    lastReviewed: REVIEWED,
  },
  {
    id: 'gen-who-will-i-deal-with',
    group: 'General',
    question: 'Who will I actually deal with?',
    answer: [
      'The same small team throughout. You are not passed between departments or handed to a call centre in another city. The person who values your property is the person who sees it through.',
      'It is the main reason people choose an established independent over a chain, and it is the part of the service we protect most carefully by keeping our book a size we can genuinely manage.',
    ],
    relatedLinks: [{ label: 'About the firm', href: '/about' }],
  },
  {
    id: 'gen-opening-hours',
    group: 'General',
    question: 'What are your opening hours?',
    answer: [
      'Our current opening hours, with a live indicator showing whether we are open right now, are on the contact page, so you can always see at a glance whether someone will answer.',
      'Outside those hours, leave a message or send a WhatsApp and we will come back to you the next working day. For a genuine emergency at a property we manage, the fastest route is always a call.',
    ],
    relatedLinks: [{ label: 'Contact us', href: '/contact' }],
  },
]
