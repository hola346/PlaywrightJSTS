import {expect} from '@playwright/test';
class ProductPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('h2'); // example selector
        this.button=page.getByRole('button', {name: 'Add to Cart'});
    }

    async expectUrlContains(id) {
        await expect(this.page).toHaveURL(new RegExp(id));
    }

    async expectProductName(name) {
        await expect(this.productName).toContainText(name);
    }

    async addToCart(){
        await this.button.click();
    }
}

module.exports = { ProductPage };