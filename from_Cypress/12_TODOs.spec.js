
import { expect } from '@playwright/test';
const { test } = require('../Fixtures/my-fixtures');

const item1 = 'todo-A';
const item2 = 'todo-B';
const item3 = 'todo-C';

test.describe('MOCK TODOS @todo', () => {
    test.beforeEach(async ({ page, createTodo }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');

        // Add our 3 test items - Using predefined function:
        await createTodo(item1);
        await createTodo(item2);
        await createTodo(item3);
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