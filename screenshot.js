const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 375, height: 812});
  await page.goto('https://riscoin.com/h5/#/standardContract', {waitUntil: 'networkidle2'});
  // Wait a few seconds for SPA to render
  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({path: 'riscoin_mobile.png'});
  await browser.close();
  console.log("Screenshot saved to riscoin_mobile.png");
})();
