
const { expect } = require('@playwright/test');

class DinamycResultsPage {
    constructor(page) {
        this.page = page;

        this.availableCards = page.locator('[data-cy="cardPosition2-0-MD"]');
        this.confirmButton = page.locator('#selectYourchoiceButton-0');
    }

    async SearchWasSuccessful() {
        await this.page.getByText('Change Search').waitFor();
        await expect(this.page).toHaveURL(/dynamic-results/);
    }

    async PickFlight() {
        await this.availableCards.waitFor();
        await this.availableCards.click({ force: true });
        await this.confirmButton.hover();
        await this.confirmButton.click({ force: true });

    }
}
module.exports = { DinamycResultsPage };