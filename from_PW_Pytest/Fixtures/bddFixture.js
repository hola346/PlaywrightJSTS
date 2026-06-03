const { test: base } = require('playwright-bdd');

const test = base.extend({
    sharedData: async ({ }, use) => {
        const data = {};
        await use(data);
    }
});

// Explicitly extract expect from the bdd base
const { expect } = base;

// Export both clearly so your steps file can destructure them
module.exports = { test, expect };