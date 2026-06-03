const { expect } = require('@playwright/test');

class SearchAndBookPage {
    constructor(page) {
        this.page = page;

        this.originInput = page.getByRole('combobox').filter({ hasText: 'Origin Airport' });
        this.destinationInput = page.getByRole('combobox').filter({ hasText: 'Destination Airport' });
        this.departureDateInput = page.locator('[data-cy="departureDate"]');

        this.commodityInput = page.getByRole('combobox').filter({ hasText: 'Commodity' });
        this.unitsInput = page.locator('[id="units-0"]');
        this.dimensionInputs = {
            length: page.locator('input[placeholder="Length"]'),
            width: page.locator('input[placeholder="Width"]'),
            height: page.locator('input[placeholder="Height"]')
        };
        this.weightInput = page.locator('[id="weight-0"]');

        this.searchButton = page.getByRole('button', { name: /search/i });

        this.dropdown = page.locator('.ant-select-dropdown:visible').first();
        this.dropdownOption = this.dropdown.locator('.ant-select-dropdown-menu-item');
        this.calendar = page.locator('.ant-calendar-panel:visible');
    }

    async LoginWasSuccessful() {
        await this.page.getByText('Search and book').waitFor();
        await expect(this.page).toHaveURL(/search-and-book/);
    }

    getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const year = tomorrow.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async selectFromDropdown(comboboxLocator, value) {
        await comboboxLocator.click();
        await this.dropdown.waitFor({ state: 'visible' });

        await comboboxLocator.locator('input').fill(value);
        await this.page.waitForTimeout(300);

        await this.dropdownOption.filter({ hasText: value }).first().click();
        await this.page.waitForTimeout(200);
    }

    async fillDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const targetMonth = monthNames[parseInt(month) - 1];
        const targetDay = parseInt(day);

        await this.departureDateInput.click();
        await this.calendar.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(300);

        // Get current calendar view
        const monthSelect = this.calendar.locator('.ant-calendar-month-select');
        const yearSelect = this.calendar.locator('.ant-calendar-year-select');
        let currentMonth = await monthSelect.textContent();
        let currentYear = await yearSelect.textContent();

        // Navigate to target year if needed
        while (parseInt(currentYear) < parseInt(year)) {
            await this.calendar.locator('.ant-calendar-next-year-btn').click();
            await this.page.waitForTimeout(200);
            currentYear = await yearSelect.textContent();
        }

        // Navigate to target month if needed
        while (currentMonth !== targetMonth) {
            await this.calendar.locator('.ant-calendar-next-month-btn').click();
            await this.page.waitForTimeout(200);
            currentMonth = await monthSelect.textContent();
        }

        // Find and click the day cell - use nth index approach
        const cells = this.calendar.locator('.ant-calendar-cell');
        const count = await cells.count();
        for (let i = 0; i < count; i++) {
            const cellText = await cells.nth(i).textContent();
            if (cellText === targetDay.toString()) {
                await cells.nth(i).click();
                break;
            }
        }

        await this.page.waitForTimeout(200);
    }

    async fillDimensions(dimensionsStr) {
        // Parse "100 - 100 - 100" format
        const parts = dimensionsStr.split('-').map(s => s.trim());
        await this.dimensionInputs.length.fill(parts[0]);
        await this.dimensionInputs.width.fill(parts[1]);
        await this.dimensionInputs.height.fill(parts[2]);
        await this.page.keyboard.press('Enter');
    }

    async fillCompleteForm(options = {}) {
        const {
            origin,
            destination,
            date = this.getTomorrowDate(),
            commodity = 'General Cargo',
            units = '1',
            dimensions = '100 - 100 - 100',
            weight = '100'
        } = options;

        await this.selectFromDropdown(this.originInput, origin);
        await this.selectFromDropdown(this.destinationInput, destination);
        await this.fillDate(date);
        await this.selectFromDropdown(this.commodityInput, commodity);
        await this.unitsInput.fill(units);
        await this.fillDimensions(dimensions);
        await this.weightInput.fill(weight);
    }

    async fillRoute(origin, destination, date = null) {
        await this.selectFromDropdown(this.originInput, origin);
        await this.selectFromDropdown(this.destinationInput, destination);
        await this.fillDate(date || this.getTomorrowDate());
    }

    async searchFlights() {
        await this.searchButton.click();
    }

    async fillAndSearch(options) {
        await this.fillCompleteForm(options);
        await this.searchFlights();
    }
}

module.exports = { SearchAndBookPage };
