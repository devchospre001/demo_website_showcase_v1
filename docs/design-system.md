# Design system

Shared by every Perennial Studio client site. Do not edit in a client repo.
A client's own values (colors, fonts) go in the `@theme` block and are recorded in the
"Design tokens" section of `docs/spec.md`.

## 1. Principles

1. **The work is the hero.** Landscaping sells on photos. Big, real project images;
   restrained UI around them.
2. **One obvious next step.** Every screen offers a quote request or a call.
3. **Trust before style.** Reviews, service areas and licensing (when provided) sit near
   the top, not buried.
4. **Readable outdoors.** High contrast, generous text size, large tap targets: people
   browse these sites on phones, often outside.
5. **Tokens, not values.** Components never contain raw colors, fonts or radii.

## 2. Tokens

All tokens are semantic (named by role, not by color). Re-branding a site = changing
values here only.

### Tailwind tokens (`src/styles/global.css`)

```css
@import "tailwindcss";

@theme {
  /* Color: roles */
  --color-brand: #2F5D3A;          /* primary actions, links, key accents */
  --color-brand-strong: #234A2D;   /* hover/active state of brand */
  --color-on-brand: #FFFFFF;       /* text/icons on brand backgrounds */
  --color-accent: #C8A96A;         /* decorative only: dividers, badges, highlights */
  --color-ink: #1F2421;            /* body text */
  --color-ink-muted: #4A524D;      /* secondary text */
  --color-surface: #FFFFFF;        /* page background */
  --color-surface-alt: #F4F1EA;    /* alternating sections, cards */
  --color-border: #DDD6C8;
  --color-success: #2E7D4F;
  --color-danger: #B3261E;

  /* Type */
  --font-heading: "Fraunces", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;

  /* Shape and depth */
  --radius-button: 0.5rem;
  --radius-card: 0.75rem;
  --shadow-card: 0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.06);
}

:root {
  /* Layout tokens used by the Section and Container components */
  --container-max: 75rem;          /* 1200px */
  --gutter: 1.25rem;               /* side padding on mobile */
  --section-y: clamp(3.5rem, 8vw, 6rem);
}
```

Usage: `bg-brand`, `text-on-brand`, `text-ink-muted`, `bg-surface-alt`, `border-border`,
`font-heading`, `rounded-card`, `shadow-card`.

The values above are the **studio defaults** (deep green + sandstone), used for spec
sites and when a client has no brand. Replace them with the client's values.

### Contrast rules (check every time values change)

| Pair | Minimum | Studio default |
|---|---|---|
| `ink` on `surface` / `surface-alt` | 4.5:1 | passes |
| `on-brand` on `brand` | 4.5:1 | passes (about 7.7:1) |
| `ink-muted` on `surface` | 4.5:1 | passes |
| `accent` as text on light backgrounds | not allowed | about 2.3:1, so decorative only |
| `ink` on `accent` (e.g. badge) | 4.5:1 | passes |

If a client's brand color fails 4.5:1 against white, keep it for decoration and derive a
darker `brand` for text and buttons. Never ship a failing pair.

### Type scale

Use Tailwind's default scale, mapped to roles:

| Role | Mobile | Desktop | Font |
|---|---|---|---|
| Page title (`h1`) | `text-4xl` | `text-6xl` | heading, weight 600 |
| Section title (`h2`) | `text-3xl` | `text-4xl` | heading, weight 600 |
| Card title (`h3`) | `text-xl` | `text-2xl` | heading, weight 600 |
| Body | `text-lg` | `text-lg` | body, weight 400, `leading-relaxed` |
| Small / meta | `text-sm` | `text-sm` | body, `text-ink-muted` |

Body text never below 16px. Line length 60–75 characters (`max-w-prose`).

### Fonts

- Maximum two families (heading + body), maximum two weights each.
- Self-hosted `woff2` files with `font-display: swap`. No Google Fonts requests at runtime.
- Preload only the body font's regular weight.

## 3. Layout

