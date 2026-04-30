import { test, expect } from '@playwright/test';

const api = '**/api/todos';
const url = 'http://localhost:3000/#/';
const item1 = 'todo1';
const item2 = 'todo2';

test.describe('MOCK TODOS @mock2', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
        // Start the server before each test
        // Note: You need to run 'npm start' in the terminal first
        // Reset the in-memory database to empty array
        await page.request.put('http://localhost:3000/api/todos', { data: [] });
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        await page.reload();

        // Add our 3 test items
        await page.locator('.new-todo').fill(item1);
        await page.locator('.new-todo').press('Enter');
        await page.locator('.new-todo').fill(item2);
        await page.locator('.new-todo').press('Enter');
    });

    test('Verify 2 TODOs were inserted', async ({ page }) => {
        expect(await page.locator('.todo-list li')).toHaveCount(2);
        expect(await page.locator('.todo-list li')).toHaveText([item1, item2]);
        expect(await page.locator('.todo-list li')).toContainText([item1, item2]);

    });
});