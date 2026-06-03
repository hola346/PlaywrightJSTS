
const { expect } = require('@playwright/test');

class ReviewAndBookPage {
    constructor(page) {
        this.page = page;

        this.AWBNumberInput = page.getByRole('combobox').filter({ hasText: 'Automatically Generated' });
        this.AWBTypeInput = page.getByRole('combobox').filter({ hasText: 'Select your AWB type' });
        this.dropdown = page.locator('.ant-select-dropdown:visible').first();
        this.dropdownOption = this.dropdown.locator('.ant-select-dropdown-menu-item');
        this.bookButton = page.getByRole('button').filter({ hasText:"Book this shipment" });
    }

    async PickFlightSuccessful() {
        await this.page.getByText('Change selected flight').waitFor();
        await expect(this.page).toHaveURL(/review-and-book/);
    }

    async selectFromDropdown(comboboxLocator, value) {
        await comboboxLocator.click();
        await this.dropdown.waitFor({ state: 'visible' });

        await this.dropdownOption.filter({ hasText: value }).first().click();
        await this.page.waitForTimeout(200);
    }

    async fillAWBDetails(awbNumber, awbType) {
        await this.selectFromDropdown(this.AWBNumberInput, awbNumber);
        await this.selectFromDropdown(this.AWBTypeInput, awbType);
    }
    async confirmBooking() {
        await this.bookButton.click();
    }

}

module.exports = { ReviewAndBookPage };