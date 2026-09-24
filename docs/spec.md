# Site spec

Per client. A light PRD: what gets built for this client, based on `docs/brief.md`.
Anything not listed here uses the defaults in `docs/architecture.md` and
`docs/design-system.md`.

Status: DRAFT | APPROVED (date: ____)

## 1. Summary

- Client:
- Primary goal (from brief):
- Primary CTA: Get a free quote | Book online | Call
- Launch target:

## 2. Sitemap

| Route | Page purpose | Sections (in order) | Primary CTA |
|---|---|---|---|
| `/` | Convert first-time visitors | Hero, TrustBar, ServicesGrid, ProjectGallery, ProcessSteps, Reviews, ServiceAreas, FAQ, CTABand | Quote |
| `/services/` | Overview of all services | | Quote |
| `/services/[slug]/` | One per service in brief §3 | | Quote |
| `/projects/` | Portfolio | | Quote |
| `/about/` | Trust and story | | Quote |
| `/contact/` | Quote form, phone, hours, areas | | Quote |
| `/areas/[slug]/` | Only if listed below | | Quote |

Service pages to create:

-

Area pages to create (only high-priority areas from brief §4, and only with real,
area-specific content such as projects done there):

-

## 3. Content to produce

| Item | Count | Source (from brief §9) | Status |
|---|---|---|---|
| Service descriptions | | | |
| Projects (with photos) | | | |
| Reviews | | | |
| FAQ entries | | | |
| About page copy | | | |

## 4. Quote form and integrations

- Option: **A (embed)** | **B (Worker)**
- Provider (Option A): Jobber | Housecall Pro | other:
- Embed code / form URL:
- Destination email (Option B):
- Fields (Option B): name, phone, email, address/city, service (select), project details, photos? (no by default)
- Payment links needed on site? (e.g. "Pay your invoice" linking to provider portal):
- Analytics: Cloudflare Web Analytics | Plausible

### CSP additions required

Every third-party origin the site loads, frames or submits to:

| Origin | Directive(s) | Why |
|---|---|---|
| | | |

## 5. SEO

| Page | Target search phrase | Title | Meta description |
|---|---|---|---|
| `/` | | | |
| | | | |

- schema.org type for JSON-LD:
- Show street address in schema? (from brief §2):

## 6. Design tokens (client values)

Replace studio defaults only where the brief provides brand values. Check contrast rules
in `docs/design-system.md` §2 for every change.

| Token | Value | Contrast checked? |
|---|---|---|
| `--color-brand` | | |
| `--color-brand-strong` | | |
| `--color-on-brand` | | |
| `--color-accent` | | |
| `--color-surface-alt` | | |
| `--font-heading` | | n/a |
| `--font-body` | | n/a |

## 7. Tech notes (deviations from shared architecture)

Anything that differs from `docs/architecture.md`, with the reason. Leave empty if none.

-

## 8. Acceptance criteria (client-specific)

In addition to the Definition of done in `CLAUDE.md` and `docs/launch-checklist.md`:

- [ ] A test quote request arrives in the client's system / inbox
- [ ]
- [ ]

## 9. Open questions

| Question | For (client / owner) | Answer |
|---|---|---|
| | | |
