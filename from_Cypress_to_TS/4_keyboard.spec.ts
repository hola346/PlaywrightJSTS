import { test, expect } from '@playwright/test';

test.describe('Keyboard Vel @key', () => {
    test.beforeEach(async ({ page }) => {
        console.log('Runs before each test');
        await page.goto('https://saucedemo.com');
    });
    test('Slow Keyboard', async ({ page }) => {
        await page.getByPlaceholder("Username").pressSequentially("hola1",{ delay: 500 })
    });
    test('Normal Keyboard', async ({ page }) => {
        await page.getByPlaceholder("Username").pressSequentially("hola2",{ delay: 500 })
    });
    test('No delay Keyboard', async ({ page }) => {
        await page.getByPlaceholder("Username").fill("hola3")
    });
});