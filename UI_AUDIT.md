# Pied-a-Terre Property: UI audit

**Audit date:** 26 August 2026
**Scope:** Home page, search/results flow, property detail, responsive navigation, search sheet, brand system, imagery, accessibility, metadata, and production checks.

## Verdict

The redesigned build is ready for stakeholder review. It now has a distinct visual identity, authentic archive photography, original brand artwork, a responsive property-led home page, and working search interactions. Production publication should wait only for the content-owner checks listed at the end of this report.

## What changed

- Introduced a recognisable arched-doorway logo and the brand idea **“A foot on the ground.”**
- Established a coherent Solent palette, editorial typography, arch motif, texture, illustration style, and image treatment.
- Rebuilt the home-page hero around a clear proposition, valuation/search actions, proof points, original artwork, and an authentic Portsmouth harbour photograph.
- Replaced empty property and editorial placeholders with real archive listing imagery and useful content.
- Added authentic archive imagery to 14 property records; Ferry Road remains intentionally image-free because its archived listing had no gallery.
- Added visible industry and award credentials using source artwork from the former site.
- Fixed the home-page reveal bug that could leave most hero content invisible.
- Fixed the location search parameter, so searches now filter the results page correctly.
- Rebuilt the mobile search sheet as a true modal with focus containment, Escape-to-close, scroll locking, and focus restoration.
- Corrected dark-theme panels, duplicate SVG IDs, small touch targets, screen-reader number announcements, and an invalid DOM attribute.

## Browser and interaction audit

Tested in the in-app Chromium browser at **1440 × 1000** and **390 × 844**.

| Area | Result |
|---|---|
| Desktop and mobile layout | Pass: no horizontal overflow |
| Header and mobile navigation | Pass: menu opens, closes with Escape, and restores focus |
| Buy/rent path toggle | Pass: state and CTA update correctly |
| Mobile property search sheet | Pass: dialog overlays the navigation, traps focus, locks scroll, and restores focus |
| Search submission | Pass: `lettings + Havant + £2,000` returned one matching property with filters preserved |
| Property-card navigation | Pass: Market Parade opened its property detail page |
| Property detail | Pass: title, lead image, and mobile layout render correctly |
| Image loading | Pass: no broken images detected on audited pages |
| Browser console | Pass: no warnings or errors on a fresh load |

## Accessibility review

The implementation was reviewed against practical WCAG 2.1 AA criteria.

- One H1 per audited page and no skipped heading levels.
- Named controls, descriptive image alternatives, landmarks, and `en-GB` document language are present.
- Keyboard focus is visible; the skip link receives a 2px high-contrast outline.
- Primary mobile controls meet the 44px touch-target target.
- Dialog focus management and Escape behaviour pass manual keyboard testing.
- No duplicate IDs or horizontal page overflow remain.
- Reduced-motion behaviour is retained by the existing motion system.

This is a code and browser audit, not a substitute for a full assistive-technology lab test with representative users.

## SEO and performance review

- Title, description, canonical URL, Open Graph title, and semantic landmarks are present.
- Local development correctly reports `noindex, nofollow`; production metadata controls should be rechecked at deployment.
- All static routes generated successfully in the production build.
- The home-page bundle remains within the project's 120 kB gzip budget; property detail remains within its 140 kB budget.
- Type checking, linting, design-token checks, heading checks, confirmation checks, and dash-style checks pass.

## Content-owner checks before publication

1. Confirm that archived property prices, availability, and descriptions are still approved for public display.
2. Approve the illustrated founder treatment, or provide a current portrait and authorised founder biography.
3. Confirm current permission and status for the Property Ombudsman, Money Shield, DPS, and British Property Awards references.
4. Recheck production indexing, analytics/consent, forms, and third-party integrations in the live environment.

## Asset provenance

Property and credential photography came from the supplied former-site capture. The Solent coastline illustration is newly generated for this redesign and contains no text, logos, people, property boards, or copied artwork.
