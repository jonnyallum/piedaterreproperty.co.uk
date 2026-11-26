# Pied-à-Terre Vision: one-week delivery brief

**Kick-off:** Monday 23 November 2026. **Demonstration target:** Sunday 29 November 2026.
**Status:** Proposed implementation. No external service is purchased, connected or deployed by this document.
**Working principle:** Build a truthful private demo first. Do not enable `NEXT_PUBLIC_SALES_LIVE` or alter `SITE.salesReadiness`.

## Product promise

A seller allows Pied-à-Terre to capture a home. The team creates a **true-to-space 360 tour** and one or more **clearly-labelled conceptual furnishing/design variants**. A prospective buyer can visit a private web page, look around each room, move by hotspot, compare the original with a design concept and open the immersive tour on a Meta Quest. The buyer can request a viewing or valuation via the existing lead service after approvals.

**The first demo is not room-scale free-roaming VR or a live mixed-reality overlay on the physical home.** It is a linked set of panoramic positions. Do not claim that AI renderings preserve exact measurements, layout or materials. A full 3D twin and spatially anchored mixed reality are separate later engineering projects.

## Decisions for week one

- **Capture:** initially one real property with owner permission, using 360 equirectangular still panoramas (2:1 aspect), or a permitted sample property. Use the same camera location, height, heading and lighting across the original and staged variants. A 360 camera and monopod/tripod are preferred; normal phone photos alone cannot produce comparable headset tours without stitching.
- **Tour playback:** Kuula Pro for linked 360 panoramas, hotspot navigation, browser embed and direct Meta Quest browser link. A dedicated Kuula tour for each visual variant keeps the first implementation reliable; duplicating tours is supported. Test a direct URL on the actual headset.
- **Staging:** Apply Design's 360 panorama staging, with a human approval checkpoint on each output. Keep architecture fixed, reject invented windows/doors, changes to dimensions, false view/lighting, unrealistic materials and mismatched furniture across adjacent viewpoints. Store original panoramas separately.
- **Site:** use existing Next.js 15 app. Put the public-facing comparison component behind a non-indexed, unlinked preview route and `VISION_DEMO_ENABLED` flag. Keep original and design-tour URLs in server env initially.
- **Media:** originals and generated images in private object storage with property-specific permissions, not in `public/` or Git. For pilot, third-party-hosted unlisted tours are suitable only once the vendor's permission and data-processing terms are reviewed.
- **Property operations:** use a dedicated private property/project record, room checklist, consent/evidence log, original/staged assets and approval status. Attach to the existing property ID only after reconciling `content/properties` model. Do not expose seller personal data in embedded URLs.
- **Enquiries:** existing `/api/lead` may be reused after confirming capture/delivery; a production lead must be stored in a durable database. The current local temp NDJSON log is not durable on Vercel. Do not imply an email failure is safely backed up by the temp file.
- **Analytics:** track view, original-vs-concept selection, VR-link click and viewing-request conversion using property ID and variant ID, never names or full addresses as analytics parameters. Respect existing consent gates.

## The experience

1. Seller/agent books a capture and signs a property photography and **virtual-staging permission** covering third-party services, access rights, reuse/retention and publication.
2. Operator walks every room, stages the property to remove private/sensitive material, records measured floor plan and takes 360 panoramas from predefined positions.
3. Operator uploads originals to restricted storage, labels room, camera location, capture date and photographer. File integrity is retained; derivatives are versioned.
4. Design operator creates named variants, e.g. Original, Coastal, Modern. Each rendered panorama is QA-checked against the actual room, especially openings, permanent fixtures, ceiling heights and continuity between positions.
5. Agent approves variant and disclosure; owner approves publishing where required.
6. Buyer receives a private link/QR. On phone/desktop: start in Original; select a named Concept; choose rooms via hotspots and compare with the original.
7. At a real viewing, agent offers a **seated or stationary** Meta Quest experience; buyer selects room viewpoints with a controller. Do not let customers walk physically in a real house while visually immersed.
8. Buyer receives a shareable, expiry-limited recap of selected designs and a viewing/enquiry CTA. No automatic marketing opt-in.

