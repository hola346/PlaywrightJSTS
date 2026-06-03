
const { expect } = require('@playwright/test');
const env = require('../config/env');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Enter your email');
        this.passwordInput = page.getByPlaceholder('Enter your password');
        this.loginButton = page.locator('[data-test-id="submitLogin"]');

        this.error = page.getByRole('heading', { name: 'error' });
        this.errorMessage = page.locator('.error');
    }

    async goto() {
        await this.page.goto(env.baseUrl);
    }

    async login(user, pass) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    async checkErrorMessage(text) {
        await this.error.waitFor();
        await expect(this.errorMessage).toContainText(text);
    }
}

module.exports = { LoginPage };