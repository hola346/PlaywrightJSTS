
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Fixtures/POM_class_home';
import { Products } from '../Fixtures/POM_class_products';

const cred = require('../Fixtures/credentials.json')


test.describe('Login by Class @class', () => {
    let loginPage;
    let products;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        products = new Products(page);
        await loginPage.goto();
    });

    test('Home page', async ({ page }) => {
        await expect(page).toHaveTitle("Swag Labs");
    });

    test('Login OK', async ({ page }) => {
        await loginPage.login(cred.ok_user, cred.password);
        await products.checktitle('Products');
        await products.checkpagetitle('Swag Labs');
        await products.checkUrl('https://www.saucedemo.com/inventory.html');

    });

    test('Login KO', async ({ page }) => {
        await loginPage.login(cred.locked_user, cred.password);
        await loginPage.checkErrorMessage('Sorry, this user has been locked ');
    });
});