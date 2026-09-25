import { chromium } from "playwright";

const baseUrl = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000";
const routes = ["/", "/work", "/work/juaduka-pos", "/about", "/contact"];
const widths = [320, 375, 768, 1024, 1440];
const failures = [];
const results = [];

const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => ({
      title: document.title,
      textLength: document.body.innerText.trim().length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      overlay: Boolean(document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")),
    }));
    const record = { width, route, http: response?.status() ?? 0, errors: [...consoleErrors], ...result };
    results.push(record);
    if (record.http >= 400 || record.textLength < 40 || record.overflow || record.overlay || record.errors.length) failures.push(record);
    consoleErrors.length = 0;
  }

  if (width === 375) {
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const menuButton = page.getByRole("button", { name: "Open menu" });
    if (!(await menuButton.isVisible())) failures.push({ width, route: "/", issue: "Mobile menu button missing" });
    await menuButton.click();
    if (!(await page.getByRole("link", { name: "Work", exact: true }).isVisible())) failures.push({ width, route: "/", issue: "Mobile navigation did not open" });
    await page.getByRole("button", { name: "Toggle color theme" }).click();
    if ((await page.locator("html").getAttribute("data-theme")) !== "dark") failures.push({ width, route: "/", issue: "Theme toggle did not set dark theme" });

    await page.goto(`${baseUrl}/work`, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "Concept work", exact: true }).click();
    await page.waitForURL("**/work?type=Concept%20work");
    if ((await page.locator(".project-card").count()) !== 3) failures.push({ width, route: "/work?type=Concept%20work", issue: "Project filter count is not 3" });

    await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
    await page.getByLabel("Name").fill("Portfolio verifier");
    await page.getByLabel("Email").fill("verify@example.com");
    await page.getByLabel("What are you building?").fill("Verification project");
    await page.getByLabel("Message").fill("This is a local verification message and should not leave the machine.");
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await page.waitForFunction(() => document.querySelector("[role='status']")?.textContent?.includes("Email is not configured yet"), null, { timeout: 10_000 });
    const status = await page.getByRole("status").textContent();
    if (!status?.includes("Email is not configured yet")) failures.push({ width, route: "/contact", contactStatus: status });

    await page.goto(`${baseUrl}/work/mahabu-media-services`, { waitUntil: "networkidle" });
    if (await page.getByRole("link", { name: "Visit live project" }).count()) failures.push({ width, route: "/work/mahabu-media-services", issue: "Stale deployment exposed" });
    await page.goto(`${baseUrl}/work/koromosho-springs`, { waitUntil: "networkidle" });
    if (await page.getByRole("link", { name: "Visit live project" }).count()) failures.push({ width, route: "/work/koromosho-springs", issue: "Stale deployment exposed" });
    await page.goto(`${baseUrl}/work/mamu-atelier`, { waitUntil: "networkidle" });
    if ((await page.getByRole("link", { name: "Visit live project" }).count()) !== 1) failures.push({ width, route: "/work/mamu-atelier", issue: "Current live link missing" });
  }

  await context.close();
}

await browser.close();
console.log(JSON.stringify({ checked: results.length, failures, results }, null, 2));
if (failures.length) process.exitCode = 1;
