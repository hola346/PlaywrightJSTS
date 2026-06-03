
class orderConfirmed{

    constructor(page) {
        this.page=page;
        this.congrats=page.locator('.hero-primary');
        this.button=page.getByRole('button', {name: 'Click To Download Order Details in CSV'});
        this.orderID=page.locator('td label').filter({hasNotText: 'History'});
        this.itemName=page.locator('.m-3 .title');
    }


}
module.exports={orderConfirmed};