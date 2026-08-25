# piedaterreproperty.co.uk

Marketing and property website for Pied-à-Terre Property, an established,
award-winning independent lettings and management firm on the Solent coast that
is adding a residential sales department.

Built to the SOLENT BOHEMIA art direction. The design concept, palette logic,
arch motif and motion system are documented in [DESIGN_NOTES.md](DESIGN_NOTES.md).

## Stack

- Next.js 15, App Router, TypeScript strict, React Server Components by default
- Tailwind CSS v4, driven entirely from the tokens in `app/globals.css`
- Self-hosted Fraunces, Inter Tight and Martian Mono via `next/font`
- Resend for lead email, Google Places for reviews, GA4 behind cookie consent
  (wired in later prompts)
- Deployed to Vercel

## Commands

```bash
npm run dev        # local development
npm run build      # production build
npm run check      # dashes, tokens, lint, typecheck (the CI gate)
```

`npm run check` runs two project-specific guards that must always pass:

- `check:dashes` fails the build on any extended hyphen (em, en, figure dash,
  horizontal bar). House style forbids them; use a comma, colon, full stop, or
  "to" for ranges.
- `check:tokens` fails the build on any hardcoded hex or px outside the token
  layer. All colour and size values live once, in `app/globals.css`.

## Structure

```
app/            routes, layout, globals.css (the one token file), style guide
components/
  primitives/   Button, Arch, Grain, Eyebrow, Field, BrassRule, Reveal, Icon
  chrome/       Nav, Footer, MobileMenu, MobileActionBar, CookieBanner, SkipLink
  marketing/    StatsBand, SalesFeature, DualPath, HowItWorks, Marquee, Faq, ...
  lead/         HeroSearch (valuation and enquiry forms land in prompt 06)
  seo/          JsonLd
content/        typed data: areas, faqs, and later properties and reviews
lib/            site facts, tokens mirror, format, seo, analytics, fonts
scripts/        check-dashes, check-tokens
```

## Rules that apply to every file

British English. No extended hyphens, enforced by CI. No emoji, no exclamation
marks, no estate-agent inflation. UK formatting. Every factual claim traces to
`lib/site.ts` (mirroring the build pack's COMPANY_FACTS). Nothing about the
proposed sale of the business appears anywhere in this repository.

## Outstanding

The sales department runs in pre-launch mode until three registrations are
confirmed (see [ASSET_REQUEST_LIST.md](ASSET_REQUEST_LIST.md)). Real photography,
the vector logo, live property data and live Google reviews are still to come;
the build uses honest, clearly labelled placeholders in the meantime.
