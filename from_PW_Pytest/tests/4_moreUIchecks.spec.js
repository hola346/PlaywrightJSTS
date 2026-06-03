
const { test, expect } = require('@playwright/test');

const envs = require('../config/env');

test.describe('more checking UI @UI', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(envs.env2.baseUrl);
    });
    test('more checking UI', async ({ page }) => {

        await page.getByPlaceholder("Type to Select Countries").fill("Spain");
        await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
        await page.getByRole('button', { name: 'Hide' }).click();
        await expect(page.getByPlaceholder('Hide/Show Example')).not.toBeVisible();
        await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

        await page.getByRole('button', { name: 'Show' }).click();
        await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
        await expect(page.getByPlaceholder('Hide/Show Example')).not.toBeHidden();
    });

    test('Alter boxes', async ({ page }) => {
        page.on('dialog', async dialog => {

            expect(dialog.message()).toContain(
                'Hello , Are you sure you want to confirm?'
            );

            await dialog.accept();
        });

        await page.locator('#confirmbtn').click(); // seems more accurate for this situation than role-button
    });

    test('Frames', async ({ page }) => {
        const frame = page.frameLocator('#courses-iframe');
        await frame.getByRole('link', { name: 'All Access Plan' }).click();
        await expect(frame.getByText('Happy Subscibers')).toBeVisible();
        await expect(frame.locator("body")).toContainText("Happy Subscibers");

    });

    test('Hover', async ({ page }) => {
        await page.getByRole('button', {name: 'Mouse Hover'}).hover();
        await expect(page.getByText('Top')).toBeVisible();
        await expect(page.getByText('Reload')).toBeVisible();

        await page.getByText('Top').click();
        await page.getByRole('button', {name: 'Mouse Hover'}).hover();
        await page.getByText('Reload').click();
    });

});