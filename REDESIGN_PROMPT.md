# Pied-a-Terre Property UI Redesign Prompt

Use this prompt after the functional build prompts in `build/`. Those prompts remain the source of truth for facts, compliance, routes, forms, SEO and acceptance. This prompt replaces the visual direction and homepage composition where the earlier implementation became too text-led or placeholder-led.

## Role

Act as a senior brand designer and front-end engineer specialising in independent property businesses. Work directly in the existing Next.js site. Preserve the working architecture, content model, forms, legal safeguards, accessibility and analytics. The goal is not a skin. Build a visual world that could only belong to Pied-a-Terre Property on the Solent coast.

## Outcome

Create a confident, editorial, image-rich estate agency site with a recognisable brand mark, real Pied-a-Terre property photography, original coastal artwork, disciplined conversion paths and excellent mobile behaviour.

Within two seconds the visitor must understand:

1. This is an independent local property firm on the Solent coast.
2. It handles sales, lettings and management.
3. It has real history and real homes behind it.
4. The next actions are to value a home or explore properties.

## Brand idea

The central phrase is: "A foot on the ground."

Interpret Pied-a-Terre as a house-shaped arch, a point of local presence and an editorial French-coastal sensibility. The brand should feel cultivated, warm and established, not corporate, whimsical or rustic.

Use:

- A CSS-built arched doorway mark with a single sun detail and an editorial wordmark.
- Fraunces for expressive display typography and Inter Tight for disciplined body and UI type.
- Indigo and ink as the structural field; bone as the paper ground; terracotta and ochre for sales; verdigris for lettings; brass for proof and regulation.
- Arches as image frames and occasional structural devices, never on every box.
- Fine brass rules, paper grain, generous negative space and calm, weighted motion.

Do not use:

- Generic estate agency blue, stock keys, handshakes, roofline icons or for-sale-board motifs.
- Gradient-only hero sections, empty coloured placeholder boxes or anonymous icon grids.
- Glassmorphism, neon, rounded-card overload, bouncy animation or luxury cliches.
- Invented testimonials, staff portraits, property details, awards or trading claims.

## Image rules

Property evidence must come from the old Pied-a-Terre archive in `reference/old-site/site_images/`, with attribution preserved through `reference/old-site/image_manifest.csv`.

- Use real property photographs on search cards, listing pages and the homepage portfolio section.
- Keep each image mapped to its real property context. Do not shuffle attractive interiors between addresses.
- Use the original Portsmouth harbour photograph as a small place-setting image, not as a stretched hero background.
- Use the original TPO, Money Shield and British Property Awards artwork as supporting proof where the claim is already confirmed.
- Use the new Solent risograph artwork in `public/images/brand/solent-coast-risograph.png` for brand storytelling only. Never present illustration as a real listing.
- Every meaningful image needs accurate alt text. Decorative accreditation logos use empty alt text when the adjacent text already names them.

## Homepage composition

1. Navigation
   - Show the arched brand mark and Pied-a-Terre wordmark.
   - Keep the phone and valuation action easy to find.
   - Preserve a clean mobile menu and visible keyboard focus.

2. Hero
   - Use a solid indigo night field with subtle textile texture.
   - Lead with "Property, with a foot on the ground."
   - Put "Value my home" and "Explore properties" above the fold.
   - Use the original Solent artwork in a large arch and the old Portsmouth harbour photograph as a smaller labelled inset.
   - Show only concise, confirmed proof points.

3. Search
   - Keep the Sales/Lettings switch obvious.
   - Desktop search stays one compact instrument. Mobile search opens a proper full-screen sheet.
   - A mode change must alter the accent colour consistently.

4. Trust
   - Use the trading history, managed-home figure and coverage count as large proof.
   - Show real regulation and award artwork inside quiet bone cards.
   - Explain what each safeguard means instead of showing a logo wall with no context.

5. Sales feature
   - Use an ink field with one real, labelled photograph from the lettings portfolio.
   - Frame the sales launch as experience carried forward, not as an unproven claim.
   - Respect the existing `SALES_LIVE` gate.

6. Properties
   - Show three image-led cards from the real property archive.
   - Keep price, address, status and key facts visually disciplined.
   - Make the whole card clickable and preserve dye-bloom hover, image zoom and visible focus.

7. Story and areas
   - Remove all bracketed editorial placeholders from the public UI.
   - Use only known founder and company facts.
   - Make local coverage feel geographic and specific through real town names, coastal copy and the signature artwork.

8. Footer
   - Repeat the complete brand lock-up.
   - Preserve full legal identity, contact routes, opening hours, consent controls and scheme references.

## Interaction and responsive requirements

- Design and inspect at 390px, 768px and 1440px.
- All tap targets are at least 44 by 44 CSS pixels.
- All controls work by keyboard with a visible focus indicator.
- The mobile navigation and search sheet close with Escape and restore focus.
- No horizontal overflow at 200 percent zoom.
- Respect `prefers-reduced-motion`.
- Do not animate body copy or transactional data in a way that delays reading.

## Performance and integrity

- Keep the original archive outside the public bundle. Publish only files referenced by the site.
- Use Next Image with intrinsic dimensions and responsive sizes.
- Do not upscale old photographs.
- Preserve the no-index behaviour for non-production builds.
- Do not weaken security headers, schema validation, legal copy or consent handling for visual convenience.

## Required audit before handoff

1. Run type checking, linting, content/token checks and a production build.
2. Inspect the homepage, property search and one property detail page in a real browser.
3. Test navigation, the Sales/Lettings toggle, property search, mobile search sheet, property card navigation and valuation CTA.
4. Check desktop and mobile screenshots for hierarchy, image crops, logo legibility, overflow and sticky elements.
5. Run accessibility, SEO, best-practice and performance audits.
6. Record every issue found, fix all critical and major issues, then rerun the relevant checks.
7. Deliver a concise audit with what changed, what passed and any remaining content decisions that require the owner.

The finished site should feel like a small independent agency with exceptional taste and real evidence behind it: soulful surface, institutional discipline, and a clear foot on this particular ground.
