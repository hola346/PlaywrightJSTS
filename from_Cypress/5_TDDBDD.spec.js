import { test, expect } from '@playwright/test';
test.describe('BDD and TDD assertions @bdd', () => {

    test.beforeEach(async ({ page }) => {
        page.goto('https://demoqa.com/radio-button');
    });
    test('TDD Assertions', async ({ page }) => {
        console.log('Length Check')
        await expect(page.getByRole("radio")).toHaveCount(3);
        //cy.get('input[type="radio"]').should('have.length', 3);

        console.log('Class Check');
        //cy.get('input[type="radio"]').last().should('have.class','disabled')
        await expect(page.getByRole("radio").nth(2)).toContainClass("disabled");

        console.log('Exist Check');
        await expect(page.locator(".mt-3")).not.toBe();
        //cy.get('.mt-3').should('not.exist'); // class mt-3

        console.log('Check Text')
        await page.getByRole("radio").first().click();
        //cy.get('input[type="radio"]').eq(0).click({ force: true });  // --> we click on first element, so the message is displayed
        await expect(page.locator(".mt-3")).toHaveText("You have selected Yes");
        await expect(page.locator(".mt-3")).toContainText("Yes");
        await expect(page.locator(".mt-3")).not.toContainText("NO");
        //cy.get('.mt-3').should('have.text', 'You have selected Yes').and('include.text', 'Yes').and('not.contain', 'NO')

        await expect(page.locator('.text-success')).toHaveCSS('color', 'rgb(25, 135, 84)');
        //should('have.css', 'color', 'rgb(25, 135, 84)')
    });



});