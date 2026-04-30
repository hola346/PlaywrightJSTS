
// login-page.js
const { expect } = require('@playwright/test');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Internal Variables (Locators)
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Internal Method: Navigation
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Internal Method: Action logic
    async login(user, pass) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    // Internal Method: Assertion check
    async checkErrorMessage(text) {
        await expect(this.errorMessage).toContainText(text);
    }
}

module.exports = { LoginPage };