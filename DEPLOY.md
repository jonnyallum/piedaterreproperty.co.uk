# Deploy and domain cutover

The runbook for taking piedaterreproperty.co.uk live. Two phases: a temporary
Vercel domain for review, then a clean cutover to the real domain with no lost
rankings and no duplicate indexing.

## What is in code, and what is a person's job

Built and committed in this repository:

- The 301 redirect map from the old Wix URLs, in `next.config.mjs` `redirects()`.
- Trailing-slash normalisation (`trailingSlash: false`).
- The env-driven indexing posture: preview is noindex, production is indexable,
  and a production build refuses to run unless indexing is explicitly allowed.
- CI in `.github/workflows/ci.yml`: the full gate plus Lighthouse thresholds.

A person with the accounts and access does the rest, because it is outward
facing and cannot be undone by a code change: the Vercel deploy, the DNS records,
Search Console, and the Google Business Profile. Those steps are below.

## Prerequisites, still needed

Tracked in ASSET_REQUEST_LIST.md. None is a code gap.

- A GitHub remote for this repository and push access, then branch protection on
  `main`.
- A Vercel account with the project connected to the repository.
- DNS access for piedaterreproperty.co.uk at the registrar.
- The real values for the environment variables below.

## Environment variables

Set these in the Vercel project, not in the repository. Names are exactly what
the code reads.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production canonical origin, `https://piedaterreproperty.co.uk`. Stays on the real domain from day one so canonicals never point at the temporary domain. |
| `NEXT_PUBLIC_SITE_ENV` | `preview` or `production`. This is what controls indexing. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` only in production. The build refuses `production` unless this is `true`. |
| `NEXT_PUBLIC_SALES_LIVE` | `false` until the sales registrations are confirmed. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 tag. Gated behind cookie consent. |
| `NEXT_PUBLIC_GTM_CONTAINER_ID` | GTM container, if used. |
| `GA4_API_SECRET` | Server-side Measurement Protocol secret for the lead conversion. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp business number. |
| `RESEND_API_KEY` | Transactional email. |
| `LEAD_FROM_EMAIL` | Verified sending address. |
| `LEAD_NOTIFICATION_EMAIL` | Office inbox for lead notifications. |
| `GOOGLE_PLACES_API_KEY` | Reviews, server only. |
| `GOOGLE_PLACE_ID` | The business Place ID. |
| `REVIEWS_REVALIDATE_SECRET` | Shared secret for on-demand review refresh. |

## Phase one: the temporary domain

1. Connect the repository to Vercel and deploy. Use the default `.vercel.app`
   domain, or `new.piedaterreproperty.co.uk` if the DNS is available.
2. Set `NEXT_PUBLIC_SITE_ENV=preview` (the default). This serves
   `robots.txt` as disallow-all and sends an `X-Robots-Tag: noindex, nofollow`
   header on every response, so the temporary domain cannot be indexed even via a
   link from elsewhere. Verify both before sharing:

   ```
   curl -s https://<temp-domain>/robots.txt
   curl -sI https://<temp-domain>/ | grep -i x-robots-tag
   ```

   Expect `Disallow: /` and `X-Robots-Tag: noindex, nofollow`.
3. Enable Vercel deployment protection if the review should be private.
4. Keep GA4 off on preview, or point it at a separate property, so review traffic
   does not pollute the baseline.
5. Share the URL with Charisma. Collect feedback against the prompt 16 acceptance
   checklist, not as loose notes.

## Redirects

### In code (already done)

`next.config.mjs` `redirects()` maps every old Wix URL to its new equivalent with
a permanent 301, each a single hop to a live page:

| Old | New |
|---|---|
| `/home` | `/` |
| `/the-process` | `/tenants/the-process` |
| `/registerwithus` | `/tenants/register` |
| `/report-maintenance-issue` | `/tenants/report-maintenance` |
| `/holdingdeposits` | `/tenants/holding-deposits` |
| `/whychooseus` | `/lettings/why-choose-us` |
| `/obligations` | `/lettings/landlord-obligations` |
| `/portfolio` | `/lettings` |
| `/feesandservicelevels` | `/lettings/fees` |
| `/contactus` | `/contact` |
| `/services` | `/lettings` |
| `/cookies` | `/cookie-policy` |

`/`, `/privacy-policy` and `/complaints-procedure` are unchanged, so they resolve
directly and need no redirect. Add any extra URLs found in the Search Console
export to the `map` array before cutover.

### At the Vercel domain (a setting, not code)

These are host-level and are set on the Vercel project so they never chain in
front of the path redirects above:

- www to apex: set `piedaterreproperty.co.uk` as the primary domain and add
  `www.piedaterreproperty.co.uk` as a redirect to it. Vercel issues the 308.
- http to https: Vercel enforces this automatically on a custom domain.

### Uppercase paths (optional)

The old URLs are all lower case, so this is only for mistyped links. If wanted,
add a small `middleware.ts` that 308-redirects a path containing an uppercase
letter to its lower-case form, excluding `/_next`, `/api` and files with an
extension. Left out by default to keep an edge function off every request.

## Before cutover: capture the old site

Once DNS moves, the old Wix content is gone. Before switching anything:

1. Finish capturing the old site, including every image, with
   `PIEDATERRE_BROWSER_SCRAPE_PROMPT.md`. The partial dump is `website_dump.txt`.
2. Export the old URL list from Search Console (Pages report) and the old
   sitemap, and add any trafficked URL missing from the map above.
3. Record the ranking and traffic baseline: Search Console impressions, clicks
   and average position by query and by page for the last 16 months.
4. Note the current Google Business Profile state, so the website link and
   category can be updated at cutover, not forgotten.

## Cutover, step by step

1. Confirm every prompt 16 acceptance criterion passes on the temporary domain.
2. At least 24 hours ahead, lower the TTL on the existing DNS records to 300
   seconds, so a rollback is fast. Record the current records first (see
   Rollback).
3. Add `piedaterreproperty.co.uk` and `www.piedaterreproperty.co.uk` to the
   Vercel project.
4. Add the Search Console DNS TXT record
   `google-site-verification=BpT8hQ4na5JN9XjBUw5POfEjtjL-DGcQWznTFk_Z5-w` so the
   domain property is verified and ready.
5. Set `NEXT_PUBLIC_SITE_ENV=production` and `NEXT_PUBLIC_ALLOW_INDEXING=true`,
   then redeploy. Confirm `robots.txt` now allows and the noindex header is gone.
6. Point the DNS at Vercel. Confirm the SSL certificate issues.
7. Run the post-cutover verification below.
8. Submit the sitemap in Search Console for the new domain property.
9. Use URL Inspection to request indexing on the home page and the six most
   important pages.
10. Update the Google Business Profile website link and every external link the
    firm controls: Instagram bio, Facebook, email signatures, portal profiles,
    directory listings.
11. Raise the DNS TTL back to normal after 48 stable hours.

## Post-cutover verification

Run each and record the output.

```
# 1. Home is 200 and no longer noindex
curl -sI https://piedaterreproperty.co.uk/ | grep -iE 'HTTP|x-robots-tag'

