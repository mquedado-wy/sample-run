import {
  WORKYARD_LOGO,
  LOGIN_HDR,
  LOGIN_EMAIL_HDR,
  LOGIN_PASSWORD_HDR,
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  RESET_IT_HERE_BTN,
  LOGIN_BTN,
  LOGIN_FORM_DIVIDER,
  LOGIN_WITH_MOBILE
} from '../../utilities/login/login-locators'

const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
describe('Verify Signup Page is loaded', () => {
  it('Visits the staging workyard website Signup Page', () => {
    cy.visit(`${STAGING_BASE_URL}/login`)
    cy.assertElementsAreVisible([WORKYARD_LOGO])

    // Verify all sign-up fields are displayed
    cy.assertElementsAreVisible([
      LOGIN_HDR,
      LOGIN_EMAIL_HDR,
      LOGIN_EMAIL_FLD,
      LOGIN_PASSWORD_HDR,
      LOGIN_PASSWORD_FLD,
      RESET_IT_HERE_BTN,
      LOGIN_BTN,
      LOGIN_FORM_DIVIDER,
      LOGIN_WITH_MOBILE
    ])
  })
})
