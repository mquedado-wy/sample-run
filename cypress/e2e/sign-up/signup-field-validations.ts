import {
  FIRST_LAST_NAME_FLD,
  EMAIL_FLD,
  MOBILE_NUMBER_FLD,
  BUSINESS_NAME_FLD,
  EMPLOYEE_DROPDOWN,
  DOWN_EMP_DROPDOWN,
  PASSWORD_FLD,
  LETSGO_BTN,
  FIRST_LAST_NAME_ERROR_FLD,
  EMAIL_ERROR_FLD,
  MOBILE_NUMBER_ERROR_FLD,
  BUSINESS_NAME_ERROR_FLD,
  EMPLOYEE_DROPDOWN_ERROR_FLD,
  PASSWORD_ERROR_FLD,
  PASSWORD_INFO_FLD,
  MOBILE_NUMBER_INFO_FLD
} from '../../utilities/sign-up/signup-locators'

import {
  FIRST_LAST_NAME_ERROR_MSG1,
  FIRST_LAST_NAME_ERROR_MSG2,
  EMAIL_ERROR_MSG,
  MOBILE_NUMBER_ERROR_MSG1,
  MOBILE_NUMBER_ERROR_MSG2,
  BUSINESS_NAME_ERROR_MSG,
  EMPLOYEE_DROPDOWN_ERROR_MSG,
  PASSWORD_ERROR_MSG1,
  PASSWORD_ERROR_MSG2,
  MOBILE_NUMBER_INFO_MSG,
  PASSWORD_INFO_MSG,
  DEFAULT_PASSWORD,
  INIT_NAME,
  NEW_SIGNUP_EMAIL,
  MOBILE_NUMBER_SIGNUP,
  BUSINESS_NAME_SIGNUP
} from '../../utilities/sign-up/signup-messages-constants'

describe('Sign-up field validation', () => {
  it('should able to verify sign-up field error validations', () => {
    // User is navigated to SIGN-UP page
    const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
    cy.visit(`${STAGING_BASE_URL}/sign_up`)

    // First Round of Error Field Validations
    cy.get(LETSGO_BTN).click()
    cy.assertElementContainsText(
      FIRST_LAST_NAME_ERROR_FLD,
      FIRST_LAST_NAME_ERROR_MSG1
    )
    cy.assertElementContainsText(EMAIL_ERROR_FLD, EMAIL_ERROR_MSG)
    cy.assertElementContainsText(
      MOBILE_NUMBER_ERROR_FLD,
      MOBILE_NUMBER_ERROR_MSG1
    )
    cy.assertElementContainsText(
      BUSINESS_NAME_ERROR_FLD,
      BUSINESS_NAME_ERROR_MSG
    )
    cy.assertElementContainsText(
      EMPLOYEE_DROPDOWN_ERROR_FLD,
      EMPLOYEE_DROPDOWN_ERROR_MSG
    )
    cy.assertElementContainsText(PASSWORD_ERROR_FLD, PASSWORD_ERROR_MSG1)

    // Second Round of Error Field Validations
    cy.assertElementVisibleAndType(
      FIRST_LAST_NAME_FLD,
      'first-and-last-name',
      'M'
    ).type('M')
    cy.assertElementContainsText(
      FIRST_LAST_NAME_ERROR_FLD,
      FIRST_LAST_NAME_ERROR_MSG2
    )

    cy.assertElementVisibleAndType(
      MOBILE_NUMBER_FLD,
      'mobile-number-invalid',
      '+1'
    )
    cy.assertElementContainsText(
      MOBILE_NUMBER_ERROR_FLD,
      MOBILE_NUMBER_ERROR_MSG2
    )

    cy.assertElementVisibleAndType(PASSWORD_FLD, 'password-invalid', 'wy')
    cy.assertElementContainsText(PASSWORD_ERROR_FLD, PASSWORD_ERROR_MSG2)

    cy.get(FIRST_LAST_NAME_FLD).clear()
    cy.get(MOBILE_NUMBER_FLD).clear()
    cy.get(PASSWORD_FLD).clear()

    // Supplying valid inputs to all fields
    cy.genRandomString(6).then(randomString => {
      const finName = INIT_NAME + randomString
      cy.get(FIRST_LAST_NAME_FLD).type(finName)
    })
    cy.assertElementVisibleAndType(EMAIL_FLD, 'email-field', NEW_SIGNUP_EMAIL)
    cy.assertElementVisibleAndType(
      MOBILE_NUMBER_FLD,
      'mobile-field',
      MOBILE_NUMBER_SIGNUP
    )
    cy.assertElementVisibleAndType(
      BUSINESS_NAME_FLD,
      'business-field',
      BUSINESS_NAME_SIGNUP
    )
    cy.assertElementVisibleAndClick(DOWN_EMP_DROPDOWN, 'down-emp-dropwdown')
    cy.assertElementContainsTextAndClick(EMPLOYEE_DROPDOWN, '6-10')
    cy.assertElementVisibleAndType(
      PASSWORD_FLD,
      'password-field',
      DEFAULT_PASSWORD
    )

    // Third Round of Error Field Validations
    cy.assertElementsDoNotExist([
      FIRST_LAST_NAME_ERROR_FLD,
      EMAIL_ERROR_FLD,
      MOBILE_NUMBER_ERROR_FLD,
      BUSINESS_NAME_ERROR_FLD,
      EMPLOYEE_DROPDOWN_ERROR_FLD
    ])

    // Verifying of Info Messages Displayed
    cy.assertElementContainsText(MOBILE_NUMBER_INFO_FLD, MOBILE_NUMBER_INFO_MSG)
    cy.assertElementContainsText(PASSWORD_INFO_FLD, PASSWORD_INFO_MSG)
  })
})
