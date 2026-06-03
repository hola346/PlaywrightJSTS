import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

require('dotenv').config();

module.exports = {
  use: {
    headless: false,
  },
};
console.log('this my COOONNNFIIIIGGGGG');
console.log('this is username' + process.env.USER);
export default defineConfig({
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  testDir: './tests',


  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'storageState.json', },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: 'storageState.json', },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'storageState.json', },
      dependencies: ['setup'],
    },
  ],
});