# 2. robots.txt allows and points at the absolute sitemap
curl -s https://piedaterreproperty.co.uk/robots.txt

# 3. sitemap returns and validates
curl -s https://piedaterreproperty.co.uk/sitemap.xml | head

# 4. Canonicals are absolute and correct (spot five pages)
curl -s https://piedaterreproperty.co.uk/ | grep -i canonical

# 5. Old URLs return a single 301 to a 200, no chain (repeat per old URL)
curl -sIL https://piedaterreproperty.co.uk/feesandservicelevels | grep -iE 'HTTP|location'

# 6. Verification meta present
curl -s https://piedaterreproperty.co.uk/ | grep -i google-site-verification
```

Then, in the browser and the office: GA4 is receiving live traffic, a test form
submits and both emails arrive, and the reviews rail is pulling live data.

## Rollback plan

The whole cutover is DNS. The old Wix site stays live at its host until DNS
moves, so it is the fallback.

- What to change: at the registrar, restore the DNS records to their
  pre-cutover values. Record them in step 2 before touching anything; keep them
  in the office password manager, not here.
- How long it takes: bounded by the 300 second TTL set in step 2, so roughly 5
  to 15 minutes to propagate. This is the reason the TTL is lowered a day ahead.
- Test it in the low-TTL window before the real switch: point a single record at
  Vercel, confirm resolution, point it back, and time the round trip. That
  rehearsal is the tested rollback.
- If the site is up but wrong, a Vercel rollback to the previous deployment is
  immediate and does not touch DNS.

## After cutover

- Watch Search Console daily for two weeks: coverage, crawl anomalies, manual
  actions, Core Web Vitals.
- Compare against the baseline at 4, 8 and 12 weeks.
- Keep the old-site archive indefinitely.
- Set an uptime monitor with alerting to the office.
- Monthly: broken-link check, a form deliverability test, review freshness, and
  the last-reviewed dates on the legal pages.
