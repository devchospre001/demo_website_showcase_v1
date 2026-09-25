# Client brief

Per client. Concept + business requirements in one document.
Filled from the intake form and discovery call. This is the source of truth for every
business fact on the site. Claude never adds facts that aren't here.

Status: DRAFT (demo). Coquina Stoneworks is a FICTIONAL business for a Perennial Studio
concept site. Demo mode rules in `CLAUDE.md` apply: every fact below is invented, plausible,
and not attributed to real people. Owner approval replaces client approval.

## 1. Client and contacts

| Field | Value |
|---|---|
| Business display name | Coquina Stoneworks |
| Legal name | Coquina Stoneworks LLC (fictional) |
| Main contact (name, role) | Perennial Studio owner (acting client for the demo) |
| Contact email / phone | n/a (demo) |
| Preferred contact method and hours | n/a (demo) |
| Time zone | America/New_York |

## 2. Business facts (goes into `src/lib/site.ts`)

| Field | Value |
|---|---|
| Public phone number | (904) 555-0142 (fictional 555-01xx range) |
| Public email | hello@example.com (reserved example domain) |
| Street address shown publicly? (yes / service-area only) | Service-area only |
| Address (if shown) | none |
| Business hours | Mon–Fri 7:00 am–5:30 pm; Sat by appointment |
| License number(s) (only if the client wants it shown) | Not shown (no invented license numbers) |
| Insured? (only if the client confirms) | Yes, "Licensed & insured" badge (demo claim) |
| Year founded (only if provided) | 2014 (demo) |
| Current domain / desired domain | none; preview URL only |
| Social profiles | none |
| Google Business Profile link | none |

## 3. Services

List in priority order. Mark the ones the client wants MORE of.

| Service | Short description (client's words) | Want more? | Typical job size (optional) |
|---|---|---|---|
| Paver patios & walkways | Travertine, shellstone and concrete paver patios, walkways and driveways, built on a compacted base that stands up to Florida rain. | Yes | $12k–$45k |
| Outdoor kitchens & fire features | Built-in grills, counters, pergola-covered dining areas, fire pits and fireplaces. | Yes | $25k–$90k |
| Retaining walls & seating walls | Segmental block and natural stone walls for grade changes, raised beds and built-in seating. | No | $8k–$40k |
| Pool decks | New and resurfaced pool decks in cool-to-the-touch travertine and shellstone pavers. | No | $15k–$60k |

Services the client does NOT offer (so we never imply them):

- Lawn mowing or recurring maintenance
- Pool construction or pool repair (decks only)
- Irrigation installation
- Tree removal

## 4. Service areas

| City / county | Priority (high / normal) |
|---|---|
| St. Augustine | high |
| St. Augustine Beach | high |
| Ponte Vedra Beach | high |
| Nocatee | normal |
| World Golf Village | normal |
| Fruit Cove | normal |

Areas they do NOT serve:

- Anything outside St. Johns County (no Jacksonville proper, no Palm Coast)

## 5. Customers and goals

- Ideal customer: homeowners in established and newer St. Johns County neighborhoods,
  planning a $20k+ outdoor project, who value craftsmanship over the lowest bid.
- The jobs that make them the most money: outdoor kitchens and large patio + fire
  feature combinations.
- Main goal for the website: more qualified quote requests for patios and outdoor
  kitchens; fewer small repair calls.
- How they get most leads today: referrals and Google search.
- What happens after a lead comes in: the owner calls back within one business day and
  books an on-site design visit.
- How we'll measure success after 3 months: quote requests per month (demo: n/a).

## 6. Why customers choose them

In the client's own words. No invented claims (demo: invented, plausible).

- Differentiators: "We build every base like it has to survive a hurricane season,
  because it does." Owner on every job; one crew from excavation to final sealing; 3D
  design preview before any digging.
- Guarantees / warranties (exact wording): "5-year workmanship warranty on every
  hardscape we install."
- Awards / certifications (with proof links): none (don't show any).

## 7. Proof

| Item | Source / link | Permission to use? |
|---|---|---|
| Google rating and review count | Demo: 4.9 out of 5, 86 reviews | Demo only, labeled as sample |
| Reviews to feature (copy exact text) | See `src/content/reviews/` (sample reviews, initials only) | Demo only |
| Before/after projects | Placeholder images until AI concept images exist | Demo only |

## 8. Brand

- Logo files: none; a text wordmark in the heading font.
- Existing brand colors: none; derived from coquina stone (warm shell beige, dark umber).
- Existing fonts: none.
- Three words that should describe the site's feel: premium, grounded, coastal.
- Websites they like (and why): n/a (demo).
- Websites they dislike (and why): cluttered contractor sites with pop-ups and sliders.
- Competitors to stand apart from: generic "landscaping & more" sites.

## 9. Content sources

Decided per client. Mark who provides each.

| Content | Client provides | Claude drafts, client approves | Studio sources |
|---|---|---|---|
| Project photos | | | Placeholders now; AI concept images later |
| Service descriptions | | X | |
| About story / team | | X | |
| FAQ answers | | X | |

- Photo folder link: none yet.
- Notes on photos: every image is disclosed as concept imagery.

## 10. Tools and integrations

| Question | Answer |
|---|---|
| Field-service software (Jobber, Housecall Pro, ServiceTitan, none) | none (demo) |
| How they send invoices and get paid | n/a |
| Online booking wanted? (yes / quote requests only) | Quote requests only |
| Where quote requests should go (software, email address) | Nowhere: demo form, nothing is sent |
| Existing analytics / tracking to keep | none |

## 11. Project terms (summary only; the contract governs)

| Item | Value |
|---|---|
| Package | Concept site (studio portfolio) |
| Target launch date | Preview URL only |
| Care plan starts | n/a |
| Ownership: studio-held until final payment | yes (studio-owned) |

## 12. Open questions

- None blocking. Owner to review the invented facts above and change anything.
