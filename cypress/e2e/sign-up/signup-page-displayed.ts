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
    const baseUrl = Cypress.env('baseUrl')
    cy.visit(`${baseUrl}/sign_up`)
    cy.contains('Try Workyard for free').should('be.visible')

    // Verify all sign-up fields are displayed
    cy.get(FIRST_LAST_NAME_LBL).should('be.visible')
    cy.get(EMAIL_LBL).should('be.visible')
    cy.get(MOBILE_NUMBER_LBL).should('be.visible')
    cy.get(BUSINESS_NAME_LBL).should('be.visible')
    cy.get(EMPLOYEE_DROPDOWN_LBL).should('be.visible')
    cy.get(PASSWORD_LBL).should('be.visible')
    cy.get(LETSGO_BTN).scrollIntoView().should('be.visible')

    // Verify that Terms of Use and Provicy Policy has the correct hyperlinks
    cy.contains('a', 'Terms of Use')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.workyard.com/terms')
    cy.contains('a', 'Privacy Policy')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.workyard.com/privacy')
  })
})
