import { test, expect } from '@playwright/test';
const { APIUtils } = require('../api/apiBase');
const { myOrders } = require('../Pages/myOrders');
const {LoginPage} = require ('../Pages/Login');
const env = require('../config/env');
const users = require('../Fixtures/manyUserData.json');


test.describe('History Order @hist', () => {

    for (const user of users) {

        test(`History ${user.email}`, async ({ request, page }) => {

            const apiUtils = new APIUtils(request);
            const loginPageObj = new LoginPage(page);

            const response = await apiUtils.createOrder(user.email, user.password);
            const orderId = response.orders;

            await page.goto(env.env1.baseUrl + env.env1.routes.weblogin);
            await loginPageObj.log_in(user.email, user.password);
            await page.getByRole('button', {name: 'Orders'}).click();
            

            const myOrdersObj = new myOrders(page);
            await myOrdersObj.selectOrderRow(orderId);

            await expect(page).toHaveURL(
                new RegExp(`order-details/${orderId}`)
            );

            await expect(page.getByText(orderId)).toBeVisible();
            await expect(page.getByText('iphone')).toBeVisible();
            //await expect(page.getByText(str(user.email))).toBeVisible();
        });
    }
});