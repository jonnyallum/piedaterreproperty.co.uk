# Performance and images (prompt 12)

Measured numbers, the image pipeline, and an honest account of what still needs
real photography or a live deployment before it can be measured. Every figure
below is reproducible from this repository. Targets are in
`build/00_MASTER_BUILD_PROMPT.md` section 5 and `build/prompts/12`.

The one thing to know first: the site currently ships **no raster images**. Every
surface is type, CSS gradient, grain and inline SVG, so the home hero is a
gradient scene and the largest contentful paint is the Fraunces heading, not a
photograph. That is why the pipeline below is built and proven but the manifest
is empty: it is ready for the photography tracked in `ASSET_REQUEST_LIST.md`.

## JavaScript budget

Measured with `npm run check:budget` (which reads `.next/app-build-manifest.json`
after a build and gzips every first-load chunk with zlib at its default level).
Each chunk is a separate HTTP response compressed on its own, so the per-file
gzip sum is a faithful estimate of the bytes on the wire.

| Route | First-load JS, gzipped | Raw | Budget |
|---|---|---|---|
| `/` (home) | **110.7 kB** | 370.0 kB | under 120 kB, pass |
| `/properties/[slug]` (detail) | **117.0 kB** | 386.6 kB | under 140 kB, pass |
| `/properties` | 115.0 kB | 381.2 kB | not budgeted |
| `/sales/free-valuation` | 124.5 kB | 427.4 kB | not budgeted |
| `/lettings/rental-valuation` | 124.5 kB | 427.4 kB | not budgeted |
| `/contact` | 122.8 kB | 423.8 kB | not budgeted |
| `/faqs` | 121.7 kB | 419.2 kB | not budgeted |
| lightest content pages | around 104 kB | around 352 kB | not budgeted |

The two budgeted routes both pass. `scripts/check-budget.mjs` is wired into
`npm run verify`, so a regression on either ceiling now breaks the build rather
than shipping.

The five heaviest routes (the valuation, contact and FAQ pages) are heavier
because they run client-side form validation with Zod. The Zod chunk
(`4879-...js`, around 14 kB gzipped) rides only those five routes; the home page
does not load it. That is a deliberate, contained cost for instant, accessible
form errors, and it stays well inside the property-detail-class budget.

### Shared chunks, the pieces above 20 kB

`+ First Load JS shared by all` is around 103 kB, cached once across the whole
site. Two chunks make up almost all of it, and both are justified:

- `4bd1b696-...js`, 53.1 kB gzipped (169 kB raw): the React 19 and Next 15 App
  Router runtime. Framework, unavoidable, shared and cached across every route.
- `1255-...js`, 45.4 kB gzipped (170 kB raw): the shared application chunk, the
  code every page uses (the nav, footer, analytics consent gate, and the shared
  primitives). Shared, so it is paid for once.

No application dependency above 20 kB ships that is not one of these. There is no
moment.js, no lodash, no jQuery, no icon font, and no animation library: the ten
signature motions are CSS, the Web Animations API and IntersectionObserver.

## Other first-load weight (measured now, no images yet)

- **CSS**: one compiled stylesheet, 11.3 kB gzipped (58.3 kB raw). The whole
  token system, components layer and motion set in a single file.
- **Fonts**: self-hosted through next/font, subset to latin, WOFF2 only. The
  above-the-fold faces (Fraunces for the heading, Inter Tight for the body) are
  preloaded; Martian Mono, which sets only the small eyebrow labels, has preload
  disabled so it stays out of the critical path (prompt 12 D).
- **Largest single first-load asset on the home page**: the preloaded Fraunces
  latin subset, around 146 kB as WOFF2. Because the type ramp uses
  `font-display: swap` with a metric-matched fallback, the heading paints
  immediately in the fallback and swaps when Fraunces arrives, so this asset does
  not block the largest contentful paint. It is still the biggest lever on total
  bytes and is noted as a tuning option below.

## The image pipeline

`scripts/optimise-images.mjs` (run with `npm run optimise-images`). It reads
originals from `assets/source/` (git-ignored, see `.gitignore`) plus a sidecar
`assets/source/images.json` that gives each file its alt text and treatment, and
writes an AVIF and WebP responsive ladder into `public/images/<key>/` with a
manifest at `public/images/manifest.json`.

Every guarantee in prompt 12 B is implemented and was verified on a test image
before the test assets were removed:

- **Responsive ladder** 480, 768, 1024, 1440, 1920, 2400, and a width is skipped
  when it would exceed the source. A 3000 px source produced exactly those six
  rungs; the master is never upscaled, so a soft hero cannot be manufactured.
- **AVIF primary, WebP fallback.** On realistic content AVIF is much smaller: at
  the 2400 rung a clean test image was 8.7 kB AVIF against 25.0 kB WebP. No JPEG
  in the delivered set.
- **Per-image SSIM tuning.** AVIF quality starts at 62 and steps up only until
  mean SSIM against the source clears 0.97, so it is measured, not guessed. A
  realistic image settled at quality 62 with SSIM 0.985 on the first step; a
  pathological pure-noise image raised quality to the 82 cap and reported the
  achieved score honestly rather than pretending. The chosen quality and SSIM are
  recorded per image in the manifest.
