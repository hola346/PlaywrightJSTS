
const { expect } = require('@playwright/test');

class Products {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Internal Variables (Locators)
        this.title = page.locator('.title');
        //this.pagetitle = page.getByText('Swag Labs')

    }

    // Internal Method: Navigation
    async checktitle(title) {
        await expect(this.title).toHaveText(title);
    }
    async checkpagetitle(pagetitle) {
        await expect(this.page).toHaveTitle(pagetitle);
    }
    async checkUrl(url) {
        await expect(this.page).toHaveURL(url);
    }
}
module.exports = { Products };