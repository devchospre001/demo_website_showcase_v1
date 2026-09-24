# Architecture

Shared by every [Studio Name] client site. Do not edit in a client repo.
Client-specific deviations go in the "Tech notes" section of `docs/spec.md`.

## 1. Context and goals

Each site is a marketing website for one US landscaping / hardscaping business.

Goals, in priority order:

1. Turn local visitors into quote requests and phone calls.
2. Load fast on mid-range phones over mobile networks.
3. Be accessible (WCAG 2.1 AA) and secure by default.
4. Cost almost nothing to host and almost no time to maintain.
5. Be re-brandable for a new client by changing tokens and content, not components.

Non-goals: user accounts, e-commerce checkout, databases, server rendering, client-side
routing, a CMS.

## 2. High-level design

```
Visitor ──▶ Cloudflare edge ──▶ static HTML / CSS / images  (+ public/_headers)
               │
               └─ Quote request
                    ├─ Option A: Jobber / Housecall Pro embedded form  (default)
                    └─ Option B: POST /api/quote ─▶ Worker ─▶ Turnstile check
                                                          └─▶ email to client

Owner / Claude ──▶ edit content + components ──▶ branch ──▶ quality gates
               ──▶ preview deploy ──▶ owner merges ──▶ owner deploys production
```

Everything the visitor sees is pre-built at build time. The only runtime code that can
exist is the optional quote-form Worker (Option B).

## 3. Key decisions and trade-offs

| Decision | Chosen | Why | Trade-off accepted |
|---|---|---|---|
| Rendering | Static (SSG) only | Fastest, cheapest, smallest attack surface | Content changes need a rebuild |
| Framework | Astro | Content-first, zero JS by default, built-in CSP and image optimization | Owner is new to Astro |
| Styling | Tailwind v4 + design tokens | One token file re-brands a site | Utility classes are verbose |
| JavaScript | Vanilla only | No framework runtime shipped | Complex widgets take more hand-written code |
| Content editing | No CMS; edits via care plan | Less surface, recurring revenue | Client can't self-edit |
| Repos | One repo per client, from the starter template | Clean ownership transfer | Starter improvements must be ported manually |
| Hosting | Cloudflare Workers static assets | Cloudflare's recommended path for new projects, free tier, global edge | Tied to Cloudflare features (`_headers`) |
| Package manager | pnpm | Blocks install scripts by default, release-age quarantine | Slightly less familiar than npm |

Revisit when: a client needs frequent self-editing (add a git-based CMS such as Keystatic),
or a client needs bookings/payments beyond what their field-service software provides.

## 4. Content model

Business facts live in `src/lib/site.ts` (single source of truth). The values below are
illustrative only; real values always come from `docs/brief.md`:

```ts
export const site = {
  name: "Oak & Stone Landscaping",       // display name
  legalName: "Oak & Stone LLC",
  phone: "+17045550123",                 // E.164; formatted for display in components
  email: "hello@example.com",
  address: null,                         // or { street, city, region, postalCode }
  serviceAreaOnly: true,                 // true = don't show a street address
  areas: ["Charlotte", "Matthews", "Huntersville"],
  hours: [{ days: "Mon–Fri", open: "07:00", close: "18:00" }],
  license: null,                         // only if provided in the brief
  url: "https://example.com",
  social: { facebook: null, instagram: null },
} as const;
```

Content collections in `src/content/` (schemas in `src/content.config.ts`):

| Collection | Format | Key fields |
|---|---|---|
| `services` | Markdown | title, slug, summary, heroImage, order, featured |
| `projects` | Markdown | title, service (reference), city, images[], beforeImage?, afterImage?, completed |
| `reviews` | YAML | author, rating, text, source, date (real reviews only) |
| `faq` | YAML | question, answer, service? (reference) |
| `areas` | Markdown | city, region, summary (only if `spec.md` lists area pages) |

A missing or wrong field must fail the build. Schemas use Zod imported from `astro/zod`.

Data flow:
`brief.md` ─▶ `site.ts` + content files ─▶ components ─▶ HTML + JSON-LD ─▶ `dist/`

## 5. Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Hero, trust bar, services, projects, reviews, CTA |
| `/services/` | `pages/services/index.astro` | All services |
| `/services/[slug]/` | `pages/services/[slug].astro` | One page per service |
| `/projects/` | `pages/projects/index.astro` | Gallery, filterable without JS via links |
| `/about/` | `pages/about.astro` | |
| `/contact/` | `pages/contact.astro` | Quote form, phone, hours, areas |
| `/areas/[slug]/` | optional | Only when `spec.md` requires area pages |
| `/404` | `pages/404.astro` | Served for unknown URLs |

