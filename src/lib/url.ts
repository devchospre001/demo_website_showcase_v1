/**
 * Prefixes an internal path with the site's base path.
 *
 * The site is served from a subfolder on GitHub Pages
 * (https://devchospre001.github.io/demo_website_showcase_v1/), so every internal link must
 * include `base` from astro.config.mjs. Never hard-code "/..." links: use `url("/...")`.
 * External, tel:, mailto: and in-page (#...) links pass through unchanged.
 */
export function url(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const rest = path.startsWith("/") ? path : `/${path}`;
  return `${base}${rest}`;
}
