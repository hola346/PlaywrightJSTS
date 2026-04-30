import { test, expect, Page } from '@playwright/test';

test.describe('template spec @hello', () => {

    test.beforeAll(async () => {
        console.log('Runs once before all tests');
    });

    test.beforeEach(async ({ page }: { page: Page }) => {
        console.log('Runs before each test');
        await page.goto('https://google.com');
    });

    test('OLA', async ({ page }: { page: Page }) => {
        await page.goto('https://example.cypress.io');
    });

    test('test 1', async ({ page }: { page: Page }) => {
        console.log('this is Test 1');
    });

    test('test 2', async ({ page }: { page: Page }) => {
        console.log('this is Test 2');
    });

    test.afterEach(async () => {
        console.log('Runs after each test');
    });

    test.afterAll(async () => {
        console.log('Runs once after all tests');
    });

});