## 6. Configuration reference

`astro.config.mjs` (shape; exact versions live in the starter repo):

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://example.com",       // client's production URL, required for sitemap/canonicals
  output: "static",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  security: {
    csp: true,                        // add directives/resources here for third-party embeds
  },
});
```

`wrangler.jsonc` (static assets only, Option A):

```jsonc
{
  "name": "client-slug",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

Option B adds a Worker entry point that handles `POST /api/quote`. Its exact wiring lives in
the starter repo's `worker/` folder and is only enabled when `spec.md` says so.

## 7. Security

### Supply chain (the main real risk)

`pnpm-workspace.yaml` (pnpm 11; on pnpm 10 use `onlyBuiltDependencies` instead of `allowBuilds`):

```yaml
minimumReleaseAge: 10080      # 7 days: new package versions are quarantined
trustPolicy: no-downgrade     # reject versions whose publishing trust signals regressed
allowBuilds:                  # install scripts are blocked except for these
  esbuild: true
```

Rules:

- Install with `pnpm install --frozen-lockfile`. The lockfile is always committed.
- Run `pnpm audit` before every merge. It only catches known vulnerabilities, so keeping
  dependencies few is the real defense.
- Approved baseline dependencies (already in the starter; anything else needs owner approval):
  `astro`, `@astrojs/sitemap`, `@astrojs/check`, `typescript`, `tailwindcss`,
  `@tailwindcss/vite`, `wrangler`, `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`.
- A security fix that is newer than the quarantine window may be excluded explicitly,
  with owner approval, and the exclusion removed once the window passes.

### Content Security Policy

- Astro's `security.csp` hashes every script and style it bundles and emits the policy as a
  `<meta>` tag. It only works in `build`/`preview`, not `dev`, so always test CSP with
  `pnpm build && pnpm preview`.
- Third-party scripts, iframes and form targets (Jobber, Housecall Pro, Turnstile) are not
  covered automatically. Add them to `security.csp` directives and record them in `spec.md`.
- `<ClientRouter />` is not compatible with Astro's CSP. Use native CSS view transitions if needed.
- No inline event handlers. Scripts go in `<script>` tags that Astro bundles.

### HTTP headers (`public/_headers`)

Some protections only work as real HTTP headers (for example `frame-ancestors`), so they
live here and apply to every static response:

```
/*
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
  Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

`_astro/` holds fingerprinted build assets, so they can be cached for a year. HTML keeps
Cloudflare's default revalidation so content updates show immediately. Add
`includeSubDomains` / `preload` to HSTS only after confirming every subdomain of the
client's domain serves HTTPS.

### Forms

- Option A (embed): the provider handles storage and spam. We only allow its origin in CSP.
- Option B (Worker): verify Cloudflare Turnstile server-side, reject if the honeypot field
  is filled, validate and length-limit every field, send one email to the client, and never
  log personal data. Secrets (Turnstile secret, email API key) are set by the owner with
  `wrangler secret put` and never committed.

### Accounts (outside the code, but where most takeovers happen)

- 2FA on GitHub, Cloudflare, domain registrar and email provider.
- Registrar lock enabled on every client domain.
- Scoped Cloudflare API tokens (single account, single purpose), never global keys.

## 8. Quality gates and testing

| Gate | Tool | Pass condition |
|---|---|---|
| Build | `astro build` | succeeds |
| Types | `astro check` | 0 errors |
| Smoke | Playwright | every route returns 200; nav, phone link, quote form present |
| Accessibility | `@axe-core/playwright` | 0 violations on every route |
| Lighthouse (mobile) | `@lhci/cli` against `preview` | Perf ≥ 90, A11y = 100, Best Practices ≥ 95, SEO = 100 |
| Dependencies | `pnpm audit` | no high/critical |

Automated checks don't catch everything. Manual accessibility and form checks are in
`docs/launch-checklist.md`.

## 9. Environments

| Environment | How | Who |
|---|---|---|
| Local | `pnpm dev` (no CSP), `pnpm preview` (with CSP) | Owner, Claude |
| Preview | `pnpm deploy:preview` → preview URL on Cloudflare | Claude may deploy |
| Production | `pnpm deploy:production` + custom domain | Owner only |

Until the client has paid in full, the domain, Cloudflare account and repo stay with the
studio. Ownership transfer steps are part of the handover in `docs/launch-checklist.md`.

## 10. What to revisit as the business grows

- Automating starter-template updates across client repos (e.g. a sync script).
- Adding a git-based CMS for clients who want to self-edit.
- Shared component package if more than ~10 client repos diverge too much.
- Uptime monitoring and monthly report automation (n8n on the home lab).
