
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchAndBookPage } = require('../Pages/SearchAndBookPage');
const { DinamycResultsPage } = require('../Pages/dynamicResultsPage');

const credentials = require('../Data/credentials.json');
const shipmentData = require('../Data/shipmentData.json');

test.describe('Search and Book Tests @search', () => {

    let searchAndBookPage;
    let dynamicResultsPage;

    test.beforeEach(async ({ page }) => {
        let loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.userEmail, credentials.password);
        searchAndBookPage = new SearchAndBookPage(page);
        await searchAndBookPage.LoginWasSuccessful();
        dynamicResultsPage = new DinamycResultsPage(page);
    });

    test('Search for a shipment with complete form data', async ({ page }) => {
        await searchAndBookPage.fillAndSearch({
            origin: shipmentData.origin,
            destination: shipmentData.destination,
            date: searchAndBookPage.getTomorrowDate(),
            commodity: shipmentData.commodity,
            units: shipmentData.units,
            dimensions: shipmentData.dimensions,
            weight: shipmentData.weight
        });
        await dynamicResultsPage.SearchWasSuccessful();
        //await page.pause();
    });

    test.skip('Search with minimal itinerary only', async ({ page }) => {
        await searchAndBookPage.fillRoute(shipmentData.origin, shipmentData.destination);
        await searchAndBookPage.searchFlights();
        
    });

});