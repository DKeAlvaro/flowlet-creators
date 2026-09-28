const { chromium } = require('/root/.npm/_npx/e058441c325e062a/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROME_BIN,
    args: ['--no-sandbox']
  });
  const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  await p.goto(process.argv[2], { waitUntil: 'networkidle', timeout: 45000 });
  await p.waitForTimeout(600);
  await p.screenshot({ path: process.argv[3], type: 'webp' });
  await b.close();
  console.log('SHOT_OK');
})().catch(e => { console.error('SHOT_FAIL', e.message); process.exit(1); });