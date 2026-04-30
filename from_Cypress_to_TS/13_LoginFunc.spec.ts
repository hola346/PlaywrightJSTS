

import { expect, Page } from '@playwright/test';
import { test } from '../Fixtures/my-fixtures_ts';

const userId = "standard_user";
const password = "secret_sauce";

const url = "https://www.saucedemo.com";

test.describe('Login @loginf', () => {
    test.beforeEach(async ({ page, login }) => {
        await page.goto(url);
        await login({ userId, password });
    });

    test('checking after login', async ({ page }: { page: Page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*inventory/);
        await expect(page.locator('.title')).toHaveText('Products');

    });


});