## Technology contract

```
360 camera -> verified panoramas -> private asset originals
                                -> staged panoramic derivatives
                                -> human QA and approval
                                -> Kuula original and concept tours
                                -> Next.js /vision/demo preview
                                -> Meta Quest browser VR mode
                                -> optional lead capture + analytics
```

The adapter can later swap Kuula for Matterport, 3DVista or a self-hosted WebXR viewer. Do not couple the property record directly to a provider-specific embed format.

Suggested logical model: `vision_projects`, `vision_capture_points`, `vision_variants`, `vision_media`, `vision_reviews`, `vision_sessions`. Each belongs to a property and has created/approved timestamps. Prefer private Supabase Storage and RLS for the eventual operator portal; do not create open-access buckets.

## Seven-day execution

| Date | Work | Acceptance |
| --- | --- | --- |
| Mon 23 Nov | Confirm pilot property/sample, permission, book/borrow camera and Quest; open vendor accounts; initialise demo branch | Sample and responsible operator identified; repo isolated |
| Tue 24 Nov | Capture 360 positions (entrance, lounge, kitchen, primary bedroom, other rooms), label files and ensure floor plan | Original pano set with complete coverage and no sensitive details |
| Wed 25 Nov | Build original Kuula linked tour; check browser, phone and headset | Direct tour works in Quest browser, navigates between rooms |
| Thu 26 Nov | Generate at least two staged room panoramas and quality-check | One coherent concept has clear before/after proof |
| Fri 27 Nov | Assemble staged Kuula tour; configure env and comparison page in Vercel preview | Private desktop/mobile comparison and direct VR links functional |
| Sat 28 Nov | Run end-to-end demonstration and safety, privacy, link expiry and lead tests | Test checklist signed; no unapproved listings or customer data exposed |
| Sun 29 Nov | Charisma demo and decision to expand to 2nd property | Buyer can enter tour, change room, compare variants, see disclosure and request follow-up |

**Day-seven definition of done:** one real or licensed sample property, at least four linked capture positions, original plus one furnished concept (two rooms minimum), working browser and Quest tour links, clear imagery disclosure, operator QA checklist, private unindexed preview, no sales-service launch.

## Compliance and safety gate

- The repository's `lib/site.ts` currently marks HMRC estate agency AML supervision, TPO sales code and estate-agency PI insurance as unconfirmed. Keep sales in pre-launch. Test with a consented internal sample, not an unapproved live sales instruction. Confirm photo equipment, viewing activities and immersive headset use with the broker for public liability and professional indemnity.
- Material information: originals must always be independently available. State: **'Digitally furnished concept for illustration only. The actual property, dimensions, fixtures and condition may differ. View original photographs and floor plan before deciding.'** Do not remove defects, move openings or imply improvements are supplied in the sale.
- Obtain rights for photography, staging vendor processing and publication. Strip faces, names, family photos, alarm panels, entry codes and sensitive belongings. Provide privacy notice and retention/deletion schedule.
- Headset hygiene and safety: stationary use, clear floor area, staff supervision, short comfortable sessions and a non-headset alternative.
- Do not create a public customer dashboard, shareable property URLs or automatic outbound messages until permissions, authentication and retention are tested.

## Work we intentionally avoid this week

Live spatially anchored mixed reality inside the home; free-roam 6DoF 3D reconstruction; CAD-accurate remodelling; on-the-fly AI generation while a buyer wears the headset; automatic seller ingestion and portal publishing; launch of estate agency sales before legal sign-offs.

## Branch integration checklist

- [ ] Preview env flag disabled by default; production site unchanged
- [ ] Only Kuula HTTPS tour/embed URLs allowed into iframe
- [ ] Original always identifiable and one tap from concept
- [ ] Demonstration clearly labelled and noindex
- [ ] Responsive fallback and direct Quest link
- [ ] QA on desktop, mobile and physical Quest
- [ ] `npm run check` and `npm run build` pass
- [ ] Preview tested before merge; merge and publish need an explicit launch decision
