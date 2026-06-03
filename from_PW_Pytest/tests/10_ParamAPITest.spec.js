



const { expect } = require('@playwright/test');

const envs = require('../config/env');
const { APIUtils } = require('../api/apiBase');

const Users = require('../Fixtures/manyUserData.json');
const { test } = require('../Fixtures/myFixtures');


test.describe(`api testing Param @apiParam`, () => {

    Users.forEach(user => {
        test.skip(`api Login Param: ${user.email}`, async ({ request }) => {
            const apiUtils = new APIUtils(request);

            const token = await apiUtils.getToken(user.email, user.password);

            console.log(`This is the token generated - ${token} - for this user email - ${user.email}`);

        });
    });
    Users.forEach(user => {
        test(`API Order Param: ${user.email}`, async ({ page, request, loginForOrders }) => {
            const apiUtils = new APIUtils(request);

            const json_orderResponse = await apiUtils.createOrder(user.email, user.password);

            console.log(json_orderResponse);

            const orderNum = json_orderResponse.orders[0];

            console.log(`This is the ORDER generated - ${orderNum} - for this user email - ${user.email}`);

            await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
            await loginForOrders(user.email, user.password);

            await page.getByRole('button', { name: '   ORDERS' }).click();

            await expect(page.getByText(orderNum)).toBeVisible();

            const row = page.locator('tr', { hasText: orderNum });
            await row.getByRole('button', { name: 'View' }).click();

            await expect(page).toHaveURL(/dashboard\/order-details/)
            await expect(page.getByText(orderNum)).toBeVisible();
            //await page.pause();
        });
    });

});