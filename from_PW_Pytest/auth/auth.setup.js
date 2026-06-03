

import { test as setup } from '@playwright/test';
import env from '../config/env'

setup('authenticate', async ({ page }) => {
    await page.goto(env.baseUrl + env.routes.login);

    await page.getByLabel('Username').fill(process.env.USERNAME);
    await page.getByLabel('Password').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL(env.baseUrl + env.routes.dashboard); // adjust to your app

    await page.context().storageState({ path: './auth/storageState.json' });
});