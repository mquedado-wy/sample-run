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
  INIT_NAME,
  NEW_SIGNUP_EMAIL,
  BUSINESS_NAME_SIGNUP,
  MOBILE_NUMBER_SIGNUP,
  DEFAULT_PASSWORD
} from '../../utilities/sign-up/signup-messages-constants'

describe('Verify User Signs up for a 14-day Trial Period', () => {
  it('should allow a user to sign up successfully', () => {
    // User is navigated to SIGN-UP page
    const baseUrl = Cypress.env('baseUrl')
    cy.visit(`${baseUrl}/sign_up`)

    // User supplies valid inputs for all fields
    cy.genRandomString(6).then(randomString => {
      const finName = INIT_NAME + randomString
      cy.get(FIRST_LAST_NAME_FLD).type(finName)
    })

    cy.assertElementVisibleAndType(EMAIL_FLD, 'user-email', NEW_SIGNUP_EMAIL)
    cy.assertElementVisibleAndType(
      MOBILE_NUMBER_FLD,
      'user-mobile',
      MOBILE_NUMBER_SIGNUP
    )
    cy.assertElementVisibleAndType(
      BUSINESS_NAME_FLD,
      'user-business-name',
      BUSINESS_NAME_SIGNUP
    )
    cy.assertElementVisibleAndClick(DOWN_EMP_DROPDOWN, 'down-emp-dropwdown')
    cy.assertElementContainsTextAndClick(EMPLOYEE_DROPDOWN, '6-10')
    cy.assertElementVisibleAndType(
      PASSWORD_FLD,
      'user-password',
      DEFAULT_PASSWORD
    )

    // Temporarily simulating no internet connection
    cy.window().then(win => {
      cy.stub(win.navigator, 'onLine').value(false)
    })

    cy.get(LETSGO_BTN).should('be.visible').click()

    // Verify that the loading spinner is displayed
    cy.assertElementsAreVisible([LOADING_SPINNER])
    // This is to wait for the loading spinner to be not visible before proceeding with the next action
    cy.assertElementsDoNotExist([LOADING_SPINNER])

    // User Account is expected to be created and User is navigated to Dashboard page
    cy.assertElementVisibleAndClick(SKIP_ONBOARDING_BTN, 'skip-btn')
    cy.assertElementVisibleAndClick(CLOSE_TUTORIAL_BTN, 'close-btn')

    // Verify user is navigated in Dashboard page
    cy.contains('Get Started')
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
