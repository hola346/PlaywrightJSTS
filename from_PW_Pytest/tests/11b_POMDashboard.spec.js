
import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
const { DashboardPage } = require('../Pages/dashboardPage');
const { ProductPage } = require('../Pages/productDetails.js');
const env = require('../config/env');
const { APIUtils } = require('../api/apiBase.js');
const apiUser = require('../Fixtures/manyUserData.json');

const products = [
    { name: 'ADIDAS ORIGINAL', id: '6960eae1c941646b7a8b3ed3' },
    { name: 'ZARA COAT 3', id: '6960eac0c941646b7a8b3e68' },
    { name: 'iphone 13 pro', id: '6960ea76c941646b7a8b3dd5' }
];

test.describe('Dashboard with class @dash', () => {
    test.beforeAll(async ({ request }) => {
        // LOGIN API!!
        const apiUtils = new APIUtils(request);
        const token = await apiUtils.getToken(apiUser[3].email, apiUser[3].password);

        await fs.writeFile('storageState.json', JSON.stringify({
            cookies: [],
            origins: [
                {
                    origin: env.env1.baseUrl,
                    localStorage: [
                        {
                            name: 'token',  // i'M reusing token here - Set auth via storageState (BEST PRACTICE)
                            value: token
                        }
                    ]
                }
            ]
        }));

        /*
        await page.addInitScript((token) => {
            window.localStorage.setItem('token', token); ------------------2nd approach: THIS IS TO inject token directly into browser context --------------
        }, token); */
    });

    let dashboard;
    let details;
    let productsAdded;

    test.use({ storageState: 'storageState.json' });
    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        details = new ProductPage(page);
        await page.goto(env.env1.baseUrl + env.env1.routes.dashboard);
        productsAdded = 0;
    });

    test('gotoDashboard - View', async ({ page }) => {

        for (const product of products) {

            await expect(
                dashboard.getProductByName(product.name)
            ).toBeVisible();

            await dashboard.viewProduct(product.name);

            await details.expectUrlContains(product.id);
            await details.expectProductName(product.name);

            await details.addToCart();
            productsAdded++;

            await page.goBack(); // important if multiple products tested sequentially
        }

        await expect(
            dashboard.productsInCart()
        ).toHaveText(String(productsAdded));

    });

    test('gotoDashboard - AddCart', async ({ page }) => {

        for (const product of products) {

            await dashboard.addProduct2Cart(product.name);
            productsAdded++;

            //await page.goBack(); // important if multiple products tested sequentially
        }

        await expect(
            dashboard.productsInCart()
        ).toHaveText(String(productsAdded));
    });

    /*
    Methods returning locators:
    should usually NOT be async
    Methods performing actions:
    should usually be async
    
    Examples:
    
    getCartBadge() { ... }        // NOT async
    getProduct() { ... }          // NOT async
    
    async addToCart() { ... }     // async
    async checkout() { ... }      // async
    */


});