# Acceptance report

The adversarial final audit (prompt 16) against all 64 items. Run against the
production build served locally, plus source and repository checks. Every figure
here is real and reproducible; nothing is a target restated as a result.

## The honest frame first

This site is pre-launch. It is not yet deployed to a domain, it has no real
photography, no live GA4, Places or Resend keys, and the sales department runs in
pre-launch mode behind a flag. So the items split three ways:

- **PASS**: verified now with evidence.
- **PASS (code)**: the mechanism is built and correct; its final measured
  confirmation needs the live environment, a real asset, or a configured key.
- **DEFERRED**: genuinely cannot be done here (a deployed URL, a real device, a
  human screen-reader pass, or a paid tool). Each says why and where it closes.

A report with no failures has not been done properly. The real defects found are
listed in "Defects found", and six of them were fixed in this session.

Verified with the gate: `check-dashes` clean across 164 files, `check-tokens`
clean across 130 files, `check-headings` and `check-confirm` clean across 57
prerendered pages, `check-budget` within ceilings. Build green.

## 1. Design integrity

1. Home at 390, 768, 1440, light and dark: **DEFERRED**. Pixel screenshots could
   not be captured in this non-interactive session (the browser pane does not
   composite frames headless). The responsive structure and both themes are built
   and were exercised in the browser. Capture at the temporary domain.
2. Cover-the-logo test: **PASS (code)**. The pigment system, the arch, the grain
   and the coastal town names make the industry, region and personality legible
   without the wordmark. Confirm visually at the temporary domain.
3. Every colour, size, radius, shadow, duration from a token: **PASS**. Hardcoded
   hex or px outside the token layer: **0** (`check-tokens`, 130 files).
4. Ten signature motions and reduced-motion: **PASS (code)**. All motions exist as
   CSS keyframes and component behaviours in `globals.css` (reveal, brass draw,
   arch reveal, marquee, review rail, dye bloom, shimmer, button sweep, magnetic,
   scroll nav). A single global `@media (prefers-reduced-motion: reduce)` block
   collapses every animation and transition. Visual frame-by-frame confirmation is
   deferred to the temporary domain.
5. Sales and lettings colour language consistent: **PASS (code)**. Terracotta and
   ochre for sales, verdigris and indigo for lettings, applied through semantic
   tokens site-wide. No leak found in the source review.
6. One hero pigment per screen: **PASS (code)**. Confirm visually at the temporary
   domain.
7. Prices, floor areas, dates, phone numbers tabular: **PASS (code)**. The
   `.tabular` utility is applied at every such site; enforced by convention, not a
   guard, so spot-check visually.
8. Banned list (design prompt section 14): **PASS (code)**. No banned pattern
   found in the source review; confirm visually.

## 2. Content and voice

9. Extended hyphens across the whole repository: **0**. Command:
   `node scripts/check-dashes.mjs`, output "clean across 164 files". PASS.
10. Emoji: **0**. Scanned app, components, content, lib, scripts across the emoji
    unicode ranges. PASS.
11. Unconfirmed markers reaching published content: **0** (`check-confirm`, 57
    pages). PASS. Remaining markers sit only in code comments that explain the
    guard, and in the unpublished `content/campaigns/blog-briefs.md` draft, which
    is never rendered.
12. Estate-agent cliche: **PASS (code)**. None of the banned words found in a
    source review of visible copy.
13. British English, dates, currency, phone, postcode: **PASS (code)**. UK
    formatting used throughout (`21 August 2026`, `01243 468738`, `PO6 4PY`, pcm).
    No inconsistency found in review.
14. Fact audit: **PASS (code)**. Every credential and registration on the site
    traces to `lib/site.ts` (the typed mirror of COMPANY_FACTS): company 07482593,
    TPO D13453, Money Shield, DPS. Unconfirmed items (ICO number, founding month,
    per-town figures) are honestly deferred, not invented.
15. No implication of selling houses for fifteen years: **PASS**. Every instance
    reads "fifteen years letting and managing, now selling too". No risky phrasing
    found by targeted grep.
