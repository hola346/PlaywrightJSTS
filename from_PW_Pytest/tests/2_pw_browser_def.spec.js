import { test, expect } from '@playwright/test';
const env = require('../config/env');

test.describe('browser definition @browser', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.env1.baseUrl + env.env1.routes.login);
    });
    test('browser definition', async ({ playwright }) => {
        let browser = await playwright.firefox.launch({ headless: false });
        let context = await browser.newContext();  // like incognito mode
        let page = await context.newPage();
        //await page.goto("http:\\www.google.com");
    });

    test('using page - shortcut', async ({ page }) => {
        await page.goto('http://www.eldiario.es');
    });

    // this is just to know it could be done. In reality does not make much sense, you should not reuse conditions from 1 test to the other
    // as they should be isolated. If you want to reuse a custom browser defintion, you may use playwright.config.js browserName for this, or 
    // set it on test.describe for all related tests:
    //test.use({
    //browserName: 'chromium',
    //headless: false, });
    test('using core Locators - LoginOK', async ({ page }) => {
        await page.getByLabel('Username').fill('rahulshettyacademy');
        await page.getByLabel('Password').fill('Learning@830$3mK2');
        await page.getByRole('radio', { name: 'user' }).click();
        await expect(
            page.getByRole('button', { name: 'Okay' })
        ).toBeVisible();
        await page.getByRole('button', { name: 'Okay' }).click();
        await page.getByRole('combobox').selectOption({ label: 'Consultant' });
        await page.getByRole('link', { name: 'terms and conditions' }).click();
        await page.getByRole('checkbox', { name: 'terms' }).click();
        await page.pause();

        await page.getByRole('button', { name: 'Sign In' }).click();
        //await page.pause();
    });

    test('Incorrect Login', async ({ page }) => {
        await page.getByLabel('Username').fill('rahulshettyacademy');
        await page.getByLabel('Password').fill('NoPass');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page.locator('.alert')).toContainText('Incorrect username/password');
        await expect(page.getByText('Incorrect username/password')).toBeVisible();
        await page.pause();
    });

    test('login in Firefox', async ({ playwright }) => { //not sure does make sense mix browsers within same test suit, just trying...
        const ffbrowser = await playwright.firefox.launch({ headless: false });
        const ffcontext = await ffbrowser.newContext();
        const ffpage = await ffcontext.newPage();

        await ffpage.goto(env.env1.baseUrl + env.env1.routes.login);

        await ffpage.getByLabel('Username').fill('rahulshettyacademy');
        await ffpage.getByLabel('Password').fill('Learning@830$3mK2');
        await ffpage.getByRole('button', { name: 'Sign In' }).click();
        await ffpage.pause();
    });

});








