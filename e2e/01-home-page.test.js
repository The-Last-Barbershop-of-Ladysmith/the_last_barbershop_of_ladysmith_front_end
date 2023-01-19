const puppeteer = require("puppeteer");
const { setDefaultOptions } = require('expect-puppeteer');
const fs = require("fs");
const fsPromises = fs.promises;

const baseURL = process.env.BASE_URL || "http://localhost:3000";

/**Function displays message on page console */
const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("01 - Home Page - E2E", () => {
  let page;
  let browser;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 600000 });
    browser = await puppeteer.launch({
      args: ['--window-size=1920x1080']
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    page.on("console", onPageConsole);
    await page.goto(baseURL, { waitUntil: 'networkidle0' });
    //Set timeout for 5 seconds to allow for loading and animations to complete before each test
    await page.waitForTimeout(5000)
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("Main Content", () => {

    test("The home page contains button to schedule an appointment", async () => {
      const scheduleButton = await page.$(".scheduleBtn")

      if (!scheduleButton) {
        throw new Error("Schedule Appointment Button Not Found");
      }

      await page.screenshot({
        path: ".screenshots/01-schedule-before.png",
        fullPage: true,
      });

      await Promise.all([
        scheduleButton.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);

      await page.screenshot({
        path: ".screenshots/01-schedule-after.png",
        fullPage: true,
      });

      expect(page.url()).toContain("schedule")
    })
  })

  describe("Navigation", () => {

    test("The home page of the website contains navigation bar", async () => {
      const navigation = await page.waitForSelector('nav')

      if (!navigation) {
        throw new Error("Navigation Not found");
      }

      await page.screenshot({
        path: ".screenshots/01-home-page.png",
        fullPage: true,
      });
      expect(navigation).toBeTruthy()
    });

    
    /** Test function to be run for a Navigation link given the link Name
     * @param linkName  name of the link to be in the Navigation
     * 
     * Checks that the nav element contains an element with class name of "nav-link" with the given name
     * and that the element redirects user to a {baseUrl} / {linkName} on click
     */
    const linkTest = async (linkName) => {
      test(`The navigation bar contains ${linkName} link and navigates to /${linkName}`, async () => {
        const [element] =
          await page.$x(`
            //*[contains(@class,'nav-link') 
            and contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), '${linkName}')]
          `)

        if (!element) {
          throw new Error(`${linkName} Link Not found`);
        }

        await page.screenshot({
          path: `.screenshots/01-${linkName}-before.png`,
          fullPage: true,
        });

        await Promise.all([
          element.click(),
          page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        await page.screenshot({
          path: `.screenshots/01-${linkName}-after.png`,
          fullPage: true,
        });

        expect(page.url()).toContain(`${linkName}`)
      });
    }

    linkTest("Gallery")
    linkTest("About")
    linkTest("Contact")

  });
});
