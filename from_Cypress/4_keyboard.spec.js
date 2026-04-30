import { test, expect } from '@playwright/test';

test.describe('Keyboard Vel @key', () => {
    test.beforeEach(async ({ page }) => {
        console.log('Runs before each test');
        await page.goto('https://saucedemo.com');
    });
    test('Slow Keyboard', { keystrokeDelay: 500 }, async ({ page }) => {
        await page.getByPlaceholder("Username").fill("hola1")
    });
    test('Normal Keyboard', async ({ page }) => {
        await page.getByPlaceholder("Username").fill("hola2")
    });
    test('No delay Keyboard', { keystrokeDelay: 0 }, async ({ page }) => {
        await page.getByPlaceholder("Username").fill("hola3")
    });
});