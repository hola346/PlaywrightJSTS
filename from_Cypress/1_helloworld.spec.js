import { test, expect } from '@playwright/test';

test.describe('template spec', () => {


    test.beforeAll(async () => {
        console.log('Runs once before all tests');
    });

    test.beforeEach(async ({ page }) => {
        console.log('Runs before each test');
        await page.goto('https://google.com');
    });
    test('OLA @noweb', async ({ page }) => {
        await page.goto('https://example.cypress.io');
    });
    test('test 1', async ({ page }) => {
        console.log('this is Test 1');
    });

    test('test 2', async ({ page }) => {
        console.log('this is Test 2');
    });

    test.afterEach(async () => {
        console.log('Runs after each test');
    });

    test.afterAll(async () => {
        console.log('Runs once after all tests');
    });


});