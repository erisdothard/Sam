/* Reference board capture. Each site at 1440x900 (four scroll positions) and 390x844 (hero), then
   a contact sheet per site: docs/inspo/sheet-<key>.jpg. Raw PNGs stay local (git-ignored).
     node scripts/inspo.mjs                 # every site below
     node scripts/inspo.mjs tash elise      # just these keys                                  */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SITES = {
  tash: 'https://www.tashsultana.com',
  elise: 'https://www.elisetrouw.com',
  rebillet: 'https://www.marcrebillet.com',
  collier: 'https://www.jacobcollier.com',
  reggie: 'https://www.reggiewatts.com',
  bird: 'https://www.andrewbird.net',
  tunstall: 'https://www.kttunstall.com',
  vulfpeck: 'https://vulfpeck.com',
  khruangbin: 'https://www.khruangbin.com',
  corywong: 'https://www.corywongmusic.com',
  swallowhill: 'https://www.swallowhillmusic.org',
  cabincreek: 'https://www.cabincreekbrewing.com',
  fredagain: 'https://www.fredagain.com',
  bonobo: 'https://www.bonobomusic.com',
};

const OUT = 'docs/inspo';
await mkdir(OUT, { recursive: true });
const want = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const [key, url] of Object.entries(SITES)) {
  if (want.length && !want.includes(key)) continue;
  try {
    const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await d.goto(url, { waitUntil: 'load', timeout: 45000 });
    await d.waitForTimeout(3500);
    const h = await d.evaluate(() => document.documentElement.scrollHeight);
    const shots = [];
    for (let i = 0; i < 4; i++) {
      await d.evaluate((y) => window.scrollTo(0, y), Math.min(i * 900, Math.max(0, h - 900)));
      await d.waitForTimeout(1200);
      const f = `${OUT}/${key}-d${i}.png`;
      await d.screenshot({ path: f });
      shots.push(f);
    }
    await d.close();
    const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
    await m.goto(url, { waitUntil: 'load', timeout: 45000 });
    await m.waitForTimeout(3500);
    const mf = `${OUT}/${key}-m0.png`;
    await m.screenshot({ path: mf });
    await m.close();
    // Sheet: 2x2 desktop at 720x450 each, phone hero at 390x844 scaled to 900 tall on the right.
    const tiles = await Promise.all(shots.map((f) => sharp(f).resize(720, 450).toBuffer()));
    const phone = await sharp(mf).resize({ height: 900 }).toBuffer();
    const pw = (await sharp(phone).metadata()).width;
    await sharp({ create: { width: 1440 + 16 + pw, height: 900, channels: 3, background: '#ffffff' } })
      .composite([
        { input: tiles[0], left: 0, top: 0 },
        { input: tiles[1], left: 720, top: 0 },
        { input: tiles[2], left: 0, top: 450 },
        { input: tiles[3], left: 720, top: 450 },
        { input: phone, left: 1456, top: 0 },
      ])
      .jpeg({ quality: 70 })
      .toFile(`${OUT}/sheet-${key}.jpg`);
    console.log(`ok   ${key}  ${h}px`);
  } catch (e) {
    console.log(`FAIL ${key}  ${e.message.split('\n')[0]}`);
  }
}
await browser.close();
