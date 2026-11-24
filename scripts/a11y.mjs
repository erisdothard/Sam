/* Accessibility gate: axe-core (WCAG 2.1 A/AA) on every route at 390 and 1440, keyboard focus order,
   touch-target sizes on phones, and 200% zoom overflow. Run against pnpm start -p 3100. */
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const BASE = process.env.CHECK_URL ?? 'http://127.0.0.1:3100';
const axe = await readFile(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const ROUTES = ['/', '/shows', '/booking', '/lessons', '/about', '/media', '/nope'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let problems = 0;

for (const [tag, vp] of [['m', { width: 390, height: 844 }], ['d', { width: 1440, height: 900 }]]) {
  const page = await browser.newPage({ viewport: vp });
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(async () =>
      (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } })).violations.map((v) => ({
        id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, target: v.nodes[0]?.target?.join(' '), why: v.nodes[0]?.failureSummary?.split('\n')[1]?.trim(),
      })),
    );
    for (const v of res) { problems++; console.log(`AXE ${tag} ${r}  ${v.impact}  ${v.id} x${v.n}  ${v.help}  @ ${v.target}  ${v.why ?? ''}`); }
    if (tag === 'm') {
      // Touch targets under 44px tall (inline text links in sentences are exempt under 2.5.5's inline rule).
      const small = await page.evaluate(() => [...document.querySelectorAll('a,button,select,input,textarea,summary')]
        .filter((el) => el.offsetParent !== null && !el.closest('p, li p'))
        .map((el) => ({ el, b: el.getBoundingClientRect() }))
        .filter(({ b }) => b.width > 0 && (b.height < 44 && b.width < 44 || b.height < 24))
        .map(({ el, b }) => `${el.tagName.toLowerCase()} "${(el.innerText || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 28)}" ${Math.round(b.width)}x${Math.round(b.height)}`));
      for (const s of small) console.log(`TARGET ${r}  ${s}`);
    }
  }
  await page.close();
}

// Keyboard: tab through home, every stop must show a visible focus outline.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/');
  const stops = [];
  for (let i = 0; i < 18; i++) {
    await page.keyboard.press('Tab');
    stops.push(await page.evaluate(() => {
      const el = document.activeElement; const cs = getComputedStyle(el);
      const visible = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
      return `${el.tagName.toLowerCase()}:${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 22)}${visible ? '' : ' [NO FOCUS RING]'}`;
    }));
  }
  console.log('TAB  ' + stops.join(' | '));
  if (stops.some((s) => s.includes('NO FOCUS'))) problems++;
  await page.close();
}

// 200% zoom: 1280 wide at 2x zoom == 640 CSS px. No horizontal scroll.
{
  const page = await browser.newPage({ viewport: { width: 640, height: 800 } });
  for (const r of ROUTES) {
    await page.goto(BASE + r);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (over > 0) { problems++; console.log(`ZOOM ${r} overflow ${over}px`); }
  }
  await page.close();
}
await browser.close();
console.log(problems ? `${problems} problem(s)` : 'a11y: clean');
