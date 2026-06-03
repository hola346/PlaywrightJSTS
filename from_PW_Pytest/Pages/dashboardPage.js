class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card');
        this.cartbutton = page.getByRole('button', { name: 'Cart' });
        this.ordersButton = page.getByRole('button', { name: 'Orders' });
    }

    getProductByName(name) {
        return this.products.filter({ hasText: name });
    }

    async viewProduct(name) {
        await this.getProductByName(name)
            .getByRole('button', { name: 'View' })
            .click();
    }

    async getOrders() {
        await this.ordersButton.click();
    }

    productsInCart() {
        console.log(this.cartbutton);
        return this.cartbutton.locator('label');
    }

    async addProduct2Cart(name) {
        await this.getProductByName(name)
            .getByRole('button', { name: ' Add To Cart' })
            .click();
    }
}

module.exports = { DashboardPage };