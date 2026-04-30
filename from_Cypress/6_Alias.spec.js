
import { test, expect } from '@playwright/test';
test.describe('Alias @ali', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
    });

    test('Take Small Modal', async ({ page }) => {

        //cy.get('#showSmallModal').should('have.text', 'Small modal')
        await expect(page.locator('[data-test="login-button"]')).toHaveValue('Login');
        console.log('BUTTON TEXT:', await page.locator('[data-test="login-button"]').inputValue());

    });

    // AVOID USE OF ALIAS & WRAP - cannot be used actually in PW - to prioratize performance, separate TCs, avoid flakiness. 

});

