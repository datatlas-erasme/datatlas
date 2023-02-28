import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
  screenshotOnRunFailure: false,
  videoCompression: false,
});
