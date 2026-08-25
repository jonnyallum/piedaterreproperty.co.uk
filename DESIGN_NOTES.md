# Design notes: SOLENT BOHEMIA

The one instruction that keeps this build honest, for whoever picks it up next:
**boho lives in the pigment, the texture, the arch and the motion. It never
touches the alignment, the hierarchy or the data.** Prices, floor areas, EPC
ratings and phone numbers are always disciplined, tabular, high contrast, on a
clean ground. Never decorate information.

## The concept

The colour, texture and warmth of a well-travelled coastal home, laid over a
layout system with the rigour of a private bank. Serious structure, soulful
surface. The failure mode in one direction is a craft-market site; in the other,
a beige agency template with a terracotta button bolted on. Hold the middle.

## The palette logic

A restrained set of natural dye and mineral pigments on a warm paper ground,
anchored by near-black ink. Never pure white, never pure black. Distribution
law: 60% bone and oat grounds, 25% ink and indigo, 10% terracotta and ochre, 5%
verdigris, madder, brass and sage as punctuation. One hero pigment per scene.

Semantic colour is a wayfinding system, applied consistently:

- Terracotta and ochre mean **sales**, the new arm. Warm, forward.
- Verdigris and indigo mean **lettings and management**. Cool, steady.
- Brass means **trust and credential**: awards, redress, client money.
- Madder is rare emphasis, at most once per page.

All values live once, in `app/globals.css`, as CSS custom properties. Components
never carry a raw hex or px. Two guards enforce this: `scripts/check-dashes.mjs`
and `scripts/check-tokens.mjs`, both wired into `npm run check` and CI. The typed
mirror in `lib/tokens.ts` is the only sanctioned home for palette values in
JavaScript.

## Theming

`app/globals.css` defines a fixed palette, then semantic role variables
(`--c-ground`, `--c-ink`, `--c-sales` and so on). Tailwind colour utilities are
wired to the semantic roles with `@theme inline`, so they follow the theme. Dark
mode is a built night scene, not an inversion: new pigment values, halved grain,
gradients at 60%. It applies three ways, all sharing one override block: the
system `prefers-color-scheme`, an explicit `data-theme="dark"` on the root, and a
`.theme-dark` container class for a local dark section on a light page.

## The arch

The signature form: a Georgian doorway silhouette, half-round on top, straight
sides. `border-radius: 999px 999px 8px 8px` for full arches, `200px 200px 4px
4px` for shallow. Used deliberately and repeatedly for hero and feature imagery,
featured property cards, the valuation CTA and the Areas grid. Ordinary UI keeps
a restrained 4 to 8px radius so the arch stays special. Implemented as the
`Arch` primitive and the `.arch-full` / `.arch-shallow` utilities.

## The grain

Every gradient carries a `feTurbulence` grain overlay, multiply blended, fixed,
non-interactive, at `--grain-opacity`. This single technique turns flat CSS
gradients into dyed cloth and carries the whole aesthetic. Grain halves below
640px and in dark mode via the token. Implemented as the `Grain` primitive.

## Typography

Fraunces for display, using SOFT and WONK for the hand-cut feel, weights 300 to
500 only, never 700. Inter Tight for body and UI. Martian Mono for eyebrows,
uppercase, 0.16em tracking. Fonts are self-hosted through `next/font`, which
subsets them and provides a metric-matched fallback so headings do not reflow.
Tabular numerals are mandatory on every price, floor area, date and phone number,
applied with the `.tabular` utility.

## The motion system

Motion feels like weather and tide, not a UI kit: slow, weighted, confident.
Nothing bounces, springs, spins or pops. Easing and duration are tokens
(`--ease-quill` the default, `--dur-*`). Loading is an indeterminate brass sweep,
never a spinner. Every entrance and scroll effect collapses to a near-instant
fade under `prefers-reduced-motion: reduce`, enforced globally in `globals.css`.
Content is never hidden from a no-JS visitor: the pre-hidden reveal state is
gated behind an `html.js` class set during parse.

## What must never regress

- No extended hyphens anywhere. Use a comma, a colon, a full stop, or "to".
- No emoji, no exclamation marks, no estate-agent inflation.
- One `h1` per page, correct heading order, real buttons and links, visible
  focus, full keyboard operability.
- Nothing about the proposed sale of the business appears in this repository.
