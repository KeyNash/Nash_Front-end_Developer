import { chromium } from "playwright";

const baseUrl = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const viewport of [
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "mobile-375", width: 375, height: 812 },
]) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce", colorScheme: "light" });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += Math.max(300, window.innerHeight * 0.75)) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `docs/screenshots/portfolio-home-${viewport.name}.png`, fullPage: true });
  await context.close();
}

await browser.close();
