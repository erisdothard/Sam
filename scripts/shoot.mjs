/* Visual gate. Captures every route at 390 and 1440, full page, plus hero frames over time so the
   loop stack can be checked. Run against a production server:
     pnpm build && pnpm start -p 3100 &
     node scripts/shoot.mjs [label]          -> docs/review/<date>-<label>/              */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const BASE = process.env.SHOOT_URL ?? 'http://127.0.0.1:3100';
const day = new Date().toISOString().slice(0, 10);
const OUT = `docs/review/${day}-${process.argv[2] ?? 'gate'}`;
const ROUTES = ['/', '/shows', '/booking', '/lessons', '/about', '/media', '/nope'];
const VIEWPORTS = { m: { width: 390, height: 844 }, d: { width: 1440, height: 900 } };
const exe = ['/opt/pw-browsers/chromium'].find((p) => existsSync(p));

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch(exe ? { executablePath: exe } : { channel: 'chrome' });
const errors = [];

for (const [tag, viewport] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(`${tag} ${page.url()} ${m.text().slice(0, 160)}`));
  page.on('pageerror', (e) => errors.push(`${tag} PAGEERROR ${e.message.slice(0, 160)}`));
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
    if (route === '/') {
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/${tag}-home-hero.jpg`, quality: 78 });
    }
    // Scroll through so lazy images load, then capture the whole page.
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += viewport.height) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(250);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${tag}-${name}-full.jpg`, quality: 72, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) errors.push(`${tag} ${route} horizontal overflow ${overflow}px`);
  }
  await ctx.close();
}
await browser.close();
console.log(`shots in ${OUT}`);
console.log(errors.length ? errors.join('\n') : 'no console errors, no overflow');
