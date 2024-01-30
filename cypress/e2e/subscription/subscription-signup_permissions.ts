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
  DOWN_PLAN_DROPDOWN,
  PLAN_DROPDOWN_OPTIONS,
  SUBSCRIPTION_MODAL_CONTAINER
} from '../../utilities/subscription/subscription-locators'

import {
  ORGANIZATION_BTN,
  PERSONAL_BTN,
  PLANS_AND_BILLING_BTN,
  SETTINGS_BTN
} from 'cypress/utilities/dashboard/dashboard-locators'

const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
const STAGING_TEST_MANAGER_ACCOUNT = Cypress.env('STAGING_TEST_MANAGER_ACCOUNT')
const STAGING_TEST_WORKER_ACCOUNT = Cypress.env('STAGING_TEST_WORKER_ACCOUNT')
describe('Verify the permsissions of Admin, Manager and Worker in Signing up for Subscription', () => {
  it('should verify that Admin has options for subscription to Time Tracking and Workforce Management', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${STAGING_BASE_URL}/sign_up`)

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
    cy.assertElementVisibleAndClick(SKIP_ONBOARDING_BTN, 'skipbtn')
    cy.assertElementVisibleAndClick(CLOSE_TUTORIAL_BTN, 'closebtn')

    // Verify user is navigated in Dashboard page
    cy.contains('Get Started')

    // Verify that Plans and Settings are available
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-button')
    cy.assertElementsAreVisible([PLANS_AND_BILLING_BTN])

    // Verify Admin can see options for subscription to Time Tracking and Workforce Management

    cy.assertElementVisibleAndClick(ACTIVATE_PLAN_BTN, 'activate_plan_btn')
    cy.assertElementsAreVisible([SUBSCRIPTION_MODAL_CONTAINER])
    cy.assertElementVisibleAndClick(DOWN_PLAN_DROPDOWN, 'down_icon_dropdown')
    cy.assertStringsInElement(PLAN_DROPDOWN_OPTIONS, [
      'Monthly Time Tracking Plan',
      'Monthly Workforce Management Plan',
      'Annual Time Tracking Plan',
      'Annual Workforce Management Plan'
    ])
  })

  it('should verify that Manager User does not have access to "Plans & Billing" menu', () => {
    // Logins the test data for User: Manager
    cy.visit(`${baseUrl}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      STAGING_TEST_MANAGER_ACCOUNT
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    cy.assertElementsDoNotExist([ACTIVATE_PLAN_BTN])
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-btn')
    cy.assertElementNotContainText(PERSONAL_BTN, 'Plans & Billing')
    cy.assertElementContainsText(PERSONAL_BTN, 'Personal')
    cy.assertElementContainsText(ORGANIZATION_BTN, 'Organization')
  })

  it('should verify that Worker User does not have access to "Plans & Billing" and "Personal" menu', () => {
    // Logins the test data for User: Worker
    cy.visit(`${STAGING_BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      STAGING_TEST_WORKER_ACCOUNT
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    cy.assertElementsDoNotExist([ACTIVATE_PLAN_BTN])
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-btn')
    cy.assertElementNotContainText(PERSONAL_BTN, 'Plans & Billing')
    cy.assertElementNotContainText(PERSONAL_BTN, 'Organization')
    cy.assertElementContainsText(PERSONAL_BTN, 'Personal')
  })
  after(() => {
    // This is to clean-up the test organization and its related data associated with it
    cy.testDataCleanUp()
  })
})
