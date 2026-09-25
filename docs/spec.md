# Site spec

Per client. A light PRD: what gets built for this client, based on `docs/brief.md`.
Anything not listed here uses the defaults in `docs/architecture.md` and
`docs/design-system.md`.

Status: APPROVED (date: 2026-09-24, owner approved the concept design canvas)

## 1. Summary

- Client: Coquina Stoneworks (fictional, Perennial Studio concept site)
- Primary goal (from brief): qualified quote requests for patios and outdoor kitchens
- Primary CTA: Get a free quote (secondary: Call)
- Launch target: GitHub Pages, https://devchospre001.github.io/demo_website_showcase_v1/

## 2. Sitemap

| Route | Page purpose | Sections (in order) | Primary CTA |
|---|---|---|---|
| `/` | Convert first-time visitors | Hero, TrustBar, ServicesGrid, ProjectGallery (featured), ProcessSteps, Reviews, ServiceAreas, FAQ, CTABand | Quote |
| `/services/` | Overview of all services | Page header, ServicesGrid, ProcessSteps, CTABand | Quote |
| `/services/[slug]/` | One per service in brief §3 | Page header + hero image, service body, related projects, service FAQ, CTABand | Quote |
| `/projects/` | Portfolio | Page header, filter links by service, ProjectGallery, CTABand | Quote |
| `/projects/type/[service]/` | Portfolio filtered by service (filter links work without JS) | Same as `/projects/` | Quote |
| `/projects/[slug]/` | One page per project (filter + lightbox fallback) | Photos, details, BeforeAfter if present, CTABand | Quote |
| `/about/` | Trust and story | Story, values, TrustBar, CTABand | Quote |
| `/contact/` | Quote form, phone, hours, areas | QuoteForm (demo), contact details, ServiceAreas | Quote |
| `/quote-demo/` | Where the demo form lands without JS | Explains the demo, links home and back | Call |
| `/404` | Unknown URLs | Links home and to contact | Quote |

Service pages to create:

- `/services/paver-patios/`
- `/services/outdoor-kitchens/`
- `/services/retaining-walls/`
- `/services/pool-decks/`

Area pages to create: none (no real area-specific content).

## 3. Content to produce

| Item | Count | Source (from brief §9) | Status |
|---|---|---|---|
| Service descriptions | 4 | Claude drafts | To do |
| Projects (with photos) | 6 | Claude drafts, placeholder images | To do |
| Reviews | 4 | Sample reviews, initials only, labeled "Sample review" | To do |
| FAQ entries | 6 | Claude drafts | To do |
| About page copy | 1 | Claude drafts | To do |

## 4. Quote form and integrations

- Option: **Demo** (neither A nor B, see Tech notes)
- Provider (Option A): none
- Embed code / form URL: none
- Destination email (Option B): none
- Fields: name, phone, email, city (select from brief §4), service (select), project
  details. All with visible labels and native validation.
- Payment links needed on site? No
- Analytics: none

### CSP additions required

Every third-party origin the site loads, frames or submits to:

| Origin | Directive(s) | Why |
|---|---|---|
| none | | Fonts are downloaded at build time and self-hosted |

## 5. SEO

| Page | Target search phrase | Title | Meta description |
|---|---|---|---|
| `/` | hardscaping St. Augustine FL | Paver Patios & Outdoor Kitchens in St. Augustine, FL | Coquina Stoneworks | Patios, outdoor kitchens, retaining walls and pool decks built for Florida weather. Serving St. Johns County. Get a free quote. |
| `/services/paver-patios/` | paver patio St. Augustine | Paver Patios in St. Augustine, FL | Coquina Stoneworks | Travertine, shellstone and concrete paver patios on a base built for Florida rain. Free on-site design visit. |
| `/services/outdoor-kitchens/` | outdoor kitchen St. Augustine | Outdoor Kitchens in St. Augustine, FL | Coquina Stoneworks | Built-in grills, counters, pergolas and fire features, designed in 3D before we dig. |
| `/services/retaining-walls/` | retaining wall St. Johns County | Retaining & Seating Walls in St. Johns County | Coquina Stoneworks | Block and natural stone walls for grade changes, raised beds and built-in seating. |
| `/services/pool-decks/` | pool deck pavers St. Augustine | Pool Decks in St. Augustine, FL | Coquina Stoneworks | New and resurfaced pool decks in cool-to-the-touch travertine and shellstone. |
| `/projects/` | hardscape projects St. Augustine | Our Projects | Coquina Stoneworks | Patios, outdoor kitchens and pool decks across St. Johns County. |
| `/about/` | | About Us | Coquina Stoneworks | One crew, the owner on every job, and bases built to survive hurricane season. |
| `/contact/` | | Get a Free Quote | Coquina Stoneworks | Tell us about your project. We call back within one business day. |

- schema.org type for JSON-LD: `HomeAndConstructionBusiness` (no street address;
  `areaServed` from brief §4)
- Show street address in schema? No

## 6. Design tokens (client values)

Replace studio defaults only where the brief provides brand values. Check contrast rules
in `docs/design-system.md` §2 for every change.

