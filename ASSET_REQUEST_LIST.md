# Asset and information request list

What the build needs from Charisma or a supplier before launch. This is the
repository copy, kept in step as prompts add items. The master list lives in the
build pack at `_reference/ASSET_REQUEST_LIST.md`.

Reviewed against the final acceptance audit on 26 August 2026 (see
`ACCEPTANCE_REPORT.md`). The audit found no new asset needs beyond the list
below: every remaining gap is one of these items or a live-only measurement
(Lighthouse, Core Web Vitals, email delivery, real-device checks) that closes at
the temporary domain and cutover per `DEPLOY.md`. The two hardest blockers for
the site doing its job are the photography and the founder portrait: until they
land, the hero and gallery are honest gradient placeholders.

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

## Photography and imagery

Source specification, so the delivered files are right first time:

- At least 2400 px on the long edge, ideally 3000 px. The pipeline never upscales,
  so a smaller file caps the quality of every page it appears on.
- The original camera file, in sRGB. Not a portal download and not a screenshot.
  An untagged file is assumed sRGB and tagged as such.
- Colour grading is best done by a retoucher on the frames that carry the site.
  The pipeline can apply a gentle warm grade on request, but it is off by default
  and will not beat a hand grade on a hero.
- GPS and device EXIF are stripped automatically, so there is no need to scrub
  files first, but do send the originals rather than pre-compressed exports.

How to add images once they arrive (the pipeline, prompt 12):

1. Drop the originals into `assets/source/` (git-ignored, never committed).
2. Describe each one in `assets/source/images.json`, keyed by filename, with a
   `key` (used in code), `alt` (mandatory, an image with no alt is not shipped),
   an optional `role`, and `treatment` set to `photo` for property and general
   imagery or `duotone` for the town and place photography.
3. Run `npm run optimise-images`. It writes the AVIF and WebP ladder and the blur
   placeholders into `public/images/` and updates the manifest.
4. Commit the generated `public/images/**` and reference each image by its `key`
   through the SiteImage component.

The images still needed:

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

## Area pages: local knowledge to confirm (prompt 07)

The five town pages are written from geographic and structural fact plus honest
qualitative market observation, with no invented statistics. Each page carries a
`[CONFIRM]` note in `content/areas/content-data.ts` for the figures we deliberately
did not publish. Nothing below blocks launch, but each one would make the page
that carries it materially stronger.

- [ ] Whether to publish indicative price and rent ranges per town, and the
      source for them. Portal averages are not an acceptable citation, so this
      needs either the firm's own achieved figures or Land Registry and ONS data
      with the date shown on the page
- [ ] Havant (PO9): achieved rent and price ranges, if any are to be published
- [ ] Portsmouth (PO1 to PO6): indicative rent ranges by property type
- [ ] Waterlooville (PO7, PO8): indicative rent ranges by bedroom count
- [ ] Emsworth (PO10): indicative price and rent ranges
- [ ] Hayling Island (PO11): indicative figures, and separately whether the firm
      will take on holiday let management or is long lets only. That question is
      asked at almost every island valuation and the page currently cannot
      answer it
- [ ] Any street, development or landmark Charisma wants named that we have not
      included, and anything we have named that she would rather we did not
- [ ] Local proof on each town page: a Google review that mentions that town by
      name. Deferred to prompt 10, which brings in the live reviews feed

## Copy requiring approval

- [ ] The founder's story on the home page and `/about`. Drafted in the house
      voice with a clearly labelled placeholder paragraph. Approve or rewrite;
      no biographical detail invented
- [ ] The five hero headline options (in a comment in `app/page.tsx`), one to
      be chosen
- [ ] Every fee figure, before it appears on a page or in print
