

import { expect } from '@playwright/test';
const { test } = require('../Fixtures/my-fixtures');

const userId = "standard_user";
const password = "secret_sauce";

const url = "https://www.saucedemo.com";

test.describe('Login @loginf', () => {
    test.beforeEach(async ({ page, login }) => {
        await page.goto(url);
        await login(userId, password);
    });

    test('checking after login', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*inventory/);
        await expect(page.locator('.title')).toHaveText('Products');

    });


});
