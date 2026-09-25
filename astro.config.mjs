// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Demo: replace with the preview URL after the first `pnpm deploy:preview`.
  site: "https://coquina-stoneworks.example.com",
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
