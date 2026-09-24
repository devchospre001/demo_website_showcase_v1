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
- Studio name: not decided yet. Ideas so far: Perennial Studio, Plotline, Stepstone Studio,
  Loam, Trowel & Type, Live Oak Studio. Placeholder in docs: `[Studio Name]`.
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

## Next task: starter repo + 3 concept sites

Goal: three polished sites for fictional landscaping businesses, used in proposals and in
the studio portfolio.

Build order:

1. Starter repo (the template): Astro project with configs, tokens, `ui/` components,
   section library, tests and scripts exactly as the docs describe.
2. Three concept sites created from the starter, each with its own brief, spec and token
   set, deployed to preview URLs.

Suggested variety, to show range (confirm in the new session):

1. Hardscaping specialist: patios, retaining walls, outdoor kitchens. Premium, stone tones.
2. Lawn and landscape maintenance: recurring service plans. Fresh, friendly, bright.
3. Outdoor living design-build: high-end projects. Dark, editorial, photo-led.

### Demo mode rules (concept sites only; add to each concept repo's CLAUDE.md)

- The business is fictional. Invent names that don't match real local companies.
- Sample reviews, stats and copy are allowed but must be plausible and never attributed
  to real people.
- Phone numbers use the fictional range 555-0100 to 555-0199.
- Footer shows "Concept site by [Studio Name]" on every page.
- Images: free-to-use licensed stock photos (check each license) or AI-generated images,
  disclosed as concept imagery.
- In proposals and the portfolio, label them as concept sites, not client work.

### Open decisions for the new session

- Image source for concept sites (stock vs AI-generated).
- Fictional business names and the cities they "serve".
- Whether to register a studio domain before publishing the portfolio.

## Kickoff prompt for the new session

> Read HANDOFF.md, CLAUDE.md and everything in docs/. Then build the starter repo exactly
> as the docs describe. Work step by step: propose the plan first, ask before adding any
> package, and end each step with test instructions I can run myself. After the starter
> works, we'll create the three concept sites.