- **Real blur placeholder.** A 16 px base64 WebP LQIP generated from the image
  itself, not a flat colour, stored as a data URL in the manifest.
- **EXIF stripped, colour profile kept.** Every output was verified to carry no
  EXIF block and no GPS, while the sRGB colour profile survives. An untagged
  source is assumed sRGB and tagged, so every delivered image is colour managed.
  Property photographs routinely embed the GPS coordinates of the home and the
  photographer's device, so this is a privacy and data control, not a nicety.
- **Manifest with intrinsic dimensions**, so `next/image` and the SiteImage
  component always have explicit width and height and layout shift stays at zero.
- **Duotone risograph** for place photography: greyscale mapped across the indigo
  to terracotta token ramp. Verified to produce the correct warm two-tone.
  Property photography stays full colour.

Verification note: `exiftool` is not on this machine, so the EXIF and GPS check
is done by reading each output back with `sharp` and asserting no EXIF block is
present. The pipeline refuses to write any output that still carries one. At
deploy, confirm independently with `exiftool -gps:all -ee public/images/**/*.avif`.

### Delivery

`components/primitives/SiteImage.tsx` renders the pre-generated ladder as a
`<picture>` with AVIF then WebP `<source>` negotiation, explicit width and
height, the blur placeholder, correct `sizes`, and `loading` and
`fetchpriority` controls. A priority image also preloads its AVIF ladder in the
document head. Until the manifest has an entry, SiteImage renders nothing and the
page shows its honest fallback, which is exactly how the site behaves today.

`lib/images.ts` is the typed reader over the manifest.

## Delivery rules audit

- **next/image everywhere** for content imagery. The property card, gallery and
  thumbnails already use it with correct `sizes` and blur.
- **One priority image per page.** Today no page has a raster LCP, so none set
  `priority` except the property gallery cover on a detail page, which is the
  detail page's LCP. When the hero photograph lands it must be the home page's
  single priority image and be preloaded (SiteImage does both).
- **Below the fold is lazy and async.** The one bare `<img>`, a Google review
  avatar, is a remote per-review URL that would not benefit from the optimiser;
  it is lazy, async, dimensioned and justified in a comment. The property lightbox
  `<img>` is justified: it needs `object-contain` across mixed aspect ratios.
- **The map is click to load.** `MapPanel` ships no map JavaScript until the
  visitor asks for it, then loads an OpenStreetMap iframe lazily. No maps key and
  no third-party script are on any initial page load.

## Rendering and caching

Static generation for everything that can be static; the property detail route
uses `generateStaticParams`. Dynamic routes (search, the valuation forms) are
server-rendered on demand. The reviews API route is cached server-side with
stale-while-revalidate (prompt 10). There is no client-side data fetching on
initial render anywhere.

## Not measured yet, and why

These need real photography or a running deployment. None is a code gap; each is
listed with how to close it.

- **Lighthouse mobile** (performance, accessibility, best practices, SEO) on the
  home, a service page, `/properties`, a detail page and an area page. Needs a
  deployed URL or a local production server plus a throttled run. The SEO and
  accessibility fundamentals (single h1, correct heading order, canonical, robots,
  landmarks, focus, contrast) are verified in the build and by `check:headings`.
- **Core Web Vitals** (LCP, CLS, INP, TBT) from a throttled mobile run. Same
  dependency. CLS is architecturally near zero: every image slot carries an
  explicit aspect box and the font swap is metric-matched.
- **Total transferred bytes per page at 390 px and 1440 px.** The JavaScript, CSS
  and font portions are measured above; the image portion is currently zero.
  Re-measure once photography lands.
- **Largest single asset per page** once images exist. The hero must stay under
  180 kB at 1x AVIF; the pipeline's SSIM tuning and ladder are built to hold that.
- **SSIM of the five largest images against their sources.** The pipeline computes
  and records SSIM per image; this table fills itself in when real images run
  through it.
- **Side-by-side crops of three delivered images against their sources.** Needs
  the delivered images.
- **No image over 1.5x its rendered size.** Needs real images to audit transfers;
  the `sizes` attributes are already written to the real layout so a phone never
  pulls a desktop rung.

## The three weakest things

1. **The headline performance case cannot be closed without photography and a
   live run.** The budget, the pipeline, the EXIF control and the delivery
   components are all proven, but Lighthouse, Core Web Vitals and the image-weight
   audits are the numbers a client will ask for, and they stay open until assets
   and a deploy exist. Everything is staged so those runs should pass first time,
   but "should" is not "measured". Close it at prompt 15.
2. **The Fraunces preload is around 146 kB**, the largest first-load asset. It
   does not block the largest contentful paint because of the swap and the
   metric-matched fallback, but it is real weight on the critical path. Trimming
   it (dropping an axis such as WONK or opsz, or cutting a static display weight
   for the hero only) would help, but it is a visual decision the design prompt
   governs, so it is flagged here rather than changed unilaterally.
3. **The warm grade and duotone are automated, and automation is the wrong
   default for good photography.** The grade is therefore off unless a sidecar
   asks for it, and the duotone is a reasonable indigo to terracotta map, but a
   retoucher will beat the script on a hero frame every time. Treat the pipeline
   output as the fast, consistent baseline, not the finished grade on the images
   that carry the site.
