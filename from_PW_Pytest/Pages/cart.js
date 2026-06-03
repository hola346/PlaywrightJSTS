

class Cart {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout❯' });
    }


    async Checkout() {
        await this.checkoutButton.click();
    }

}

module.exports = { Cart };