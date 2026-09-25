// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Hosted on GitHub Pages as a project site: https://devchospre001.github.io/demo_website_showcase_v1/
  // Every internal link goes through url() in src/lib/url.ts so it includes `base`.
  site: "https://devchospre001.github.io",
  base: "/demo_website_showcase_v1",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // Utility pages stay out of the sitemap.
      filter: (page) => !page.includes("/quote-demo/") && !page.includes("/404"),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  security: {
    csp: true,
  },
  // Downloaded at build time and self-hosted. Nothing loads from Google at runtime.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      weights: [600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Sans",
      cssVariable: "--font-instrument",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
});
