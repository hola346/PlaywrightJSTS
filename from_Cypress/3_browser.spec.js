import { test, expect } from '@playwright/test';
test.describe('Browser Demo @browser', () => {

    test('Browser demo @browser', async ({ page, browserName }) => {
        await page.goto('https://www.whatismybrowser.com/');
        console.log(browserName);  // it gives you info of your browser

        if (browserName == 'chromium') {
            await expect(page.locator('.string-major')).toContainText('Chrome');
            await expect(page.locator('.string-major')).toContainText('Chrome 147 on Windows 10');
            //await expect(page.locator('.string-major > a')).toContainText('Chrome 147 on Windows 10'); // takes only the text

        } else if (browserName == 'firefox') {
            await expect(page.locator('.string-major')).toContainText('Firefox');
            await expect(page.locator('.string-major')).toContainText('Firefox 148 on Windows 10');
        }
    });

    test('DOM', async ({ page }) => { //puedes consultar propiedades booleanas - verdadero/falso de elementos del DOM
        await page.goto('https://demoqa.com/accordian');
        await expect(page.locator('.collapse').nth(6)).toBeVisible();// --> true
        await expect(page.locator('.accordion-body').first()).toBeVisible();
        //when page is loaded, 1st element is visible, the other two do not - assertion should be TRUE, it IS visible

        await page.locator('.accordion-button').first().click();
        await expect(page.locator('.accordion-body').first()).not.toBeVisible();
        await expect(page.locator('.accordion-body').first()).toBeHidden();
        //cy.get(':nth-child(1) > .accordion-header > .accordion-button').click(); // this hide the text - collapse

        //cy.get('.collapse').eq(6).then($element => { //hay 9 elementos como collapse en el DOM, el que queremos es el 7º
        //    cy.log(`state of the collapse when click web: ${Cypress.dom.isVisible($element)}`) // --> false

    });


    test('ARchitecture', () => {
        console.log(process.arch); // returns the processor architecture - x64
    });
});