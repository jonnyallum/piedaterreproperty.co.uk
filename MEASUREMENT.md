# Measurement taxonomy

Mission T09: consent-safe staging measurement. The code is the source of truth:
`lib/measurement.ts` holds the dictionary below, and `npm run check:measurement`
fails if this table, the code or any `track()` call drifts apart.

## Stages

Every event belongs to exactly one stage.

- **view**: a visitor looked at a specific property.
- **engage**: browsing and form progress that is not yet contact.
- **intent**: a click on a phone, WhatsApp or email route. This is contact intent, not
  a confirmed enquiry, so it is never a key event.
- **lead**: an enquiry the server accepted.
- **booking**: a valuation appointment the server accepted.
- **service**: an existing tenant's maintenance request. It is never counted as a lead.

## Rules

1. **Consent first.** Nothing is sent until the visitor grants analytics consent at
   the current consent version. The gate is in `track()`, before any tag sees the
   event, so a loaded tag cannot send cookieless pings while consent is denied.
2. **Accepted submissions only.** Lead, booking and service events fire only after
   `/api/lead` returns 200 with `ok: true`. A rejected or failed submission sends
   nothing.
3. **No personal data.** Each event accepts only the parameters listed below. Any value
   that looks like an email, phone number or UK postcode, or is longer than 120
   characters, is dropped. Paths lose their query string. `property` is the listing
   id (street and town), never an address with a number.
4. **Every event carries its stage** as the `stage` parameter, so reports can split
   views, leads and bookings without a lookup.
5. **Key events** are exactly the lead and booking events.

## Event dictionary

| Event | Stage | Key event | Parameters | Meaning |
|---|---|---|---|---|
| `property_view` | view | no | `property` | A property detail page was viewed |
| `search_performed` | engage | no | none | A property search was run |
| `search_empty` | engage | no | none | A property search returned nothing |
| `review_rail_engaged` | engage | no | `count` | The reviews rail was scrolled |
| `review_link_click` | engage | no | `location` | The leave-a-review link was followed |
| `nav_cta_click` | engage | no | `location` | A navigation call to action was clicked |
| `valuation_start` | engage | no | `path`, `source` | The valuation form was started |
| `valuation_step_2` | engage | no | `path` | The valuation form reached step 2 |
| `valuation_step_3` | engage | no | `path` | The valuation form reached step 3 |
| `call_click` | intent | no | `location` | A phone link was clicked |
| `whatsapp_click` | intent | no | `location` | A WhatsApp link was clicked |
| `email_click` | intent | no | `location` | An email link was clicked |
| `enquiry_submit` | lead | yes | `source`, `property` | A property enquiry was accepted by the server |
| `contact_submit` | lead | yes | `source` | A contact form was accepted by the server |
| `tenant_register_submit` | lead | yes | `source` | A tenant registration or search alert was accepted by the server |
| `valuation_submit` | booking | yes | `path`, `source` | A valuation booking was accepted by the server |
| `maintenance_submit` | service | no | `source` | A maintenance request was accepted by the server |
