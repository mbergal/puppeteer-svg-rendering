/* @flow */
var fs = require("fs");
var puppeteer = require("puppeteer");

const timeout = ms => new Promise(res => setTimeout(res, ms));

async function test(useTimeout, outputFileName) {
  var testContent = fs.readFileSync("test.html", "utf-8");

  var browser = await puppeteer.launch({ headless: false });
  var page = await browser.newPage();
  await page.setContent(testContent);

  if (useTimeout) {
    await timeout(1000);
  }

  var imageBuffer = await page.screenshot({
    type: "jpeg",
    fullPage: true
  });
  fs.writeFileSync(outputFileName, imageBuffer);
  await page.close();
  browser.close();
}

test(true, "test.jpg");
test(true, "test-with-timeout.jpg");
