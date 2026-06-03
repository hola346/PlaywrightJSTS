

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchAndBookPage } = require('../Pages/SearchAndBookPage');
const { DinamycResultsPage } = require('../Pages/dynamicResultsPage');
const { ReviewAndBookPage } = require('../Pages/ReviewAndBook');

const credentials = require('../Data/credentials.json');


test.describe('Search and Book Tests @flight', () => {

    let searchAndBookPage;
    let dynamicResultsPage;
    let reviewAndBookPage;

    test.beforeEach(async ({ page }) => {
        let loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.userEmail, credentials.password);
        searchAndBookPage = new SearchAndBookPage(page);
        await searchAndBookPage.LoginWasSuccessful();
        dynamicResultsPage = new DinamycResultsPage(page);
        reviewAndBookPage = new ReviewAndBookPage(page);
        await searchAndBookPage.fillAndSearch({
            origin: 'BCN',
            destination: 'BKK',
            date: searchAndBookPage.getTomorrowDate(),
            commodity: 'General Cargo',
            units: '1',
            dimensions: '100 - 100 - 100',
            weight: '100'
        });
        await dynamicResultsPage.SearchWasSuccessful();
    });

    test('Select Flight and Confirm', async ({ page }) => {
        await dynamicResultsPage.PickFlight();
        await reviewAndBookPage.PickFlightSuccessful();
    });
});
