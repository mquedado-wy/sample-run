module.exports = {
  projectId: 'd25ro2',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.ts",
    env: {
      BASE_URL: 'https://www.stagingworkyardwebsite.com/u'
    }
  },
};
