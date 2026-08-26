# Campaign tracking reference

Every campaign asset routes to a tracked URL so a lead can be attributed to the
thing that produced it. This table is the human-readable map; the code source of
truth for the short links is `content/campaigns/links.ts`, which the
`/l/[campaign]` route reads. Keep the two in step.

How attribution works end to end: a tracked URL carries `utm_*` parameters, the
UtmCapture component stores them in the browser session on landing, and every
lead form attaches them to the submission, so the office email says which
campaign the lead came from.

## Short links, for print

Printed URLs stay short and human. The `/l/<slug>` route applies the UTM
parameters server side and redirects to the landing page.

| Asset | Short link | Resolves to | Medium |
|---|---|---|---|
| Warm landlord letter, printed URL | `/l/landlords` | `/sales/landlords` | post |
| General leaflet and QR | `/l/sell` | `/sales/thinking-of-selling` | print |
| For Sale board QR | `/l/sell` | `/sales/thinking-of-selling` | print |
| Havant street card | `/l/havant` | `/sales/thinking-of-selling` | street |
| Emsworth street card | `/l/emsworth` | `/sales/thinking-of-selling` | street |
| Waterlooville street card | `/l/waterlooville` | `/sales/thinking-of-selling` | street |
| Portsmouth street card | `/l/portsmouth` | `/sales/thinking-of-selling` | street |
| Hayling Island street card | `/l/hayling` | `/sales/thinking-of-selling` | street |

All short links use `utm_campaign=sales-launch`. The per-town cards set
`utm_content` to the town.

## Full URLs, for email and social

Email and social are not space constrained, so they use a full URL with the
right medium rather than a print short link.

| Asset | Tracked URL |
|---|---|
| Warm landlord email | `/sales/landlords?utm_source=newsletter&utm_medium=email&utm_campaign=sales-launch&utm_content=warm-landlords` |
| Past tenants and applicants email | `/sales/thinking-of-selling?utm_source=newsletter&utm_medium=email&utm_campaign=sales-launch&utm_content=past-tenants` |
| Instagram and Facebook posts | `/sales?utm_source=instagram&utm_medium=social&utm_campaign=sales-launch` (swap `instagram` for `facebook` per network) |
| Google Business Profile post | `/l/sell` |

Prefix every URL above with `https://piedaterreproperty.co.uk`.

## Assets with no site attribution

- Review request email: links to the Google review page, not a site URL.
- Email signature: links to the site brand URL and, separately, the review page.

## The measure of success

Defined before launch, so nobody optimises the wrong number:

- Primary: valuations booked per campaign, and instructions won per campaign.
- Secondary: leads submitted per campaign, from the office email attribution and
  the `/l/` hit log.
- Not the goal: impressions, reach and clicks. They are inputs, not outcomes.
