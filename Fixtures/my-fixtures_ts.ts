
import { test as base } from '@playwright/test';
// 1. Define the "Shape" of your fixtures
type MyFixtures = {
    createTodo: (args: { text: string }) => Promise<void>;
    login: (args: { userId: string; password: string }) => Promise<void>;
};

// 2. Use 'export const' and pass the type to extend<MyFixtures>
export const test = base.extend<MyFixtures>({
    createTodo: async ({ page }, use) => {
        const fn = async ({text}:{text:string}) => {
            await page.locator('.new-todo').fill(text);
            await page.locator('.new-todo').press('Enter');
        };
        await use(fn);
    },
    login: async ({ page }, use) => {
        const fn = async ({userId, password}:{userId:string; password:string} ) => {
            await page.getByPlaceholder('Username').fill(userId);
            await page.getByPlaceholder('Password').fill(password);
            await page.getByRole('button').click();
        };
        await use(fn);
    }
});

export { expect } from '@playwright/test';