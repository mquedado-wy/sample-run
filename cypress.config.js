module.exports = {
  projectId: 'nir5f9',
  record: true,
  chromeWebSecurity: false,
  e2e: {
    specPattern: [
      'cypress/e2e/sign-up/*.ts',
      'cypress/e2e/login/*.ts',
      'cypress/e2e/logout/*.ts',
      'cypress/e2e/forgot-password/*.ts',
      'cypress/e2e/subscription/*.ts',
    ],
    excludeSpecPattern: 'cypress/utilities/**/*.ts'
  }
}
