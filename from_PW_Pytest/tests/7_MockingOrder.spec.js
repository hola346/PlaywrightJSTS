
const { expect } = require('@playwright/test');

const envs = require('../config/env');
const userData = require('../Fixtures/userData.json');

const { test } = require('../Fixtures/myFixtures.js');
const fakeResponse = { "data": [], "message": "No Orders Imbecil" };

const api = '**/api/ecom/order/get-orders-for-customer/*';
const api2 = '**/api/ecom/order/get-orders-details?id=*';

test.describe('Mocking Order @mock', () => {

    test.beforeEach(async ({ page, loginForOrders }) => {
        await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
        await loginForOrders(userData.email, userData.password);
    });

    test.skip('Set Order and check Orders', async ({ page, createNewOrder }) => {
        await createNewOrder();
        await page.getByRole('button', { name: '   ORDERS' }).click();
        await page.pause();
    });

    test('Mocking Orders', async ({ page, createNewOrder }) => {
        await createNewOrder();

        await page.route(api, async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(fakeResponse),
            });
        });
        const responsePromise = page.waitForResponse(api);

        await page.getByRole('button', { name: '   ORDERS' }).click();

        await expect(page.getByText('No Orders')).toBeVisible();
        await page.pause();
    });

    test('Mock order details', async ({ page }) => {
        await page.getByRole('button', { name: '   ORDERS' }).click();

        await page.route(api2, async route => {
            await route.fulfill({
                status: 403,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'You are not authorize to view this order'
                })
            });
        });
        const responsePromise = page.waitForResponse(api2);

        await page.getByRole('button', { name: 'View' }).first().click();
        const message = await page.locator('.blink_me').textContent();

        expect(message).toBe('You are not authorize to view this order');

    });
});