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
    setDefaultOptions({ timeout: 1000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}/`, { waitUntil: "load" });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/", () => {
    test("The home page of the website contains navigations", async () => {
        await page.goto(`${baseURL}/`, { waitUntil: "networkidle0" });
  
        const [navigation] = await page.$('nav');
  
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