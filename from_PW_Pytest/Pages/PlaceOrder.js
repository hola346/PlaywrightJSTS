

class placeOrder {

    constructor(page) {
        this.page=page;
        this.country=page.getByPlaceholder('Select Country');
        this.button=page.getByText('Place Order');
        this.items=page.locator('.item__details');
    }

    async placeOrder(country) {
        await this.country.pressSequentially(country);
        await this.page.getByRole('button').filter({ hasText: country }).click();
        await this.button.click();
    }

}
module.exports={placeOrder};