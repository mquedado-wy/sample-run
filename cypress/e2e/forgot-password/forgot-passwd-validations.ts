import {
  WORKYARD_LOGO,
  FORGOT_PASSWD_SUCCESS_LOGO,
  FORGOT_PASSWD_SUCCESS_FLD,
  FORGOT_PASSWD_ERROR_FLD,
  RESET_PASSWD_HDR,
  FORGOT_PASSWD_EMAIL_HDR,
  FORGOT_PASSWD_EMAIL_FLD,
  FORGOT_PASSWD_BTN,
  FORGOT_PASSWD_INLINE_ERROR_FLD
} from '../../utilities/forgot-password/forgot-passwd-locators'

import {
  UNKNOWN_USER_EMAIL,
  EXISTING_USER_EMAIL,
  PENDING_USER_EMAIL,
  INVALID_EMAIL,
  FORGOT_PASSWD_SUCCESS_MSG,
  FORGOT_PASSWD_NO_ACCOUNT_MSG,
  FORGOT_PASSWD_PENDING_MSG,
  FORGOT_PASSWD_NO_INPUT_MSG,
  FORGOT_PASSWD_INVALID_MSG
} from '../../utilities/forgot-password/forgot-passwd-messages-constants'

const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
describe('Verify Users use "Forgot Password" feature', () => {
  it('should display all forgot password fields and web elements', () => {
    cy.visit(`${STAGING_BASE_URL}/forgot_password`)
    cy.assertElementsAreVisible([WORKYARD_LOGO])

    // Verify all forgot password fields and web elements are displayed
    cy.assertElementsAreVisible([
      RESET_PASSWD_HDR,
      FORGOT_PASSWD_EMAIL_HDR,
      FORGOT_PASSWD_EMAIL_FLD,
      FORGOT_PASSWD_BTN
    ])
  })

  it('should display instructions for forgot password', () => {
    cy.visit(`${STAGING_BASE_URL}/forgot_password`)
    cy.assertElementsAreVisible([WORKYARD_LOGO])

    // Verify success message when existing user tries to use forgot password feature
    cy.assertElementVisibleAndType(
      FORGOT_PASSWD_EMAIL_FLD,
      'fp-email-field',
      EXISTING_USER_EMAIL
    )
    cy.assertElementVisibleAndClick(FORGOT_PASSWD_BTN, 'fp-button')
    cy.assertElementsAreVisible([
      FORGOT_PASSWD_SUCCESS_LOGO,
      FORGOT_PASSWD_SUCCESS_FLD
    ])
    cy.assertElementContainsText(
      FORGOT_PASSWD_SUCCESS_FLD,
      FORGOT_PASSWD_SUCCESS_MSG
    )
  })

  it('should not allow non-existent users to use the forgot password feature', () => {
    cy.visit(`${STAGING_BASE_URL}/forgot_password`)
    cy.assertElementsAreVisible([WORKYARD_LOGO])

    // Verify error message when unknown user tries to use forgot password feature
    cy.assertElementVisibleAndType(
      FORGOT_PASSWD_EMAIL_FLD,
      'fp-email-field',
      UNKNOWN_USER_EMAIL
    )
    cy.assertElementVisibleAndClick(FORGOT_PASSWD_BTN, 'fp-button')
    cy.assertElementContainsText(
      FORGOT_PASSWD_ERROR_FLD,
      FORGOT_PASSWD_NO_ACCOUNT_MSG
    )
  })

  it('should allow pending users to use the forgot password feature', () => {
    cy.visit(`${STAGING_BASE_URL}/forgot_password`)
    cy.assertElementsAreVisible([WORKYARD_LOGO])

    // Verify info message when pending user tries to use forgot password feature
    cy.assertElementVisibleAndType(
      FORGOT_PASSWD_EMAIL_FLD,
      'fp-email-field',
      PENDING_USER_EMAIL
    )
    cy.assertElementVisibleAndClick(FORGOT_PASSWD_BTN, 'fp-button')
    cy.assertElementContainsText(
      FORGOT_PASSWD_ERROR_FLD,
      FORGOT_PASSWD_PENDING_MSG
    )
  })

  it('should show other in-line error messages for invalid inputs', () => {
    cy.visit(`${STAGING_BASE_URL}/forgot_password`)
    cy.assertElementsAreVisible([WORKYARD_LOGO])

    // Verify info message when unknown user tries to use forgot password feature
    cy.assertElementVisibleAndClick(FORGOT_PASSWD_BTN, 'fp-button')
    cy.assertElementContainsText(
      FORGOT_PASSWD_INLINE_ERROR_FLD,
      FORGOT_PASSWD_NO_INPUT_MSG
    )
    cy.assertElementVisibleAndType(
      FORGOT_PASSWD_EMAIL_FLD,
      'fp-email-field',
      INVALID_EMAIL
    )
    cy.assertElementContainsText(
      FORGOT_PASSWD_INLINE_ERROR_FLD,
      FORGOT_PASSWD_INVALID_MSG
    )
    cy.get(FORGOT_PASSWD_EMAIL_FLD).clear()
    cy.assertElementVisibleAndType(
      FORGOT_PASSWD_EMAIL_FLD,
      'fp-email-field',
      EXISTING_USER_EMAIL
    )
    cy.assertElementsDoNotExist([FORGOT_PASSWD_INLINE_ERROR_FLD])
  })
  // This is to clean-up the test organization and its related data associated with it
  after(() => {
    cy.mailinatorEmailCleanUp()
  })
})
