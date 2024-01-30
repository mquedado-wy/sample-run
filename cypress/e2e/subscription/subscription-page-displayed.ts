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
  NEW_SIGNUP_EMAIL,
  BUSINESS_NAME_SIGNUP,
  MOBILE_NUMBER_SIGNUP,
  DEFAULT_PASSWORD,
  INIT_NAME
} from '../../utilities/sign-up/signup-messages-constants'

import {
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  LOGIN_BTN
} from '../../utilities/login/login-locators'

import {
  ACTIVATE_PLAN_BTN,
  AGREE_TERMS_OF_SERVICE,
  APPLY_COUPON,
  CREDIT_CARD_FLD,
  DOWN_PLAN_DROPDOWN,
  DUE_NOW_HDR,
  PLAN_DROPDOWN,
  PLAN_DROPDOWN_LIST,
  PLAN_LBL1,
  PLAN_LBL2,
  PLAN_SUMMARY1,
  PLAN_SUMMARY2,
  SUBSCRIBE_BTN,
  SUBSCRIBE_HDR,
  SUBSCRIPTION_MODAL_CONTAINER,
  SUBSCRIPTION_PLAN_FLD
} from '../../utilities/subscription/subscription-locators'

import {
  SUBSCRIPTION_HDR_MSG,
  ANNUAL_SUBCRIPTION_MSG,
  MONTHLY_SUBCRIPTION_MSG,
  AGREE_TERMS_OF_SERVICE_MSG
} from '../../utilities/subscription/subscription-messages-constants'

const baseUrl = Cypress.env('STAGING_BASE_URL')
describe('Create a new User to test Subscription Page', () => {
  it('should allow a user to sign up successfully', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${baseUrl}/sign_up`)

    // User supplies valid inputs for all fields
    cy.genRandomString(6).then((randomString: string) => {
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
    cy.assertElementVisibleAndClick(LETSGO_BTN, 'letsgo-button')

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

  it('should verify that all "Subscription" fields,labels and headers are displayed', () => {
    // Logins the newly created user
    cy.visit(`${baseUrl}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to login and navigated to Dashboard page
    cy.contains('Get Started')

    cy.assertElementVisibleAndClick(ACTIVATE_PLAN_BTN, 'activate_plan_btn')
    cy.assertElementsAreVisible([SUBSCRIPTION_MODAL_CONTAINER])
    cy.assertElementContainsText(SUBSCRIBE_HDR, SUBSCRIPTION_HDR_MSG)
    cy.assertElementsAreVisible([PLAN_LBL1, PLAN_DROPDOWN]).should('be.visible')
    cy.assertScrollIntoViewElementContainsText(
      SUBSCRIPTION_PLAN_FLD,
      MONTHLY_SUBCRIPTION_MSG,
      MONTHLY_SUBCRIPTION_MSG
    )
    cy.assertElementVisibleAndClick(DOWN_PLAN_DROPDOWN, 'down-plan-dropdown')
    cy.assertElementContainsTextAndClick(
      PLAN_DROPDOWN_LIST,
      'Annual Time Tracking Plan'
    )
    cy.assertScrollIntoViewElementContainsText(
      SUBSCRIPTION_PLAN_FLD,
      ANNUAL_SUBCRIPTION_MSG,
      ANNUAL_SUBCRIPTION_MSG
    )
    cy.assertScrollIntoViewElementsAreVisible([
      PLAN_LBL2,
      PLAN_SUMMARY1,
      PLAN_SUMMARY2,
      APPLY_COUPON,
      DUE_NOW_HDR,
      CREDIT_CARD_FLD,
      SUBSCRIBE_BTN
    ])

    cy.assertScrollIntoViewElementIsVisible(AGREE_TERMS_OF_SERVICE).contains(
      AGREE_TERMS_OF_SERVICE_MSG
    )
    cy.assertElementContainsText('button', 'Terms of service')
  })
  after(() => {
    // This is to clean-up the test organization and its related data associated with it
    cy.testDataCleanUp()
  })
})
