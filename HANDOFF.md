# Project handoff: web studio for US landscapers

Context for a new session. Read this first, then `CLAUDE.md` and `docs/`.

## Business decisions (settled)

- Freelance web studio; sites built with Claude Code; owner is a frontend engineer.
- Market: US. Niche: landscaping and hardscaping. First region: Southeast (FL, GA, Carolinas).
- Time: 10–20 hours per week.
- Legal: local sole proprietor (details to confirm with an accountant). Studio receives
  payments via Payoneer or Monri.
- Pricing: build fee + monthly care plan.
- Ownership: domain, hosting and code stay with the studio until the client pays in full,
  then transfer to the client.
- Content (photos, copy): decided per client.
- Accessibility: every site built to WCAG 2.1 AA, never overlay widgets.
- Cold email: CAN-SPAM compliant, using a US virtual mailbox address. Recommended tools:
  Outscraper/Apify for leads, Instantly for sending, low volume per inbox.
- Payments on client sites: usually none. Embed the client's Jobber/Housecall Pro form;
  Stripe in the client's own name only for fixed-price services; hosted payment pages only.
- Studio name: **Perennial Studio** (decided 2026-09-24).
- Later: Instagram/TikTok marketing with Higgsfield.

## Tech decisions (settled; details in CLAUDE.md and docs/)

- Astro, static output only; TypeScript strict; Tailwind v4 + semantic design tokens;
  vanilla JS only; pnpm with 7-day release quarantine; Cloudflare Workers static assets.
- No CMS; client edits go through the care plan.
- One repo per client, created from a starter template.
- Docs per client: `brief.md` + `spec.md`. Shared: `architecture.md`, `design-system.md`,
  `launch-checklist.md`.
- Claude works on branches, owner merges. Claude asks before adding any package.
  Claude deploys previews only; owner deploys production.
- Claude decides technical details, asks about business/content.
- Quality gates: build + astro check, Playwright + axe (0 violations), Lighthouse mobile
  (Perf ≥ 90, A11y 100, Best Practices ≥ 95, SEO 100), pnpm audit.
- Every change ends with step-by-step test instructions the owner runs themselves.

## Files

- `CLAUDE.md`
- `docs/architecture.md`, `docs/design-system.md`, `docs/launch-checklist.md`
- `docs/brief.md`, `docs/spec.md` (templates)

## Next task: build the Coquina Stoneworks demo site (this folder)

This folder is ONE demo website, not a starter template or boilerplate. It is a concept
site for a fictional business, used in proposals and in the studio portfolio.

- Business: Coquina Stoneworks, hardscaping specialist (patios, retaining walls,
  outdoor kitchens), serving St. Augustine, FL and St. Johns County.
- Look: premium, stone tones.
- Built with the stack and rules in `CLAUDE.md` and `docs/`, deployed to a preview URL.
- `docs/brief.md` and `docs/spec.md` get filled in for Coquina Stoneworks first
  (fictional content allowed under the demo mode rules below).

Other concepts, for later and in their own folders: Brightblade Lawn & Landscape
(Greenville, SC) and Sable Grove Outdoor Living (Atlanta, GA).

### Demo mode rules (concept sites only; also in this folder's CLAUDE.md)

- The business is fictional. Invent names that don't match real local companies.
- Sample reviews, stats and copy are allowed but must be plausible and never attributed
  to real people.
- Phone numbers use the fictional range 555-0100 to 555-0199.
- Footer shows "Concept site by Perennial Studio" on every page.
- Images: free-to-use licensed stock photos (check each license) or AI-generated images,
  disclosed as concept imagery.
- In proposals and the portfolio, label them as concept sites, not client work.

### Decided (2026-09-24)

- Images for concept sites: AI-generated, disclosed as concept imagery.
- Fictional businesses (web-searched 2026-09-24, no matching real company found):
  1. Coquina Stoneworks: hardscaping, St. Augustine, FL (St. Johns County).
  2. Brightblade Lawn & Landscape: maintenance plans, Greenville, SC.
  3. Sable Grove Outdoor Living: design-build, Atlanta, GA (Buckhead, Sandy Springs).
- Studio domain: not registering anything now.
- Studio name: **Perennial Studio** (owner's pick). Note: other design/architecture
  studios use "Perennial Studio"; check domain availability and a trademark search
  before registering.

## Kickoff prompt for the new session

> Read HANDOFF.md, CLAUDE.md and everything in docs/. This folder is the Coquina
> Stoneworks demo website. First draft docs/brief.md and docs/spec.md for it, then build
> the site. Work step by step: propose the plan first, ask before adding any package, and
> end each step with test instructions I can run myself.
