// 1. Import your custom test runner that contains your fixtures
const { test, expect } = require('../Fixtures/bddFixture.js');

// 2. Import createBdd instead of the individual keywords
const { createBdd } = require('playwright-bdd');

// 3. Initialize Given, When, Then by passing your custom test function
const { Given, When, Then } = createBdd(test);

// 4. Leave your page object imports as they were
const { APIUtils } = require('../api/apiBase.js');
const { LoginPage } = require('../Pages/Login.js');
const { DashboardPage } = require('../Pages/dashboardPage.js');
const { myOrders } = require('../Pages/myOrders.js');

Given(`Login by API using {string} and {string} and create order`, async ({ request, sharedData }, username, password) => {

    const apiUtils = new APIUtils(request);
    const response = await apiUtils.createOrder(username, password);
    sharedData.response = response;
});

Given('take note of the ORDER number', async ({ sharedData }) => {
    sharedData.orderNum = sharedData.response.orders;
    console.log(sharedData.orderNum);
});

Given('user is on landing page', async ({ page }) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.navigate();
});

When('Login to the application using UI with same {string} and {string}', async ({ page }, username, password) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.log_in(username, password)
});

When('go to order history', async ({ page }) => {
    const dashboardPageObj = new DashboardPage(page);
    await dashboardPageObj.getOrders();
});

When('Select order details using previous ORDER number', async ({ page, sharedData }) => {
    const myOrdersObj = new myOrders(page);
    await myOrdersObj.selectOrderRow(sharedData.orderNum);

});

Then(`Validate the order details - order message should be "Thank you for Shopping With Us"`, async ({ page }) => {
    await expect(page.getByText('Thank you for Shopping With Us')).toBeVisible();
});