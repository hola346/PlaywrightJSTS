

import { expect } from '@playwright/test';
const { test } = require('../Fixtures/my-fixtures');

const cred = require('../Fixtures/credentials.json')

const url = "https://www.saucedemo.com";

test.describe('Login @login3', () => {
    test.beforeEach(async ({ page, login }) => {
        await page.goto(url);
        await login(cred.ok_user, cred.password);
    });

    test('checking after login', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*inventory/);
        await expect(page.locator('.title')).toHaveText('Products');

    });

    test('Blocked user after login', async ({ page, login }) => {
        await page.goto(url);
        await login(cred.locked_user, cred.password);

        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Incorrect pass after login', async ({ page, login }) => {
        await page.goto(url);
        await expect(page).toHaveTitle('Swag Labs');
        await login(cred.ok_user, cred.ko_password);

        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
});


/*
const currentUrl = new URL(page.url());

console.log(currentUrl.protocol); // e.g., "http:"
console.log(currentUrl.hostname); // e.g., "localhost"
console.log(currentUrl.pathname); // e.g., "/dashboard"
console.log(currentUrl.port);     // e.g., "3000"
*/