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

const baseUrl = Cypress.env('baseUrl')
const testManagerAccount = Cypress.env('testManagerAccount')
const testWorkerAccount = Cypress.env('testWorkerAccount')
describe('Verify the permsissions of Admin, Manager and Worker in Signing up for Subscription', () => {
  it('should verify that Admin has options for subscription to Time Tracking and Workforce Management', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${baseUrl}/sign_up`)

    // User supplies valid inputs for all fields
    cy.genRandomString(6).then((randomString: string) => {
      const finName = INIT_NAME + randomString
      cy.get(FIRST_LAST_NAME_FLD).type(finName)
    })
    cy.get(EMAIL_FLD).type(NEW_SIGNUP_EMAIL)
    cy.get(MOBILE_NUMBER_FLD).type(MOBILE_NUMBER_SIGNUP)
    cy.get(BUSINESS_NAME_FLD).type(BUSINESS_NAME_SIGNUP)
    cy.assertElementVisibleAndClick(DOWN_EMP_DROPDOWN, 'down-emp-dropdown')
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

    // Verify that Plans and Settings are available
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-btn')
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
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(testManagerAccount)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    cy.assertElementsDoNotExist([ACTIVATE_PLAN_BTN])
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-btn')
    cy.assertElementNotContainText(PERSONAL_BTN, 'Plans & Billing')
    cy.assertElementContainsText(PERSONAL_BTN, 'Personal')
    cy.assertElementContainsText(ORGANIZATION_BTN, 'Organization')
  })

  it('should verify that Worker User does not have access to "Plans & Billing" and "Personal" menu', () => {
    // Logins the test data for User: Worker
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(testWorkerAccount)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    cy.assertElementsDoNotExist([ACTIVATE_PLAN_BTN])
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-btn')
    cy.assertElementNotContainText(PERSONAL_BTN, 'Plans & Billing')
    cy.assertElementNotContainText(PERSONAL_BTN, 'Organization')
    cy.assertElementContainsText(PERSONAL_BTN, 'Personal')
  })
})
