
const { test: base } = require('@playwright/test');

exports.test = base.extend({
    getTodayDDMMYYYY: async ({ page }, use) => {
        const fn = async () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            return `${day}/${month}/${year}`;
        };
        await use(fn);
    }
});