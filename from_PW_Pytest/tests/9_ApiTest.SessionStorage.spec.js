

const { test, expect } = require('@playwright/test');

//const envs = require('../config/env');
const { APIUtils } = require('../api/apiBase');

const apiUser = require('../Fixtures/manyUserData.json');
//const { test } = require('../Fixtures/myFixtures');


test.describe('api testing Session @apiSession', () => {
    test('API Login', async ({ request, playwright }) => {
        const apiUtils = new APIUtils(request);

        const token = await apiUtils.getToken(apiUser[3].email, apiUser[3].password);

        console.log(token);

        const ffbrowser = await playwright.firefox.launch({ headless: false });
        const ffcontext = await ffbrowser.newContext();
        const ffpage = await ffcontext.newPage();

        await ffcontext.addInitScript(token => {
            window.localStorage.setItem('token', token);
        }, token);
        await ffpage.goto("https://rahulshettyacademy.com/client");

        await ffpage.getByRole('button', { name: '   ORDERS' }).click();
        await ffpage.pause();

    });

    test.skip('API Order', async ({ page, request }) => {
        const apiUtils = new APIUtils(request);

        const json_orderResponse = await apiUtils.createOrder(apiUser[3].email, apiUser[3].password);

        console.log(json_orderResponse);

        const orderNum = json_orderResponse.orders[0];

        console.log(orderNum);

        await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
        await loginForOrders(apiUser[3].email, apiUser[3].password);

        await page.getByRole('button', { name: '   ORDERS' }).click();

        await expect(page.getByText(orderNum)).toBeVisible();

        const row = page.locator('tr', { hasText: orderNum });
        await row.getByRole('button', { name: 'View' }).click();

        await expect(page).toHaveURL(/dashboard\/order-details/)
        await expect(page.getByText(orderNum)).toBeVisible();
        await page.pause();
    });

});