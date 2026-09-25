import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const services = ["paver-patios", "outdoor-kitchens", "retaining-walls", "pool-decks"];
const projects = [
  "backyard-patio-st-augustine",
  "fire-pit-circle-nocatee",
  "pergola-kitchen-ponte-vedra",
  "travertine-pool-deck-st-augustine-beach",
  "seating-wall-world-golf-village",
  "shellstone-entry-walk-fruit-cove",
];

// Relative to baseURL (the GitHub Pages base path), so no leading slash.
const BASE = "/demo_website_showcase_v1/";
const routes = [
  "",
  "services/",
  ...services.map((s) => `services/${s}/`),
  "projects/",
  ...services.map((s) => `projects/type/${s}/`),
  ...projects.map((p) => `projects/${p}/`),
  "about/",
  "contact/",
  "privacy/",
  "accessibility/",
  "quote-demo/",
];

const PHONE = 'a[href="tel:+19045550142"]';

for (const route of routes) {
  test(`/${route}: loads, one h1, phone link, concept notice, no CSP errors, 0 axe violations`, async ({ page }) => {
    const cspErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && /Content Security Policy/i.test(msg.text())) cspErrors.push(msg.text());
    });

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(PHONE).first()).toBeAttached();
    await expect(page.getByText("Concept site by Perennial Studio")).toBeAttached();
    expect(cspErrors).toEqual([]);

    // Every internal link must include the base path, or it breaks on GitHub Pages.
    const internal = await page.locator('a[href^="/"]').evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(internal.filter((href) => !href?.startsWith(BASE))).toEqual([]);

    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(axe.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
}

test("unknown URL returns the 404 page", async ({ page }) => {
  const response = await page.goto("this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn’t find that page");
});

test("demo quote form shows the message and sends nothing", async ({ page }) => {
  await page.goto("contact/");
  const requests: string[] = [];
  page.on("request", (req) => requests.push(req.url()));

  const form = page.locator("[data-demo-form]");
  await form.getByLabel("Name").fill("Test Person");
  await form.getByLabel("Phone").fill("904-555-0100");
  await form.getByRole("button", { name: "Request my free quote" }).click();

  await expect(form.getByRole("status")).toContainText("nothing was sent");
  expect(page.url()).toMatch(/\/demo_website_showcase_v1\/contact\/$/);
  expect(requests).toEqual([]);
});

test("demo quote form without JS lands on /quote-demo/ with no data in the URL", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("contact/");
  const form = page.locator("[data-demo-form]");
  await form.getByLabel("Name").fill("Test Person");
  await form.getByLabel("Phone").fill("904-555-0100");
  await form.getByRole("button", { name: "Request my free quote" }).click();
  await expect(page).toHaveURL(/\/demo_website_showcase_v1\/quote-demo\/\??$/);
  await context.close();
});

test("mobile menu opens, closes with Escape and links work", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The mobile menu only shows on small screens");
  await page.goto("");
  const menu = page.locator("[data-mobile-menu]");
  await menu.locator("summary").click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  await expect(mobileNav).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(mobileNav).toBeHidden();
  await menu.locator("summary").click();
  await mobileNav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/demo_website_showcase_v1\/projects\/$/);
});