- Mobile-first. Tailwind default breakpoints (`sm`, `md`, `lg`, `xl`).
- Content width: `Container` component (max `--container-max`, side padding `--gutter`).
- Vertical rhythm: every section uses the `Section` component (`--section-y` padding).
  Alternate `surface` and `surface-alt` backgrounds between sections.
- Grids: 1 column on mobile, 2 at `md`, 3 at `lg` for cards and galleries.
- Sticky header on scroll with a visible phone number / call button on mobile.

## 4. Imagery

- **Real project photos only.** Never stock photos presented as the client's work, never
  AI-generated images presented as real projects.
- Aspect ratios: hero 16:9 (mobile crop 4:5), gallery 4:3, service cards 3:2.
- All images through `<Image>` / `<Picture>` from `src/assets/`. Hero image preloaded;
  everything below the fold lazy-loaded.
- Alt text describes the work and place: "Paver patio with fire pit in a Matthews backyard",
  not "image1" or "beautiful patio".
- Text over images always sits on a dark overlay that keeps it at 4.5:1 or better.

## 5. Components (`src/components/ui/`)

| Component | Variants | Rules |
|---|---|---|
| `Button` | `primary`, `secondary`, `ghost`; sizes `md`, `lg` | Renders `<a>` when given `href`, else `<button>`. Min 44×44px. Visible focus ring. |
| `Container` | none | Max width + gutters from layout tokens |
| `Section` | `surface`, `alt`, `brand` backgrounds | Handles vertical padding and optional heading |
| `Card` | `default`, `image` | `rounded-card`, `shadow-card`, whole card clickable via one link |
| `Badge` | `default`, `accent` | Short labels only ("Licensed & insured") |
| `Icon` | name prop | Inline SVG, `aria-hidden="true"` unless it carries meaning |
| `Rating` | none | Stars + text value ("4.9 out of 5"), never stars alone |

Button styles:

- `primary`: `bg-brand text-on-brand`, hover `bg-brand-strong`
- `secondary`: brand-colored border and text on transparent background
- `ghost`: text-only, for tertiary actions

## 6. Section library (`src/components/sections/`)

| Section | Purpose | JS |
|---|---|---|
| `SiteHeader` | Logo, nav, phone button, mobile menu | Small script: menu toggle, focus trap, Esc to close |
| `Hero` | Headline, one-line promise, primary CTA (quote) + secondary (call), trust line | None |
| `TrustBar` | Rating, review count, licensed/insured, years (only facts from the brief) | None |
| `ServicesGrid` | Cards linking to service pages | None |
| `ProjectGallery` | Project photos grid | Small script: lightbox with keyboard support; works as plain links without JS |
| `BeforeAfter` | Before and after photos side by side, labeled | None (no drag sliders) |
| `ProcessSteps` | 3–5 steps from first call to finished project | None |
| `Reviews` | Real reviews with source and date | None |
| `ServiceAreas` | Cities served, links to area pages if they exist | None |
| `FAQ` | Common questions | None: native `<details>` / `<summary>` |
| `CTABand` | Full-width closing call to action | None |
| `QuoteForm` | Option A embed or Option B native form | Only what the chosen option needs |
| `SiteFooter` | Contact info, hours, areas, legal links | None |

Default home page order: `Hero` → `TrustBar` → `ServicesGrid` → `ProjectGallery`
(featured) → `ProcessSteps` → `Reviews` → `ServiceAreas` → `FAQ` → `CTABand`.

## 7. Interaction and motion

- Hover and focus states on every interactive element. Focus is never removed, only styled.
- Motion is subtle (fades, small translations under 200ms) and fully disabled under
  `prefers-reduced-motion: reduce`.
- No carousels or auto-playing sliders for important content. No pop-ups.

## 8. Voice and copy

- Plain, confident, local. Talk like a trusted crew lead, not a marketing agency.
- Lead with outcomes: "A patio you'll use every evening", then how.
- Specific over generic: name the materials, cities and project types.
- Headlines under 10 words. Paragraphs under 4 sentences.
- CTA labels say what happens: "Get a free quote", "Call (704) 555-0123", not "Submit"
  or "Learn more".
- Never invent claims, numbers or reviews. If it's not in `docs/brief.md`, ask.
