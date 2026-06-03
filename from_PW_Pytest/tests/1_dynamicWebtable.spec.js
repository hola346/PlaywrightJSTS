
const { test, expect } = require('@playwright/test');

const env = require('../config/env');

test.describe('Rice Price @rice', () => {

    test('Rice webtable', async ({ page }) => {
        await page.goto(env.env1.baseUrl + env.env1.routes.webtable);
        // There are two diff components in a table: table header - th, and table row - tr
        const columns = await page.locator("th").count();
        console.log(columns);  // counting here number of columns - headers

        var i;
        for (i = 0; i < columns; i++) {
            const text = await page.locator("th").nth(i).textContent();
            if (text.includes("Price")) {
                break;
            }
        };

        console.log("Header with Price: " + i); // we found the header with the text "Price" on it

        const row = page.locator('tr').filter({ hasText: 'Potato' });

        console.log(row);

        await expect(row.locator("td").nth(i)).toContainText("34"); // td makes reference to CELL within that Row
        await page.pause();

    });

}); 
