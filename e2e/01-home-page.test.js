const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("01 - Home Page - E2E", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 6000 });
    browser = await puppeteer.launch({ args: [
      '--no-sandbox',
      '--headless',
      '--disable-gpu',
      '--window-size=1920x1080']});
  });

  beforeEach(async () => {
    page = await browser.newPage();
    console.log(await page.content());
    page.on("console", onPageConsole);
    await page.goto('http://localhost:3000');
    await page.screenshot({
      path: ".screenshots/01-home-page.png",
      fullPage: true,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/", () => {
    test("The home page of the website contains navigations", async () => {
        await page.goto(`${baseURL}`, { waitUntil: "networkidle0" });
        console.log("Test 1", await page.content());
        const [navigation] = await page.waitForSelector('nav')
  
        if (!navigation) {
          throw new Error("Navigation Not found");
        }
  
        await page.screenshot({
          path: ".screenshots/us-01-cancel-before.png",
          fullPage: true,
        });
  
        await page.screenshot({
          path: ".screenshots/01-home-page.png",
          fullPage: true,
        });
  
        expect(navigation).toBe('true');
    });

  //   test("canceling form returns to previous page", async () => {
  //     await page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle0" });
  //     await page.goto(`${baseURL}/reservations/new`, {
  //       waitUntil: "networkidle0",
  //     });

  //     const [cancelButton] = await page.$x(
  //       "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'cancel')]"
  //     );

  //     if (!cancelButton) {
  //       throw new Error("button containing cancel not found.");
  //     }

  //     await page.screenshot({
  //       path: ".screenshots/us-01-cancel-before.png",
  //       fullPage: true,
  //     });

  //     await Promise.all([
  //       cancelButton.click(),
  //       page.waitForNavigation({ waitUntil: "networkidle0" }),
  //     ]);

  //     await page.screenshot({
  //       path: ".screenshots/us-01-cancel-after.png",
  //       fullPage: true,
  //     });

  //     expect(page.url()).toContain("/dashboard");
  //   });
  });
});