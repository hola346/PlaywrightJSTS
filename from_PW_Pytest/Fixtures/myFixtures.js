
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const { test: base } = require('@playwright/test');
const { expect } = require('@playwright/test');
const env = require('../config/env');

exports.test = base.extend({
    login: async ({ page, }, use) => {
        const fn = async () => {
            await page.goto(env.env1.baseUrl + env.env1.routes.login);

            await page.getByLabel('Username').fill(process.env.USER);

            await page.getByLabel('Password').fill(process.env.PASSWORD);
            await page.getByRole('radio', { name: 'User' }).click();
            await page.getByRole('button', { name: 'Okay' }).click();
            await page.getByRole('combobox').selectOption('Teacher');
            await page.getByRole('checkbox', { name: 'terms' }).click();
            await page.getByRole('button', { name: 'Sign In' }).click();

        };
        await use(fn);
    },

    loginWithCreds: async ({ page }, use) => {
        const fn = async (username, password) => {
            await page.goto(env.env1.baseUrl + env.env1.routes.login);

            await page.getByLabel('Username').fill(username);

            await page.getByLabel('Password').fill(password);
            await page.getByRole('radio', { name: 'User' }).click();
            await page.getByRole('button', { name: 'Okay' }).click();
            await page.getByRole('combobox').selectOption('Teacher');
            await page.getByRole('checkbox', { name: 'terms' }).click();
            await page.getByRole('button', { name: 'Sign In' }).click();

        };
        await use(fn);
    },

    loginForOrders: async ({ page }, use) => {
        const fn = async (username, password) => {
            await page.getByPlaceholder('email@example.com').fill(username);
            await page.getByPlaceholder('enter your passsword').fill(password);
            await page.getByRole('button', { name: 'login' }).click();
            await expect(page).toHaveURL(/dashboard\/dash/);
            console.log('Confirming logged user: ' + username);

        };
        await use(fn);
    },
    createNewUser: async ({ page }, use) => {
        const fn = async (jsonFile) => {
            await page.getByText('Don\'t have an account').click();
            await expect(page).toHaveURL(/auth\/register/)

            await page.getByPlaceholder('First Name').fill(jsonFile.fName);
            await page.getByPlaceholder('Last Name').fill(jsonFile.lName);
            await page.getByPlaceholder('email@example.com').fill(jsonFile.email);
            await page.getByPlaceholder('enter your number').fill(jsonFile.number);
            await page.getByRole('textbox', { name: 'Passsword' }).fill(jsonFile.password);
            await page.getByRole('textbox', { name: 'Confirm Password' }).fill(jsonFile.password);
            await page.getByRole('combobox').selectOption(jsonFile.occupation);

            await page.getByRole('radio', { name: 'Male', exact: true }).check();

            await page.getByRole('Checkbox').check();

            await page.getByRole('button', { name: 'Register' }).click();
            console.log('User created: ' + jsonFile.fName);
        };
        await use(fn);
    },

    createNewOrder: async ({ page }, use) => {
        const fn = async () => {
            await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();
            await expect(page.getByText('ZARA COAT 3')).toBeVisible();
            await expect(page.getByText('iphone 13 pro')).toBeVisible();

            const adidas_product = await page.locator('.card').filter({ hasText: 'ADIDAS ORIGINAL' });
            await adidas_product.getByRole('button', { name: 'View' }).click();
            await expect(page.getByText('product details')).toBeVisible();
            await page.getByText('Continue Shopping').click();

            await adidas_product.getByRole('button', { name: 'Add To Cart' }).click();
            await page.getByRole('button', { name: '   Cart' }).click();
            await expect(page).toHaveURL(/dashboard\/cart/);

            await page.getByText('Buy Now').click();

            await page.getByPlaceholder('Select Country').pressSequentially('Spain');
            await page.getByRole('button').filter({ hasText: 'Spain' }).click();
            await page.getByText('Place Order').click();

            await expect(page.getByText('Thankyou for the order.')).toBeVisible();
            //await page.getByText('Thankyou for the order.').waitFor({ state: 'visible' });
            const orderNumber = await page.locator('tr.ng-star-inserted td label').textContent();
            console.log(orderNumber.replace(/\|/g, '').trim());
        };
        await use(fn);
    },


    sharedData: async ({ }, use) => {

        const data = {};

        await use(data);
    }

});