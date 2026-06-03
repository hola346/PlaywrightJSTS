

const { expect } = require('@playwright/test');

const envs = require('../config/env');
const { APIUtils } = require('../api/apiBase');

const apiUser = require('../Fixtures/manyUserData.json');
const { test } = require('../Fixtures/myFixtures');
const { stringify } = require('node:querystring');


test.describe('api testing @apitest', () => {

    test.skip('create api user', async ({ page, createNewUser }) => {
        await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
        await createNewUser(apiUser[3]);
    });
    test('API Login', async ({ request }) => {
        const apiUtils = new APIUtils(request);

        const token = await apiUtils.getToken(apiUser[3].email, apiUser[3].password);

        console.log(token);
    });

    test('API Order', async ({ page, request, loginForOrders }) => {
        const apiUtils = new APIUtils(request);

        const json_orderResponse = await apiUtils.createOrder(apiUser[3].email, apiUser[3].password);

        console.log(json_orderResponse);

        const orderNum = json_orderResponse.orders[0];

        console.log(orderNum);

        await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
        await loginForOrders(apiUser[3].email, apiUser[3].password);

        await page.getByRole('button', { name: '   ORDERS' }).click();

        await expect(page.getByText(orderNum)).toBeVisible();

        const row = page.locator('tr', {hasText: orderNum});
        await row.getByRole('button', {name: 'View'}).click();

        await expect(page).toHaveURL(/dashboard\/order-details/)
        await expect(page.getByText(orderNum)).toBeVisible();
        await page.pause();
    });

});