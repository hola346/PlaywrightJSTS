
import { test, expect } from '@playwright/test';

const url = 'http://alpha.webcargonet.com/';

test.describe('Browser Demo @browser', () => {
    test('Login Demo @login', async ({ page }) => {
        await page.goto(url);
        await page.getByPlaceholder('Enter your email').fill('test@example.com');
        await page.getByPlaceholder('Enter your password').fill('password123');
        await page.locator('[data-test-id="submitLogin"]').click();

        await page.pause();
    });

});

