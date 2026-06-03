import { test, expect } from '@playwright/test';
const { APIUtils } = require('../api/apiBase');
const {orderConfirmed} = require('../Pages/orderConfirmed.js');
const user = require('../Fixtures/manyUserData.json');
const env = require('../config/env.js');


test.describe('Order Confirmation @order', () => {
let response;
    test.beforeAll(async ({ request }) => {
        const apiUtil = new APIUtils(request);
        response = await apiUtil.createOrder(user[3].email, user[3].password);
        console.log(response);
    });

    test.use({ storageState: 'storageState.json' });

    test.beforeEach(async ({ page }) => {
        await page.goto(env.env1.baseUrl + `/client/#/dashboard/thanks?prop=["${response.orders}"]`);
    });

    test('goto', async ({ page }) => {
        const orderC = new orderConfirmed(page);
        await expect(orderC.congrats).toContainText('Thankyou for the order');
        await expect(orderC.orderID).toContainText(response.orders);
        await expect(orderC.itemName).toContainText('iphone');
    });

});
/*
Two things by tomorrow:
- param - same shit for many users (for).
- createOrder by API, then check Orders History. 
*/