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
    page.on("console", onPageConsole);
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/", () => {
    test("The home page of the website contains navigation bar", async () => {
        await page.goto(`${baseURL}`, { waitUntil: "networkidle0" });
        const navigation = await page.waitForSelector('nav')
  
        if (!navigation) {
          throw new Error("Navigation Not found");
        }
  
        await page.screenshot({
          path: ".screenshots/01-home-page.png",
          fullPage: true,
        });
        expect(navigation).toBeTruthy;
    });
  });
});