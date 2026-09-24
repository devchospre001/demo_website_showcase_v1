# CLAUDE.md

This repo is a static marketing website for ONE US landscaping / hardscaping business,
built from the [Studio Name] starter template. The site's job: turn local visitors into
quote requests and phone calls.

## Context (read before any task)

@docs/brief.md
@docs/spec.md
@docs/architecture.md
@docs/design-system.md
@docs/launch-checklist.md

- `brief.md` and `spec.md` are specific to this client. They are the source of truth for
  business facts, pages, sections, forms and integrations.
- `architecture.md`, `design-system.md` and `launch-checklist.md` are shared across all
  studio sites. Do not change them in a client repo; client-specific deviations go in the
  "Tech notes" section of `spec.md`.

## Stack (fixed, do not change without asking)

- Astro, static output only. No server rendering, no SSR adapter, unless `spec.md`
  explicitly requires the quote-form Worker.
- TypeScript in strict mode.
- Tailwind CSS v4 with design tokens defined in `@theme` in `src/styles/global.css`.
- Vanilla JavaScript only. No React, Vue, Svelte, Preact or Alpine.
- pnpm as package manager.
- Hosting: Cloudflare Workers static assets, deployed with Wrangler.
- Content: Astro content collections in `src/content/`, schemas in `src/content.config.ts`
  (import Zod from `astro/zod`).

## Commands

```bash
pnpm install --frozen-lockfile   # install exactly what the lockfile says
pnpm dev                         # local dev server
pnpm build                       # production build (must pass)
pnpm preview                     # serve the built site (use to test CSP)
pnpm check                       # astro check: types + diagnostics
pnpm test                        # Playwright smoke tests + axe accessibility checks
pnpm lighthouse                  # Lighthouse CI against the preview build
pnpm audit                       # known-vulnerability check
pnpm deploy:preview              # deploy a preview version (Claude may run this)
```

`pnpm deploy:production` exists but is for the human owner only. Never run it.

## Project structure

```
src/
  assets/images/        # all images, optimized by Astro
  components/ui/        # design-system primitives (Button, Card, Badge)
  components/sections/  # page sections (Hero, Services, Gallery, Reviews, CTA)
  content/              # services, projects, reviews, faq (md / yaml)
  content.config.ts     # collection schemas
  layouts/              # BaseLayout: head, SEO meta, JSON-LD
  lib/site.ts           # business facts: name, phone, address, hours, service area
  pages/                # routes
  styles/global.css     # Tailwind + design tokens
public/
  _headers              # security + cache headers for Cloudflare
  robots.txt
tests/                  # Playwright + axe
```

## Writing code

- Pages compose sections; sections compose `ui/` primitives. Keep components small and
  single-purpose. No abstraction until a pattern repeats three times.
- Never hard-code colors, fonts, spacing or radii. Use design tokens only. Re-branding a
  site must require editing only the `@theme` block.
- Business facts (name, phone, email, address, hours, service area, license numbers) live
  only in `src/lib/site.ts`. Everything else imports from there.
- Page copy for services, projects, reviews and FAQ lives in content collections, never
  inline in components.
- Images go in `src/assets/` and render with `<Image>` or `<Picture>`. Never put content
  images in `public/`. Always provide width, height and meaningful alt text
  (decorative images: `alt=""`).
- Zero JavaScript by default. Any `<script>` must be small, vanilla, and progressive
  enhancement: the page must still work with JS disabled.
- TypeScript strict: no `any`, typed component props, no ts-ignore without a comment
  explaining why.
- Phone numbers are `tel:` links. Every page ends with a clear call to action (quote
  request or call).
- Copy is US English, plain language, short sentences.

## Accessibility (WCAG 2.1 AA, every site, no exceptions)

- Semantic HTML landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page,
  headings in order.
- Text contrast at least 4.5:1 (3:1 for large text). Visible focus styles on everything
  interactive. Full keyboard navigation, including the mobile menu and gallery.
- Every form field has a visible label. Errors are announced and described in text.
- Tap targets at least 44x44px.
- Respect `prefers-reduced-motion`.
- Never install accessibility overlay widgets.

## SEO and performance

- Unique `<title>` and meta description per page, canonical URL, sitemap.
- LocalBusiness JSON-LD (most specific schema.org type that fits) generated from
  `src/lib/site.ts`.
- One service page per service and, when `spec.md` lists them, one page per service area.
- Self-hosted fonts with `font-display: swap`. Preload the hero image. No layout shift.

## Security

- **Dependencies:** never add, remove or upgrade a package without asking first. When
  asking, state the package, why it's needed, how well it's maintained, and whether a
  no-dependency solution exists. Prefer no dependency.
- Never lower `minimumReleaseAge` in `pnpm-workspace.yaml` and never approve a package's
  build/install scripts without asking.
- **Secrets:** never commit secrets. Nothing secret goes in `PUBLIC_` variables or client
  code. Worker secrets are set with `wrangler secret`, by the human owner.
- **CSP:** Astro's `security.csp` stays enabled. Any third-party script or iframe (e.g. a
  Jobber or Housecall Pro form embed) must be added explicitly to the CSP directives and
  recorded in `spec.md`. No inline event handlers (`onclick=`). Do not use `<ClientRouter />`.
- **Headers:** security headers live in `public/_headers`. Never weaken or remove them.
- **Forms (when the Worker is used):** verify Cloudflare Turnstile server-side, include a
  honeypot field, validate and length-limit every input, never log personal data.
- Links with `target="_blank"` get `rel="noopener noreferrer"`.

## Workflow

- **Git:** never commit to `main`. Create a branch per task (`feat/...`, `fix/...`,
  `content/...`), make small commits with clear messages, and leave the branch for the
  owner to review and merge.
- **Decisions:** decide technical details yourself and list them in your report. Ask
  about anything business or content related: services, prices, service areas, claims,
  guarantees, brand choices.
- **Never invent** reviews, testimonials, certifications, license numbers, awards, years
  in business, prices, or project photos. If information is missing from `brief.md`, ask.
  If work must continue, insert a visible `TODO(brief): ...` placeholder.
- **Deploys:** you may run `pnpm deploy:preview`. Never deploy to production, and never
  touch DNS, domains, or Cloudflare account settings.

## Definition of done

A branch is ready to merge only when all of these pass:

1. `pnpm build` succeeds and `pnpm check` reports 0 errors.
2. `pnpm test` passes: every page returns 200, navigation works, and axe reports
   0 accessibility violations.
3. `pnpm lighthouse` (mobile) meets: Performance ≥ 90, Accessibility = 100,
   Best Practices ≥ 95, SEO = 100.
4. `pnpm audit` shows no high or critical vulnerabilities.
5. For launch branches only: no `TODO(brief)` placeholders remain.

If a gate fails and you can't fix it, stop and report which gate failed and why.

## Report after every change

End every task with this format:

1. **What changed**: two or three sentences.
2. **Test it yourself**: numbered steps the owner can follow. Each step says exactly
   what to do (command, URL, click) and what result confirms it worked.
3. **Technical decisions**: anything you decided on your own.
4. **Questions**: business or content questions, if any.
5. **Branch and preview**: branch name, and preview URL if you deployed one.
