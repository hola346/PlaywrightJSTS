const { test, createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');

// 3. Initialize Given, When, Then by passing your custom test function
const { Given, When, Then } = createBdd(test);
const {LoginPage} = require('../Pages/Login');
const {DashboardPage} = require('../Pages/dashboardPage');

Given('user navigates to login page', async({page}) =>{
    const loginPageObj = new LoginPage(page);
    await loginPageObj.navigate();
});

When('user enters username {string} and password {string}', async({page}, username, password) =>{
    const loginPageObj = new LoginPage(page);
    await loginPageObj.log_in(username, password);
});

Then('user is navigated to shop page', async({page}) =>{
    const dashboardPageObj = new DashboardPage(page);
    await expect(dashboardPageObj.page).toHaveURL(/dashboard\/dash/);
});

Then('iPhone X product should be present on the page', async({page}) =>{
    const dashboardPageObj = new DashboardPage(page);
    await expect(dashboardPageObj.page.getByText('iphone 13 pro')).toBeVisible();
});
