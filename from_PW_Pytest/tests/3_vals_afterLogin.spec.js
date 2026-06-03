
import { expect } from '@playwright/test';
const env = require('../config/env.js');
const { test } = require('../Fixtures/myFixtures.js');
import dotenv from 'dotenv';
dotenv.config();

test.describe('login automatic @login', () => {

    test('after login test', async ({ page, login }) => {
        await login();
        await expect(page).toHaveURL(/shop/);
    });

    test('login with credentials', async ({ page, loginWithCreds }) => {
        await loginWithCreds(process.env.USER, process.env.PASSWORD);
        await expect(page).toHaveURL(/shop/);

        await expect(page.getByText('iphone X')).toBeVisible();
        await expect(page.getByText('Samsung Note 8')).toBeVisible();
        await expect(page.getByText('Nokia Edge')).toBeVisible();
        await expect(page.getByText('Blackberry')).toBeVisible();

        await page.locator('app-card').filter({ hasText: 'iphone X' }).getByRole('button').click();
        await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();

        await expect(page.locator('.btn').filter({ hasText: 'Checkout' })).toContainText('( 2 )');

        await page.locator('.btn').filter({ hasText: 'Checkout' }).click();

        await expect(page.getByText('iphone X')).toBeVisible();
        await expect(page.getByText('Nokia Edge')).toBeVisible();

        await expect(page.locator('th').first()).toHaveText('Product');
        await expect(page.locator('th').nth(2)).toHaveText('Price');

        await expect(page.locator('.media')).toHaveCount(2);
    });

    test('Child page', async ({ page }) => {
        await page.goto(env.env1.baseUrl + env.env1.routes.login);

        const popupPromise = page.waitForEvent('popup'); // listening, popup is coming

        await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click(); //NOW!!

        const newPage = await popupPromise;

        await expect(newPage.locator('.page-title')).toContainText('Documents request');
        await expect(newPage).toHaveURL(/.*documents-request/);
        await expect(newPage.getByText('Please email us at mentor@rahulshettyacademy.com with below template to receive response ')).toBeVisible();
        await expect(newPage.locator('.red')).toHaveText('Please email us at mentor@rahulshettyacademy.com with below template to receive response ');
        const text = await newPage.locator('.red').textContent();

        const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/g);

        console.log(emails);

        expect(emails[0]).toBe('mentor@rahulshettyacademy.com');

        //await page.pause();
    });
});