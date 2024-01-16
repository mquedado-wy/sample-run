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
    cy.assertElementVisibleAndType(
      EMAIL_FLD,
      'email-field',
      NEW_SIGNUP_EMAIL_2
    )
    cy.assertElementVisibleAndType(
      MOBILE_NUMBER_FLD,
      'mobile-field',
      MOBILE_NUMBER_LOGIN
    )
    cy.assertElementVisibleAndType(
      BUSINESS_NAME_FLD,
      'business-field',
      BUSINESS_NAME_LOGIN
    )
    cy.assertElementVisibleAndClick(DOWN_EMP_DROPDOWN, 'down-emp-dropwdown')
    cy.assertElementContainsTextAndClick(EMPLOYEE_DROPDOWN, '6-10')
    cy.assertElementVisibleAndType(
      PASSWORD_FLD,
      'user-password',
      DEFAULT_PASSWORD
    )
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
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_2
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-user-password',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')
    // Verify user is able to login and navigated to Dashboard page
    cy.contains('Get Started')
  })
  it('should handle no network connectivitiy', () => {
    cy.visit(`${baseUrl}/login`)
    cy.intercept({ url: '**/*' }, { forceNetworkError: true })
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_2
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-user-password',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')
    cy.assertElementContainsText(LOGIN_ERROR_FLD, LOGIN_NO_INTERNET_ERROR_MSG)
  })
})

describe('DELETE delete_test_orgs', () => {
  it('successfully deletes test organizations', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://staging-api1.workyard.com/delete_test_orgs',
      headers: {
        'x-workyard-system-tests': true
      }
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })
})
