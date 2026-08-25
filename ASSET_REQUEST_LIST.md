# Asset and information request list

What the build needs from Charisma or a supplier before launch. This is the
repository copy, kept in step as prompts add items. The master list lives in the
build pack at `_reference/ASSET_REQUEST_LIST.md`.

## Blocking: the site cannot launch without these

### Business facts

- [ ] Office email address (placeholder in `lib/site.ts`, currently
      `hello@piedaterreproperty.co.uk`)
- [ ] Opening hours per day, including Saturdays (placeholder in `lib/site.ts`)
- [ ] Exact founding month, so "fifteen years" automates correctly
- [ ] ICO data protection registration number
- [ ] Confirmation that TPO reference D13453 is current, and sales redress added
- [ ] WhatsApp business number (placeholder in `lib/site.ts`)

### Sales department gate (keeps the sales section in pre-launch mode)

Set the three flags in `lib/site.ts` `salesReadiness` to true once confirmed:

- [ ] HMRC Anti-Money Laundering supervision: registration number and date
- [ ] The Property Ombudsman cover extended to the estate agency code
- [ ] Professional indemnity insurance extended to estate agency work

Plus, before any sales fee is published: sole agency commission percentage and
whether VAT is additional, tie-in and withdrawal terms, what is included as
standard, and the response-time commitment.

### Technical accounts and keys (see `.env.example`)

- [ ] GA4 measurement ID and GTM container ID (plus publish permission)
- [ ] Google Maps Platform API key, billing on, referrer restricted
- [ ] Google Place ID and Google Business Profile URL (for the reviews rail)
- [ ] Resend account and verified sending domain
- [ ] DNS access for piedaterreproperty.co.uk
- [ ] Search Console access, to export the old URL list and ranking baseline

### Old-site content not yet captured

- [ ] Fees and Service Levels, in full. Highest priority, commercially critical
- [ ] Contact page opening hours, Holding Deposits, Landlord Obligations,
      Complaints Procedure, Privacy Policy, Cookie Policy

## Photography and imagery (2400px minimum, from originals)

- [ ] Hero image: local housing stock or harbour, wide, calm, natural light.
      Currently the hero is a Harbour Dusk gradient scene, honest but awaiting
      the real photograph
- [ ] Portrait of Charisma on location, for the founder story duotone frame
      (currently a labelled gradient placeholder)
- [ ] The founder's signature, as a vector or clean scan, for the ink-script
      accent (currently set in Fraunces italic as a placeholder)
- [ ] Office exterior at 233 Southampton Road, Portchester
- [ ] Place photography for the five towns, for duotone risograph treatment
- [ ] Property photography for any live listing, full resolution
- [ ] Logo in vector, light and dark (currently a typographic wordmark)
- [ ] The British Property Lettings Award mark, vector if available

## Copy requiring approval

- [ ] The founder's story on the home page and `/about`. Drafted in the house
      voice with a clearly labelled placeholder paragraph. Approve or rewrite;
      no biographical detail invented
- [ ] The five hero headline options (in a comment in `app/page.tsx`), one to
      be chosen
- [ ] Every fee figure, before it appears on a page or in print
