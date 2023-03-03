const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
  },
});