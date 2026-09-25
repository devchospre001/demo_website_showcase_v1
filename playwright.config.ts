import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (`astro preview`), so CSP is active during tests.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    // The site lives under the GitHub Pages base path (astro.config.mjs `base`).
    // Tests use relative paths ("services/") so they resolve inside it.
    baseURL: "http://localhost:4321/demo_website_showcase_v1/",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm build && pnpm preview",
    url: "http://localhost:4321/demo_website_showcase_v1/",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
  ],
});
