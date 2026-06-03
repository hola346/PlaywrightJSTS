



const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { SearchAndBookPage } = require('../Pages/SearchAndBookPage');
const { DinamycResultsPage } = require('../Pages/dynamicResultsPage');
const { ReviewAndBookPage } = require('../Pages/ReviewAndBook');

const credentials = require('../Data/credentials.json');
const shipmentData = require('../Data/shipmentData.json');
const AWBData = require('../Data/AWBData.json');


test.describe('Search and Book Tests @Itinerary', () => {

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
            origin: shipmentData.origin,
            destination: shipmentData.destination,
            date: searchAndBookPage.getTomorrowDate(),
            commodity: shipmentData.commodity,
            units: shipmentData.units,
            dimensions: shipmentData.dimensions,
            weight: shipmentData.weight
        });
        await dynamicResultsPage.SearchWasSuccessful();
        await dynamicResultsPage.PickFlight();
        await reviewAndBookPage.PickFlightSuccessful();
    });

    test.skip('Itinerary Visible', async ({ page }) => {
        await expect(page.getByText('Itinerary')).toBeVisible();
    });

    test('Fill AWB Details and Confirm Booking', async ({ page }) => {
        await reviewAndBookPage.fillAWBDetails(AWBData.awbType, AWBData.awbFormat);
        await reviewAndBookPage.confirmBooking();
        await expect(page.getByText('Thank you for your booking')).toBeVisible();
    });
});
