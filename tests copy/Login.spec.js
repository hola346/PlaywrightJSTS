
import { test, expect } from '@playwright/test';
import { config } from 'node:process';
const { LoginPage } = require('../Pages/LoginPage');
const { SearchAndBookPage } = require('../Pages/SearchAndBookPage');

const env = require('../config/env');

const credentials = require('../Data/credentials.json');
const messages = require('../Data/messages.json');

test.describe('Login Tests @login', () => {
    let loginPage;
    let searchAndBookPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        searchAndBookPage = new SearchAndBookPage(page);
    });

    test('Login successfully with valid credentials', async () => {
        await loginPage.goto();
        await loginPage.login(credentials.userEmail, credentials.password);
        // Verifying login successful, URL should change to the Search and Book page
        await searchAndBookPage.LoginWasSuccessful();

    });

    test('Login fails with invalid credentials', async () => {
        await loginPage.goto();
        await loginPage.login(credentials.WrongUserEmail, credentials.WrongPassword);
        // Verifying error message is displayed
        await loginPage.checkErrorMessage(messages.invalidLogin);
    });
});