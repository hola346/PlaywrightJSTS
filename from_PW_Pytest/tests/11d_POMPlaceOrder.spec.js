
import {test, expect} from '@playwright/test';
const {APIUtils} = require('../api/apiBase');
const {Cart} = require('../Pages/cart');
const {placeOrder} = require('../Pages/PlaceOrder');
const user = require('../Fixtures/manyUserData.json');
const env = require('../config/env');

test.describe('Place Order @place', ()=>{
let country;
    test.beforeAll(async({request})=>{
        const apiUtil = new APIUtils(request);
        await apiUtil.selectItems2Cart(user[3].email, user[3].password);

    });
    test.use({ storageState: 'storageState.json' });

    test.beforeEach(async({page})=>{
        const cartObject = new Cart(page);
        await page.goto(env.env1.baseUrl+'/client/#/dashboard/cart');
        await cartObject.Checkout();
        
    });

    test('select Place Order', async({page}) =>{
        const pOrder = new placeOrder(page);
        country='Spain';
        const items = pOrder.items;

        await expect(items.first()).toBeVisible();
        console.log(await items.allTextContents());

        await expect(items).toContainText(['ADIDAS ORIGINAL', 'ZARA COAT 3']);

        await pOrder.placeOrder(country);

    });

});