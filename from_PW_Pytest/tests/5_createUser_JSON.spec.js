
const { expect } = require('@playwright/test');

const envs = require('../config/env');
const userData = require('../Fixtures/userData.json');

const { test } = require('../Fixtures/myFixtures.js');

test.describe('create new user @user', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(envs.env1.baseUrl + envs.env1.routes.weblogin);
    });

    test('new User', async ({ page }) => {


        await page.getByText('Don\'t have an account').click();
        await expect(page).toHaveURL(/auth\/register/)

        await page.getByPlaceholder('First Name').fill(userData.fName);
        await page.getByPlaceholder('Last Name').fill(userData.lName);
        await page.getByPlaceholder('email@example.com').fill(userData.email);
        await page.getByPlaceholder('enter your number').fill(userData.number);
        await page.getByRole('textbox', { name: 'Passsword' }).fill(userData.password);
        await page.getByRole('textbox', { name: 'Confirm Password' }).fill(userData.password);
        await page.getByRole('combobox').selectOption(userData.occupation);

        await page.getByRole('radio', { name: 'Male', exact: true }).check();

        await page.getByRole('Checkbox').check();

        await page.getByRole('button', { name: 'Register' }).click();


    });

    test('login created user', async ({ page }) => {
        await page.getByPlaceholder('email@example.com').fill(userData.email);
        await page.getByPlaceholder('enter your passsword').fill(userData.password);
        await page.getByRole('button', { name: 'login' }).click();
        await expect(page).toHaveURL(/dashboard\/dash/);
    });

    test('order', async ({ page, loginForOrders }) => {
        await loginForOrders(userData.email, userData.password);
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
        //console.log(orderNumber);
    });

});