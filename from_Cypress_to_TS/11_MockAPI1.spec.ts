import { test, expect } from '@playwright/test';

// 1. Import your JSON fixture at the top
import interceptData from '../Fixtures/InterceptLimit.json';

test.describe('Intercept limit @mock1', () => {

    test('Intercept limit to 5 elements', async ({ page }) => {

        await page.route('**/data/v1/user/60d0fe4f5311236168a109ca/post?limit=10', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(interceptData),
            });
        });

        await page.goto('https://dummyapi.io/explorer');
        // This is the most readable and recommended way
        await page.getByText('User Posts', { exact: true }).click();

        const response = await page.waitForResponse('**/data/v1/user/60d0fe4f5311236168a109ca/post?limit=10');
        const body = await response.json();
        // 5. Verify the body
        expect(body.limit).toBe(6);
    });
    // Estamos limitando artificialmente la respuesta a sólo que muestre 5 elementos en lugar de los 10 predefinidos
});