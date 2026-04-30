import { test, expect } from '@playwright/test';

const api = '**/api/todos';
const url = 'http://localhost:3000/#/';
const item1 = 'todo1';
const item2 = 'todo2';

test.describe('MOCK TODOS @mock3', () => {
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

    test.skip('Verify 2 TODOs were inserted', async ({ page }) => {
        expect(await page.locator('.todo-list li')).toHaveCount(2);
        expect(await page.locator('.todo-list li')).toHaveText([item1, item2]);
        //expect(await page.locator('.todo-list li')).toContainText([item1, item2]);

    });

    test('Intercept TODOs', async ({ page }) => {
        const mockTodos = [
            { id: 'mock-1', title: 'Mocked Task 1', completed: false },
            { id: 'mock-2', title: 'Mocked Task 2', completed: true },
            { id: 'mock-3', title: 'Mocked Task 1', completed: false },
            { id: 'mock-4', title: 'Mocked Task 1', completed: false }
        ];

        await page.route(api, async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockTodos),
            });
        });

        // 2. Start the LISTENER (Do NOT use 'await' here)
        const responsePromise = page.waitForResponse(api);

        // 3. Trigger the ACTION (This makes the browser call the API)
        await page.reload();

        // 4. NOW wait for the result of the listener
        const response = await responsePromise;

        // 5. Assertions
        const body = await response.json();
        expect(body).toHaveLength(4);
        console.log('this is the json:', JSON.stringify(body, null, 2));
        await expect(page.locator('.todo-list li')).toHaveCount(4);

        // 1. Verify the count first (No extra reload needed)
        const listItems = page.locator('.todo-list li');
        await expect(listItems).toHaveCount(4);

        // 2. Target the specific item (index 1 is the second item)
        const secondItem = listItems.nth(1);

        // 3. BEST WAY: Check the class (More stable than CSS)
        await expect(secondItem).toHaveClass(/completed/);

        // 4. ALTERNATIVE: Check the CSS on the label specifically
        // Note: We await the WHOLE expect
        await expect(secondItem.locator('label')).toHaveCSS('text-decoration', /line-through/);

    });


});
