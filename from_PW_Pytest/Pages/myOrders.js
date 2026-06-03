
class myOrders {

    constructor (page){
        this.page=page;
        this.row=page.locator('tr');
    }

    async selectOrderRow (orderNum){
        const row=await this.row.filter({hasText: orderNum});
        await row.getByRole('button', {name: 'View'}).click();
    }
}
module.exports={myOrders};