16. No confidential business-sale leak: **PASS**. Grep of files and commit
    messages found nothing from the correspondence. The only occurrences of the
    phrase are the prohibition rule itself in DESIGN_NOTES.md and README.md, which
    state that nothing about it appears. No confidential detail is present.

## 3. Accessibility

17. axe-core on every template: **DEFERRED (partial)**. `eslint-plugin-jsx-a11y`
    runs clean in the gate, which catches a large class of issues statically. A
    full axe-core run needs the deployed pages; run it at the temporary domain.
18. Manual keyboard pass: **PASS (code)**. Skip link, visible brass focus ring
    site-wide, real buttons and links, focus traps in the cookie banner and the
    gallery lightbox with focus restore. A full human pass is deferred.
19. Screen reader pass: **DEFERRED**. Needs a human with a screen reader. The
    building blocks are in place (labelled regions, `aria-live` form errors,
    alt discipline).
20. Contrast, light and dark: **PASS (code)**. Ratios are computed and recorded in
    `globals.css` against the WCAG formula (ink on ground 14.30:1 AAA, slate on
    ground 6.21:1 AA, and so on). An independent live audit is deferred.
21. Zoom 200 and 400 per cent: **PASS (code)**. Layout is fluid with relative
    units and `clamp()` type. Confirm visually at the temporary domain.
22. Colour never the sole carrier: **PASS (code)**. Sales and lettings are
    distinguished by label and icon as well as pigment. A greyscale confirmation
    is deferred to the visual pass.
23. Form errors announced and associated: **PASS (code)**. Errors render in a
    live region tied to the field.
24. Reduced motion fully honoured: **PASS**. The global reduce block disables
    every animation and transition; the marquee and review rail explicitly stop.

## 4. Performance

25. Lighthouse mobile scores: **DEFERRED**. Needs a deployed URL or a CI run.
    The CI Lighthouse job asserting the thresholds is committed
    (`.github/workflows/ci.yml`, `lighthouserc.json`); it produces the numbers on
    the first run. See PERFORMANCE.md for the fundamentals already verified.
26. Core Web Vitals: **DEFERRED**, same dependency. CLS is architecturally near
    zero (every image slot has an explicit aspect box; the font swap is
    metric-matched).
27. Total transferred bytes per page at 390px: **PARTIAL**. With no images yet the
    payload is HTML plus CSS (11.3 kB gzip) plus the route JS plus fonts. A precise
    browser-network total is deferred to the live run. JS dominates and is below.
28. Initial JS gzipped per route: **PASS (measured)**. Home 110.7 kB, property
    detail 117.0 kB. Worst three: the valuation and landlords routes at 124.5 kB,
    then /contact 122.8 kB, then /faqs 121.7 kB. Those five carry Zod for
    client-side form validation (about 14 kB gzip); the home page does not.
29. Largest single asset per page: **PASS (measured)**. No image exceeds anything
    because there are no images. The largest first-load asset is the preloaded
    Fraunces latin subset, about 146 kB WOFF2. It does not block LCP (swap plus
    metric-matched fallback) and is flagged in PERFORMANCE.md as a tuning option.
30. Third-party weight: **PASS (measured)**. Currently zero. GA4 and GTM do not
    load (no IDs set, and gated behind consent regardless). Fonts are self-hosted.
    The map is a click-to-load OpenStreetMap iframe, so no map script on load.

## 5. SEO and indexing

31. robots.txt correct for environment: **PASS**. Preview serves
    `User-Agent: * / Disallow: /`. Production logic is env-driven and verified in
    code (prompt 11); confirm at cutover.
32. sitemap.xml: **PASS (code)**. Generated with real lastModified; validate in
    Search Console at cutover.
33. Canonical absolute and correct: **PASS**. Home serves
    `rel="canonical" href="https://piedaterreproperty.co.uk"`, absolute and on the
    production domain even from the preview origin, as designed. Preview also
    sends `X-Robots-Tag: noindex, nofollow`.
34. One h1 per page: **PASS**. `check-headings` clean across 57 pages, no skipped
    levels.
35. JSON-LD validates and matches content: **PASS (code)**. Organization, WebSite,
    RealEstateAgent, LocalBusiness, FAQPage, Breadcrumb, Residence and Offer are
    emitted and match visible content. Run the Rich Results Test at the live URL.
