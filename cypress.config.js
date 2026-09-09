const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    setupNodeEvents(on, config) {
      return config
    }
  }
})
