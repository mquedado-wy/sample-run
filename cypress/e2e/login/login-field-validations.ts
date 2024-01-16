import {
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  LOGIN_BTN,
  LOGIN_EMAIL_ERROR_FLD,
  LOGIN_PASSWORD_ERROR_FLD,
  LOGIN_ERROR_FLD
} from '../../utilities/login/login-locators'

import {
  LOGIN_EMAIL_ERROR_MSG1,
  LOGIN_EMAIL_ERROR_MSG2,
  LOGIN_PASSWORD_ERROR_MSG1,
  LOGIN_PASSWORD_ERROR_MSG2,
  DEFAULT_PASSWORD,
  LOGIN_WRONG_USERNAME_OR_PASSWORD_MSG,
  UNKNOWN_USER_EMAIL
} from '../../utilities/login/login-messages-constants'

const baseUrl = Cypress.env('baseUrl')
describe('Login Page field validation', () => {
  it('should display the error fields validation for Login Page', () => {
    cy.visit(`${baseUrl}/login`)

    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-btn')
    cy.assertElementContainsText(LOGIN_EMAIL_ERROR_FLD, LOGIN_EMAIL_ERROR_MSG1)
    cy.assertElementContainsText(
      LOGIN_PASSWORD_ERROR_FLD,
      LOGIN_PASSWORD_ERROR_MSG1
    )

    // Second Round of Error Field Validations
    cy.assertElementVisibleAndType(LOGIN_EMAIL_FLD, 'login-email-field', 'M')
    cy.assertElementContainsText(LOGIN_EMAIL_ERROR_FLD, LOGIN_EMAIL_ERROR_MSG2)
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      'wy'
    )
    cy.assertElementContainsText(
      LOGIN_PASSWORD_ERROR_FLD,
      LOGIN_PASSWORD_ERROR_MSG2
    )

    cy.get(LOGIN_EMAIL_FLD).clear()
    cy.get(LOGIN_PASSWORD_FLD).clear()

    // Supplying valid inputs to all fields
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      UNKNOWN_USER_EMAIL
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )

    // Third Round of Error Field Validations - Valid Email and Password
    cy.assertElementsDoNotExist([
      LOGIN_EMAIL_ERROR_FLD,
      LOGIN_PASSWORD_ERROR_FLD
    ])

    // Fourth Round of Error Field Validations - Invalid Password
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')
    cy.assertElementContainsText(
      LOGIN_ERROR_FLD,
      LOGIN_WRONG_USERNAME_OR_PASSWORD_MSG
    )
  })
})
