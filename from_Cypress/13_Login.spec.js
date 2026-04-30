

import { test, expect } from '@playwright/test';

const userId = "standard_user";
const password = "secret_sauce";

const url = "https://www.saucedemo.com";

test.describe('Login @login', () => {
    test('1st login', async ({ page }) => {
        await page.goto(url);
        await page.getByPlaceholder('Username').fill(userId);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*inventory/);
        await expect(page.locator('.title')).toHaveText('Products');

    });


});
