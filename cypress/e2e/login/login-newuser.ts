import {
  FIRST_LAST_NAME_FLD,
  EMAIL_FLD,
  MOBILE_NUMBER_FLD,
  BUSINESS_NAME_FLD,
  EMPLOYEE_DROPDOWN,
  DOWN_EMP_DROPDOWN,
  PASSWORD_FLD,
  LETSGO_BTN,
  CLOSE_TUTORIAL_BTN,
  SKIP_ONBOARDING_BTN,
  LOADING_SPINNER
} from '../../utilities/sign-up/signup-locators'

import {
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  LOGIN_BTN,
  LOGIN_ERROR_FLD
} from '../../utilities/login/login-locators'

import {
  DEFAULT_PASSWORD,
  NEW_SIGNUP_EMAIL_2,
  MOBILE_NUMBER_LOGIN,
  BUSINESS_NAME_LOGIN,
  INIT_NAME,
  LOGIN_NO_INTERNET_ERROR_MSG
} from '../../utilities/login/login-messages-constants'

const baseUrl = Cypress.env('baseUrl')
describe('Verify a "newly" registered user is able to login', () => {
  it('should allow a user to sign up successfully', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${baseUrl}/sign_up`)

    // User supplies valid inputs for all fields
    cy.genRandomString(6).then((randomString: string) => {
      const finName = INIT_NAME + randomString
      cy.get(FIRST_LAST_NAME_FLD).type(finName)
    })
    cy.get(EMAIL_FLD).type(NEW_SIGNUP_EMAIL_2)
    cy.get(MOBILE_NUMBER_FLD).type(MOBILE_NUMBER_LOGIN)
    cy.get(BUSINESS_NAME_FLD).type(BUSINESS_NAME_LOGIN)

    cy.get(DOWN_EMP_DROPDOWN).should('be.visible').click()
    cy.get(EMPLOYEE_DROPDOWN).should('be.visible').contains('6-10').click()
    cy.get(PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.assertElementVisibleAndClick(LETSGO_BTN, 'lets_go_btn')

    // Verify that the loading spinner is displayed
    cy.assertElementsAreVisible([LOADING_SPINNER])
    // This is to wait for the loading spinner to be not visible before proceeding with the next action
    cy.assertElementsDoNotExist([LOADING_SPINNER])

    // User Account is expected to be created and User is navigated to Dashboard page
    cy.assertElementVisibleAndClick(SKIP_ONBOARDING_BTN, 'skipbtn')
    cy.assertElementVisibleAndClick(CLOSE_TUTORIAL_BTN, 'closebtn')

    // Verify user is navigated in Dashboard page
    cy.contains('Get Started')
  })

  it('should login the newly created user', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_2)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-btn')
    // Verify user is able to login and navigated to Dashboard page
    cy.contains('Get Started')
  })
  it('should handle no network connectivitiy', () => {
    cy.visit(`${baseUrl}/login`)
    cy.intercept({ url: '**/*' }, { forceNetworkError: true })
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_2)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-btn')
    cy.assertElementContainsText(LOGIN_ERROR_FLD, LOGIN_NO_INTERNET_ERROR_MSG)
  })
})
