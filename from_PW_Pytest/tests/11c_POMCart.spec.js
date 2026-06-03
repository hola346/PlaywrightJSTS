
import { test, expect } from '@playwright/test';
const { APIUtils } = require('../api/apiBase.js');
const {Cart} = require('../Pages/cart.js');
const env = require('../config/env.js');
const user = require('../Fixtures/manyUserData.json');

const products = [
    { name: 'ADIDAS ORIGINAL', id: '6960eae1c941646b7a8b3ed3' },
    { name: 'ZARA COAT 3', id: '6960eac0c941646b7a8b3e68' }
];

test.describe('Cart POM @cart', () => {

    test.beforeAll(async ({ request }) => {
        const apiUtils = new APIUtils(request);
        await apiUtils.selectItems2Cart(user[3].email, user[3].password);

    });
    test.use({ storageState: 'storageState.json' });

    test.beforeEach(async ({ page }) => {
        await page.goto(env.env1.baseUrl + '/client/#/dashboard/cart');
    });

    test('go to cart page', async ({ page }) => {
        for (const product of products) {
            await expect(page.getByText(product.name)).toBeVisible();
            await expect(page.getByText(product.id)).toBeVisible();
        }
        await expect(page.getByRole('button', { name: 'Buy Now' })).toHaveCount(2);
        await expect(page.locator('.btn-danger')).toHaveCount(2);
    });

    test('Checkout', async({page}) =>{
        const cartObject = new Cart(page);
        await cartObject.Checkout();
        await expect(page).toHaveURL(/\/dashboard\/order/);
    });
});