import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: 'http://localhost:5173/',
    defaultCommandTimeout: 5000,
    video: true,
    screenshotOnRunFailure: true,
    videoUploadOnPasses: false,
    watchForFileChanges: false,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
  },
});
