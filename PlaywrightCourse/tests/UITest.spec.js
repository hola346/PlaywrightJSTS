const { test, expect } = require('@playwright/test');

test.describe('Test @test', () => {

    test('Browser context def', async ({ playwright }) => {
        const browser = await playwright.chromium.launch();
        const context = await browser.newContext(); // with this you'll have as incognito mode, but you could also include coockies or proxy in your () as param
        const page = await context.newPage();
        await page.goto('https://www.google.com');
    });

    test('test2', async ({ page }) => {
        await page.goto('https://www.google.com');
        await expect(page.getByTitle('Google')).toBeDefined();
        await expect(await page.title()).toBe('Google');
        await expect(page).toHaveTitle('Google');
    });

});