
import { test, expect } from '@playwright/test';
import env from '../config/env'
const user = require('../Fixtures/userData.json');

const { LoginPage } = require('../Pages/Login');

test.describe('POM structure @POM', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(env.env1.baseUrl + env.env1.routes.weblogin);
    });
    test('POM Login', async ({ page }) => {

        const LoginPageObject = new LoginPage(page);
        //await page.waitForLoadState('networkidle');
        //await page.waitForTimeout(5000);

        await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
        //await expect(page.getByText('Practice Website for Rahul Shetty Academy Students')).toBeVisible();
        //await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
        
        /*
        const locator = page.getByRole('button', { name: 'Register' });

        for (let i = 0; i < 10; i++) {
            console.log(await locator.isVisible());  // --------------------------INTERESTING TO CHECK VISIBILITY!! ---------------------------------------
            await page.waitForTimeout(300);
        }
        */

        /*
        const hero = page.locator('section').first();

        console.log(await hero.isVisible());

        console.log(await hero.evaluate(el => {
            const style = window.getComputedStyle(el);

            return {
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                width: style.width,
                height: style.height,
            };
        }));

        const h3 = page.locator('section h3');

        console.log(await h3.boundingBox());
        console.log(await h3.isVisible());
        */
        await expect(page.locator('section h3')).toContainText(
            'We Make Your Shopping Simple'
        );
        /*
        const h1 = page.locator('section h1');

        console.log(await h1.boundingBox());
        console.log(await h1.isVisible());

        await expect(page.locator('section h1')).toContainText(
            'Practice Website for Rahul Shetty Academy Students'
        );
        */
        await expect(page.getByRole('heading', { name: 'Practice Website for Rahul' })).toBeVisible();

        await expect(page.locator('.btn1')).toBeVisible();
        await expect(page.locator('.btn1')).toContainText('Register');

        console.log(await page.viewportSize());
        //await page.getByRole('button').click();
        await expect(page.locator('.blink_me')).toContainText('sign in with your personal account');
        await LoginPageObject.log_in(user.email, user.password);

        await expect(page).toHaveURL(/dashboard\/dash/);
    });
});