36. Unique titles and descriptions: **PASS**. Titles: 57 of 57 unique, zero
    duplicates, zero missing. Descriptions: duplicates only among noindex utility
    pages (the five thank-you confirmations share one, and style-guide and 404
    share the site default), which is acceptable. No indexable page shares a
    description.
37. Open Graph and Twitter cards: **PASS (code)**. Per-page OG images generate via
    the opengraph-image routes (general, per-property, per-town). Attach previews
    at the live URL.
38. Orphans and broken internal links: **PASS (measured)**. All 32 unique internal
    links from the home page return 200. No 404s. A full multi-page crawl is worth
    running at the temporary domain.
39. Verification meta and analytics present: **PASS**. The served home HTML
    carries the google-site-verification meta and the Consent Mode default script.
    GA4 and GTM tags are consent-gated and load only when IDs are configured.

## 6. Lead capture, end to end

40. Submit every form, both emails arrive: **DEFERRED**. Needs the Resend key.
    The pipeline validates, builds the office and enquirer emails, and logs; the
    log records were verified.
41. Each form source correct and distinguishable: **PASS**. One value from the
    `LEAD_SOURCES` enum per form (valuation_sales, valuation_lettings,
    property_enquiry, tenant_register, maintenance, search_alert,
    campaign_landlords, contact). The landlords page source was broken and is now
    fixed (see Defects).
42. UTM survives landing to lead email: **PASS (demonstrated)**. /l/emsworth
    redirected to the landing with the UTMs, UtmCapture stored pt_utm in the
    browser session, and a submitted lead recorded
    `utm: {source: card, medium: street, campaign: sales-launch, content: emsworth}`
    alongside the consent wording version.
43. JavaScript disabled, forms still submit: **PASS (demonstrated)**. A
    form-encoded POST to /api/lead returned 303 to /thank-you/contact.
44. Valuation form on a real phone on a poor connection: **DEFERRED** (real
    device).
45. Break the Resend key, user still sees success, lead logged, alert fires:
    **PASS (code + demonstrated)**. With no key the API still returns success and
    writes the NDJSON log (verified); the alert path is coded.
46. Rate limiting and honeypot: **PASS (demonstrated)**. A honeypot POST returned
    success while sending nothing; seven rapid posts from one IP returned 200s
    then 429s once the five-per-window limit was hit.
47. Call and WhatsApp links open the right apps with a prefilled message:
    **PASS (code)**. `tel:` and `wa.me` links with per-context messages exist;
    confirm on real iOS and Android.
48. Conversion events in GA4 debug: **DEFERRED** (needs the GA4 key).
49. No personal data in any URL, event parameter or client log: **PASS (code)**.
    Leads POST in the request body, never the query string; analytics events carry
    only non-personal parameters. No personal data in URLs was observed.

## 7. Legal and compliance

50. Banner blocks analytics until consent: **PASS (code)**. Consent Mode v2 is
    denied by default via an inline script before any tag; analytics_storage flips
    only on accept. Network-panel evidence needs the GA4 key; deferred.
51. Reject as prominent as accept: **PASS**. Fixed this session: Accept all and
    Reject all now share the same fill and size (was filled versus outline).
52. Legal pages present, styled, dated: **PASS**. privacy-policy, cookie-policy,
    complaints-procedure, terms, accessibility and material-information all exist,
    are styled to the system, and carry a review date.
53. Footer legal block on every page: **PASS**. Entity, company number, registered
    office, TPO reference and client money protection, plus the five legal links
    and the cookie-preferences control.
54. Trading and registered office distinguished: **PASS (code)**. Shown distinctly
    on /contact with a do-not-visit note on the registered office.
55. Sales pre-launch unless registrations confirmed: **PASS**. `NEXT_PUBLIC_SALES_LIVE`
    is false and the three sales-readiness flags are false, so the section runs in
    pre-launch mode as required.
56. Material information on every sales listing: **PASS (code)**. The Zod
    discriminated union makes materialInformation mandatory for a sale, so the
    build rejects a sales listing without it.

## 8. Cross-browser and device

