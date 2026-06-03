

import { test as setup } from '@playwright/test';
import env from '../config/env'

setup('authenticate', async ({ page }) => {
    await page.goto(env.baseUrl + env.routes.login);

    await page.getByLabel('Username').fill(process.env.USER);
    console.log(process.env.USER);
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    console.log(process.env.PASSWORD);
    await page.locator('body').click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Wait a bit for Angular to react
    await page.waitForLoadState('networkidle');

    const currentUrl = page.url();
    console.log('URL after login:', currentUrl);

    // 🔴 HARD CHECK
    if (!currentUrl.includes('shop')) {
        throw new Error('Login failed - still on login page');
    }


    await page.context().storageState({ path: 'storageState.json' });
});