| Token | Value | Contrast checked? |
|---|---|---|
| `--color-brand` | `#4A3F35` (dark umber) | on-brand 10.2:1; on surface 9.7:1 |
| `--color-brand-strong` | `#352C24` | on-brand 13.7:1 |
| `--color-on-brand` | `#FFFFFF` | see above |
| `--color-accent` | `#C9A97A` (coquina sand, decorative only) | 2.1:1 on surface, so never text; ink on accent 7.6:1 |
| `--color-ink` | `#1F1C18` | 16.1:1 on surface, 14.4:1 on surface-alt |
| `--color-ink-muted` | `#5A5249` | 7.3:1 on surface, 6.5:1 on surface-alt |
| `--color-surface` | `#FBF9F5` | n/a |
| `--color-surface-alt` | `#F2ECE2` | n/a |
| `--color-border` | `#DCD2C3` | decorative |
| `--font-heading` | Cormorant Garamond 600 | n/a |
| `--font-body` | Instrument Sans 400, 600 | n/a |
| `--color-accent-ink` | `#7A6142` (sand-toned text on light) | 5.5:1 on surface |
| `--color-ink-soft` | `#3A342D` (long-form paragraphs) | 11.7:1 on surface |
| `--color-field` | `#8C7F6D` (form control borders) | 3.9:1 on white (non-text, needs 3:1) |
| `--color-night` / `--color-night-2` | `#231E19` / `#2B2520` (utility bar, footer, quote section) | n/a |
| `--color-on-night` | `#D9CFBF` | 10.7:1 on night, 6.6:1 on brand |
| `--color-on-night-muted` | `#BFB3A3` | 8.0:1 on night |
| `--color-sand-ink` | `#E7D3B0` (eyebrows on dark) | 11.3:1 on night, 7.0:1 on brand |

## 7. Tech notes (deviations from shared architecture)

- **Demo quote form.** No Option A or B. The form's inputs have no `name` attributes, so
  submitting sends no personal data anywhere. With JS, a small script blocks the submit,
  runs native validation and announces "This is a concept site. Nothing was sent." With
  JS off, the form goes to `/quote-demo/`, which explains the same. No Worker, no secrets.
- **Fonts** come from Astro's built-in Fonts API (downloads from Google at build time and
  self-hosts the files). No extra package; nothing loads from Google at runtime.
- **Images** are generated placeholders (stone-toned, labeled "Concept image") until AI
  concept images replace them. Every placeholder uses the final file name and size.
- **Reviews** are samples, labeled "Sample review", initials only.
- **Project detail pages** (`/projects/[slug]/`) added so gallery items work as plain
  links without JS.
- **Design** replicates the approved concept canvas "Coquina Stoneworks — Concept Design"
  (desktop 1440, mobile 390, mobile menu) value for value: sizes, spacing, colors and the
  phone-only copy and layout differences. Desktop styles switch on at `lg` (1024px).
  Body font changed from Inter to Instrument Sans; it uses three weights (400, 500, 600)
  because the concept's nav and filter chips use 500.
- **Intentional differences from the concept** (accessibility, CLAUDE.md rules):
  - Form field borders use `--color-field` `#8C7F6D` instead of the concept's `#B8AC9A`,
    which is only 2.2:1 against white (WCAG 1.4.11 needs 3:1).
  - Form inputs are 16px on phones (concept: 15px) so iOS doesn't zoom in on focus.
  - Footer links keep a 44px tap target, so the footer is slightly taller than the concept.
  - "See all projects" shows the real project count instead of the concept's "24".
- **Hosting: GitHub Pages instead of Cloudflare** (owner's decision for this demo).
  `.github/workflows/deploy.yml` builds with `withastro/action` (pnpm 11) and deploys on every
  push to `main`. The site is a project site under `base: "/demo_website_showcase_v1"`, so
  every internal link goes through `url()` in `src/lib/url.ts`; a test fails if one doesn't.
  Trade-offs: GitHub Pages ignores `public/_headers`, so those security headers
  (X-Frame-Options, `frame-ancestors`, Permissions-Policy, etc.) are not sent. The CSP
  `<meta>` tag still applies, and github.io already forces HTTPS with HSTS. `robots.txt` sits
  under the subfolder, where crawlers don't look; fine for a demo. Client sites stay on
  Cloudflare as in `docs/architecture.md`.
- **Mobile menu** is a native `<details>` element (works without JS); a small script adds
  Esc-to-close and closes it after a link is followed.
- **Project gallery lightbox** is not built yet: tiles link to project pages, which is the
  no-JS behavior the design system requires anyway.
- **No `aggregateRating` in JSON-LD**: the demo rating is a sample.
- **Build and test runs on the owner's Windows PC**; Claude's workspace can't reach the
  package registry.

## 8. Acceptance criteria (client-specific)

In addition to the Definition of done in `CLAUDE.md` and `docs/launch-checklist.md`:

- [ ] Submitting the demo form (JS on) shows the "nothing was sent" message and sends no
      network request
- [ ] Submitting with JS off lands on `/quote-demo/` with no form data in the URL
- [ ] Every page footer says "Concept site by Perennial Studio" and discloses concept imagery
- [ ] Phone number is (904) 555-0142 everywhere and dials as a `tel:` link

## 9. Open questions

| Question | For (client / owner) | Answer |
|---|---|---|
| Approve the invented facts in `brief.md` | owner | |