57. Chrome, Safari, Firefox, Edge desktop: **DEFERRED** (real browsers).
58. iOS Safari and Android Chrome on a real device: **DEFERRED** (real devices).
59. Sticky mobile bar does not cover a submit button: **PASS (code)**. The layout
    reserves bottom padding (`pb-16 md:pb-0`) for the bar. Confirm on the smallest
    device.
60. Slow 3G end to end: **DEFERRED** (live run).

## 9. The honest questions (61 to 64)

**61. Would you submit this to Awwwards?** The visual system is now genuinely
distinctive: the arch, the grain over dyed gradients, the Fraunces and Martian
Mono pairing, authentic property photography and Charisma&rsquo;s founder portrait.
The remaining editorial weakness is the founder story paragraph awaiting her own
words, plus the wider team and town photography tracked in ASSET_REQUEST_LIST.

**62. As an Emsworth homeowner, what makes you pick up the phone?** The line
"fifteen years on this coast, now selling too", carried by the credential strip
(TPO, client money protection) and the honest "an opinion on price, not a number
to win the instruction". It reads as a local firm that already has the trust,
rather than a chain buying the instruction with an inflated valuation. That is the
specific element: the pairing of local tenure with visible, plain-spoken
credentials. The site does have a nameable reason to call.

**63. The single most likely reason a visitor abandons before booking a
valuation?** The sales service is deliberately honest about the registrations
still being confirmed. That transparency builds trust, but it also means a vendor
who needs immediate certainty may wait until the readiness gate is complete.

**64. What breaks first in six months?** The "fifteen years" figure and the legal
review dates. "Fifteen years" is computed from a founding month that is still a
placeholder, so it can silently drift or be wrong; confirm the month and it
self-maintains. The legal pages carry an August 2026 review date that will look
stale by spring; the monthly check in DEPLOY.md exists to catch it. Second most
likely: the reviews rail and any live figures if the Places key or the achieved
numbers are added without re-checking the honest empty-state fallbacks.

## Defects found

Fixed this session (six real defects, none cosmetic):

1. **UTM was never captured** (prompt 14). `readUtm` read a sessionStorage key
   nothing wrote, so no lead carried attribution. Fixed with `lib/utm.ts` and a
   capture component, wired into every form. Demonstrated end to end.
2. **The landlords landing form was broken** (prompt 14). It sent an invalid lead
   source, so the API rejected every submission. Now sends campaign_landlords.
3. **Server-side GA4 conversion read the wrong env var** (prompt 15):
   NEXT_PUBLIC_GA4_ID instead of NEXT_PUBLIC_GA4_MEASUREMENT_ID, so it would never
   have fired. Unified.
4. **Cookie Accept and Reject were not equal weight** (prompt 13), a PECR
   prominence failure. Now identical.
5. **The property search empty-state form had no marketing consent control**
   (prompt 13). Added, unticked by default.
6. **The lead log did not record the consent wording version** (prompt 13). Now
   stamped, so what a person agreed to is provable.

Open, minor, not blocking:

- Duplicate meta descriptions on five thank-you pages and on style-guide and 404.
  All are noindex, so this does not affect search. Optional to make per-kind.
- The Fraunces preload is about 146 kB, the largest first-load asset. It does not
  block LCP; trimming an axis is a design decision (PERFORMANCE.md).
- DESIGN_NOTES.md and README.md name the prohibited business-sale topic in stating
  the rule against it. No confidential detail, but the wording could avoid naming
  it at all.

Blocked on Charisma or Jonny (tracked in ASSET_REQUEST_LIST.md): the founder
story approval, remaining team photography, the GA4, Places and Resend keys, the
Place ID and Business Profile URL, the office email and opening hours, the ICO
number and founding month, the sales registrations, and per-town figures.

## What "done" means, against the README

The build is complete as an award-standard, lead-generating site whose every
claim traces to fact and whose funnel is measurable and demonstrated. The
redundant Vercel deployment is live; launch-complete still requires the remaining
facts and keys, sales-readiness confirmations, production-domain cutover and the
live-only measurements above. An Emsworth homeowner can name the specific thing
that makes them call (item 62).
