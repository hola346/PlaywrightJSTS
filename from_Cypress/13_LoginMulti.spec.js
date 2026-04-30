
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Fixtures/POM_class_home';
import { Products } from '../Fixtures/POM_class_products';
const tests = require('../Fixtures/multitest.json');

test.describe('Multi test @multi', () => {

    for (const data of tests) {
        test(`Auth Test: ${data.name}`, async ({ page }) => {
            const loginpage = new LoginPage(page);
            const products = new Products(page);
            await loginpage.goto();
            await loginpage.login(data.user, 'secret_sauce');

            if (data.type === 'success') {
                await products.checktitle(data.expected);
            } else {
                await loginpage.checkErrorMessage(data.expected);
            }
        });
    }

});