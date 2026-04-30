
import { expect } from '@playwright/test';
import { test } from '../Fixtures/my-fixtures_ts';

const item1: string = 'todo-A';
const item2: string = 'todo-B';
const item3: string = 'todo-C';

test.describe('MOCK TODOS @todo', () => {
    test.beforeEach(async ({ page, createTodo }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Add our 3 test items - Using predefined function:
        await createTodo({ text: item1 });
        await createTodo({ text: item2 });
        await createTodo({ text: item3 });
    });

    test('Verify 3 TODOs were inserted', async ({ page }) => {
        await expect(page.locator('.todo-list li')).toHaveCount(3);
        await expect(page.locator('.todo-list li').first()).toHaveText(item1);
        await expect(page.locator('.todo-list li').last()).toHaveText(item3);
        await expect(page.locator('.todo-list li').nth(1)).toHaveText(item2);
    });

    test('Mark label completed for 2nd', async ({ page }) => {
        await page.locator('.toggle').nth(1).click();
        await expect(page.locator('.todo-list li').nth(1)).toHaveClass('completed');
        await expect(page.locator('.todo-list li label').nth(1)).toHaveCSS('text-decoration', 'line-through');
    });


});