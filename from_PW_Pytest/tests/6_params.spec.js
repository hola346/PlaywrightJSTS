
const { expect } = require('@playwright/test');

const envs = require('../config/env');
const userData = require('../Fixtures/userData.json');
const users_Data = require('../Fixtures/manyUserData.json');

const { test } = require('../Fixtures/myFixtures.js');

test.describe('create users params @param', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
    });

    test.skip('create New user using function', async ({ page, createNewUser }) => {
        await createNewUser(userData);
    });

    users_Data.forEach(user => {
        test(`Create user: ${user.email}`, async ({ createNewUser }) => {
            await createNewUser(user);
        });
    });

    users_Data.forEach(user => {
        test(`login each created user: ${user.email}`, async ({ loginForOrders }) => {
            await loginForOrders(user.email, user.password);
        });
    });

    users_Data.forEach(user => {
        test(`login users and create orders: ${user.email}`, async ({ loginForOrders, createNewOrder }) => {
            await loginForOrders(user.email, user.password);
            await createNewOrder();
        });
    });

});