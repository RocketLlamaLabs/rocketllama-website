const { chromium } = require('playwright');
(async () => {
  const [file, out, tag] = process.argv.slice(2);
  const b = await chromium.launch(); const errs = [];
  const p = await b.newPage({ viewport: { width: 1366, height: 900 } }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('file:///home/user/rocketllama-website/mockups/' + file, { waitUntil: 'load' }); await p.waitForTimeout(600);
  const pages = await p.$$eval('.page', e => e.map(x => x.id.replace('page-', '')));
  const ld = await p.$$eval('script[type="application/ld+json"]', e => e.map(s => { try { JSON.parse(s.textContent); return 'ok'; } catch (err) { return 'BAD: ' + err.message; } }));
  console.log('pages:', pages.join(' '), '| json-ld:', ld.join(','));
  for (const pg of pages) {
    await p.evaluate(h => { location.hash = h; }, pg); await p.waitForTimeout(500);
    await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'))); await p.waitForTimeout(200);
    const h1 = await p.$$eval('.page.active h1', e => e.length);
    const blues = await p.$$eval('.btn-primary', e => e.filter(x => x.offsetParent !== null).length);
    const title = await p.title();
    await p.screenshot({ path: `${out}/${tag}-${pg}.png`, fullPage: true });
    console.log(pg, '| h1:', h1, '| blue visible:', blues, '|', title);
  }
  await p.close();
  const m = await b.newPage({ viewport: { width: 390, height: 844 } }); m.on('pageerror', e => errs.push('mobile: ' + e.message));
  await m.goto('file:///home/user/rocketllama-website/mockups/' + file + '#home', { waitUntil: 'load' }); await m.waitForTimeout(600);
  await m.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  await m.screenshot({ path: `${out}/${tag}-home-mobile.png`, fullPage: true });
  const bar = await m.$eval('.actionbar', e => getComputedStyle(e).display);
  console.log('mobile action bar:', bar);
  await m.close(); await b.close();
  console.log('errors:', errs.length ? errs.join('\n') : 'none');
})();
