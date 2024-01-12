module.exports = {
  projectId: 'nir5f9',
  record: true,
  chromeWebSecurity: false,
  e2e: {
    specPattern: 'cypress/e2e/subscription/*.ts',
    excludeSpecPattern: [
      'cypress/utilities/**/*.ts',
      'cypress/e2e/*/*.ts'
      ]
  }
}
