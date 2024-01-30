import {
  FIRST_LAST_NAME_LBL,
  EMAIL_LBL,
  MOBILE_NUMBER_LBL,
  BUSINESS_NAME_LBL,
  EMPLOYEE_DROPDOWN_LBL,
  PASSWORD_LBL,
  LETSGO_BTN
} from '../../utilities/sign-up/signup-locators'

describe('Verify Signup Page is loaded', () => {
  it('Visits the staging workyard website Signup Page', () => {
    const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
    cy.visit(`${STAGING_BASE_URL}/sign_up`)
    cy.assertElementContainsText('h1', 'Try Workyard for free')

    // Verify all sign-up fields are displayed
    cy.assertElementsAreVisible([
      FIRST_LAST_NAME_LBL,
      EMAIL_LBL,
      MOBILE_NUMBER_LBL,
      BUSINESS_NAME_LBL,
      EMPLOYEE_DROPDOWN_LBL,
      PASSWORD_LBL
    ])
    cy.assertScrollIntoViewElementIsVisible(LETSGO_BTN)

    // Verify that Terms of Use and Provicy Policy has the correct hyperlinks
    cy.assertScrollIntoViewElementHaveAttr(
      'a',
      'Terms of Use',
      'href',
      'https://www.workyard.com/terms'
    )
    cy.assertScrollIntoViewElementHaveAttr(
      'a',
      'Privacy Policy',
      'href',
      'https://www.workyard.com/privacy'
    )
  })
})
