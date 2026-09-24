# Launch checklist

Shared by every [Studio Name] client site. Do not edit in a client repo.
Claude completes the items marked **(Claude)** on the launch branch and reports results.
Items marked **(Owner)** are done by the studio owner. Copy this list into the launch pull
request and tick items as they're done.

## 1. Automated gates (Claude)

- [ ] `pnpm build` succeeds, `pnpm check` reports 0 errors
- [ ] `pnpm test`: all routes 200, axe reports 0 violations
- [ ] `pnpm lighthouse` (mobile): Perf ≥ 90, A11y = 100, Best Practices ≥ 95, SEO = 100
- [ ] `pnpm audit`: no high or critical vulnerabilities
- [ ] No `TODO(brief)` placeholders anywhere (`grep -r "TODO(brief)" src` returns nothing)

## 2. Content and facts (Claude checks, Owner confirms with client)

- [ ] Business name, phone, email, hours and service areas match `docs/brief.md` exactly
- [ ] Every service in the brief has a page; no services the client doesn't offer
- [ ] Every review is real, attributed, and matches its source
- [ ] License / insurance / years in business appear only if provided in the brief
- [ ] All photos are the client's real work (or clearly generic, e.g. textures)
- [ ] Spelling and grammar pass (US English)
- [ ] Client has approved the final copy in writing **(Owner)**

## 3. Accessibility, manual (Owner, 15 minutes)

- [ ] Keyboard only: Tab through every page. Focus is always visible, order makes sense,
      mobile menu and gallery open and close with keyboard (Esc closes)
- [ ] Screen reader smoke test (VoiceOver on Mac/iPhone or NVDA on Windows): home page
      headings and landmarks are announced sensibly, quote form fields read their labels
- [ ] Zoom the browser to 200%: nothing overlaps or gets cut off
- [ ] Phone in bright light: text is readable, buttons are easy to hit

## 4. SEO (Claude)

- [ ] `site` in `astro.config.mjs` is the client's production URL
- [ ] Unique title (under ~60 characters) and description (under ~155) on every page
- [ ] Canonical URLs point to the production domain
- [ ] `sitemap-index.xml` builds and lists every page; `robots.txt` references it
- [ ] LocalBusiness JSON-LD validates (Schema.org validator / Google Rich Results Test)
- [ ] Open Graph image and tags present for home and service pages
- [ ] 404 page returns status 404 and links back to home and contact

## 5. Security (Claude checks, Owner verifies on preview)

- [ ] `security.csp` enabled; every third-party origin used by the site is listed in the
      CSP config and in `spec.md`
- [ ] Browser console on preview shows no CSP violations on any page
- [ ] Headers present. Run `curl -sI https://<preview-url>/` and confirm
      `strict-transport-security`, `x-content-type-options`, `referrer-policy`,
      `permissions-policy`, `x-frame-options` and the `frame-ancestors` CSP header
- [ ] No secrets in the repo (`git log -p | grep -iE "api[_-]?key|secret|token"` reviewed)
- [ ] No `PUBLIC_` environment variable contains anything sensitive
- [ ] All `target="_blank"` links have `rel="noopener noreferrer"`

## 6. Forms and conversions (Owner)

- [ ] Submit a real test quote request on the preview. The client (or its field-service
      software) receives it within a few minutes, with all fields intact
- [ ] Option B only: Turnstile appears, a submission with the honeypot filled is rejected,
      oversized input is rejected
- [ ] Phone links dial the right number on a real phone
- [ ] Form success and error messages are clear and announced to screen readers
- [ ] Analytics (Cloudflare Web Analytics or Plausible) records a page view on preview

## 7. Go live (Owner)

- [ ] Production deploy: `pnpm deploy:production`
- [ ] Custom domain connected; `www` and apex both resolve, one redirects to the other
- [ ] HTTPS works on both; no mixed-content warnings
- [ ] Old site's important URLs redirect (301) to their new equivalents, if replacing a site
- [ ] Uptime monitor added (UptimeRobot or Uptime Kuma)
- [ ] Registrar lock and 2FA confirmed on the domain account

## 8. After launch (Owner, first week)

- [ ] Google Search Console: property verified, sitemap submitted
- [ ] Google Business Profile: website link updated to the new site (client or with access)
- [ ] Bing Webmaster Tools: sitemap submitted
- [ ] Lighthouse re-run on production URL matches preview scores
- [ ] Handover email sent to client: what was launched, how to request edits (care plan),
      response times, and what's included each month

## 9. Ownership transfer (Owner, only after final payment)

- [ ] Domain transferred to the client's registrar account (or client added as owner)
- [ ] Repo transferred or a full copy delivered
- [ ] Cloudflare: site moved to the client's account, or documented as studio-hosted under
      the care plan
- [ ] All shared credentials rotated; studio access reduced to what the care plan needs
