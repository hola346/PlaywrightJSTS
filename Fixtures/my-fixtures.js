
const { test: base } = require('@playwright/test');

exports.test = base.extend({
    createTodo: async ({ page }, use) => {
        const fn = async (text) => {
            await page.locator('.new-todo').fill(text);
            await page.locator('.new-todo').press('Enter');
        };
        await use(fn);
    },
    login: async ({ page }, use) => {
        const fn = async (userId, password) => {
            await page.getByPlaceholder('Username').fill(userId);
            await page.getByPlaceholder('Password').fill(password);
            await page.getByRole('button').click();
        };
        await use(fn);
    }
});