/* Behaviour checks against a running server (pnpm build && pnpm start -p 3100):
     node scripts/check.mjs
   Video play/stop, booking form (API + email fallback), lesson preselect, phone menu, 404. */
import { chromium } from 'playwright';

const BASE = process.env.CHECK_URL ?? 'http://127.0.0.1:3100';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const results = [];
const ok = (name, pass, detail = '') => results.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);

// 1. Videos: one plays in place, starting another stops the first, the caption ring lights.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route('**/youtube-nocookie.com/**', (r) => r.fulfill({ status: 200, body: '<html></html>', contentType: 'text/html' }));
  await page.goto(BASE + '/');
  const tiles = page.locator('figure');
  ok('home shows 3 videos', (await tiles.count()) === 3, String(await tiles.count()));
  await tiles.nth(0).getByRole('button').click();
  ok('first video loads player in place', (await tiles.nth(0).locator('iframe').count()) === 1);
  ok('caption ring lit while playing', (await tiles.nth(0).locator('figcaption .ring-knob').getAttribute('data-lit')) === 'true');
  await tiles.nth(1).getByRole('button').click();
  ok('second video plays', (await tiles.nth(1).locator('iframe').count()) === 1);
  ok('first video stops', (await tiles.nth(0).locator('iframe').count()) === 0);
  const src = await tiles.nth(1).locator('iframe').getAttribute('src');
  ok('player is youtube-nocookie with autoplay', /youtube-nocookie\.com\/embed\/.+autoplay=1/.test(src ?? ''), src ?? '');
  await page.close();
}

// 2. Booking form: API answers 501 without mail config, the page falls back to a filled email.
{
  const page = await browser.newPage();
  let api = null;
  page.on('response', (r) => r.url().endsWith('/api/booking') && (api = r.status()));
  let mailto = null;
  await page.addInitScript(() => {
    const assign = Object.getOwnPropertyDescriptor(window.Location.prototype, 'href');
    Object.defineProperty(window.Location.prototype, 'href', {
      set(v) { if (String(v).startsWith('mailto:')) { window.__mailto = v; return; } assign.set.call(this, v); },
      get() { return assign.get.call(this); },
    });
  });
  await page.goto(BASE + '/booking');
  await page.getByLabel('Name').fill('Test Person');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('What you are after').selectOption('Jazz Standards');
  await page.getByLabel('Date', { exact: true }).fill('2027-02-14');
  await page.getByLabel('Where').fill('Silver Plume');
  await page.getByRole('button', { name: 'Send it' }).click();
  await page.waitForTimeout(800);
  mailto = await page.getByRole('status').getByRole('link').getAttribute('href').catch(() => null);
  ok('form posts to /api/booking', api === 501, `status ${api}`);
  ok('falls back to a filled email', !!mailto && mailto.includes('Jazz%20Standards') && mailto.includes('2027-02-14'), (mailto ?? 'none').slice(0, 90));
  ok('status message shown', (await page.getByRole('status').innerText()).length > 0);
  // Required fields stop an empty submit.
  await page.goto(BASE + '/booking');
  await page.getByRole('button', { name: 'Send it' }).click();
  ok('empty form is blocked by required fields', (await page.evaluate(() => document.querySelector('form').checkValidity())) === false);
  await page.close();
}

// 3. API validation.
{
  const bad = await fetch(BASE + '/api/booking', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"name":"x"}' });
  ok('API rejects missing fields', bad.status === 422, String(bad.status));
  const bot = await fetch(BASE + '/api/booking', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"website":"spam"}' });
  ok('API swallows honeypot', bot.status === 200, String(bot.status));
}

// 4. Lessons CTA preselects "Lessons" on the form.
{
  const page = await browser.newPage();
  await page.goto(BASE + '/lessons');
  await page.locator('main').getByRole('link', { name: 'Book lessons' }).click();
  await page.waitForURL(/booking/);
  await page.waitForTimeout(400);
  ok('lessons link preselects Lessons', (await page.getByLabel('What you are after').inputValue()) === 'Lessons');
  await page.close();
}

// 5. Phone menu opens, navigates, closes.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.goto(BASE + '/');
  await page.getByRole('button', { name: 'Menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  ok('phone menu opens', await dialog.isVisible());
  await dialog.getByRole('link', { name: 'Lessons' }).click();
  await page.waitForURL(/lessons/);
  await page.waitForTimeout(300);
  ok('menu link navigates and closes', !(await dialog.isVisible()));
  await page.close();
}

// 6. 404 and shows.
{
  const r = await fetch(BASE + '/nope');
  ok('unknown route is a 404', r.status === 404, String(r.status));
  const page = await browser.newPage();
  await page.goto(BASE + '/shows');
  ok('shows has an earlier-shows disclosure above coming up', (await page.locator('details').count()) === 1);
  await page.close();
}

await browser.close();
console.log(results.join('\n'));
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
