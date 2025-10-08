import { test as base, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import 'dotenv/config';

const capabilities = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 11",
    build: "Playwright Demo",
    name: "Playwright Demo",
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: false,
    video: false,
    console: false
  },
};

// Extend Playwright test to use LambdaTest remote browser
type LambdaTestFixtures = {
  page: Page;
  context: BrowserContext;
  browser: Browser;
};

const test = base.extend<LambdaTestFixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`,
    });
    await use(browser);
    await browser.close();
  },

  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export default test;
