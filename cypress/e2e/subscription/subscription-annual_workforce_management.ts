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
  PAYMENT_CARD_NUMBER_FLD,
  PAYMENT_CVC_FLD,
  PAYMENT_EXP_DATE_FLD,
  PAYMENT_POSTAL_FLD,
  PLAN_DROPDOWN_OPTIONS,
  SUBSCRIBE_BTN,
  SUBSCRIPTION_MODAL_CONTAINER,
  UNLOCK_FLD,
  UNLOCK_ICON,
  START_30_DAY_WFM_TRIAL_BTN,
  AGREE_TERMS_OF_SERVICE
} from '../../utilities/subscription/subscription-locators'

import {
  VISA_CARD,
  DYNAMIC_MONTH,
  DYNAMIC_YEAR,
  DYNAMIC_CVC,
  SEATLE_ZIPCODE
} from '../../utilities/subscription/subscription-messages-constants'

import {
  PLANS_AND_BILLING_BTN,
  SETTINGS_BTN
} from 'cypress/utilities/dashboard/dashboard-locators'

import {
  SUBSCRIPTION_TYPE_PLAN_LBL,
  SUBSCRIPTION_TYPE_PLAN_HDR,
  SUBSCRIPTION_PERIOD_PLAN_HDR,
  SUBSCRIPTION_PERIOD_PLAN_LBL
} from 'cypress/utilities/plans-and-billing/plans_and_billing-locators'

import {
  TIMECARDS_NAV_BTN,
  PROJECT_HUB_NAV_BTN,
  TASK_AND_SCHEDULE_NAV_BTN,
  JOB_COSTING_NAV_BTN,
  TEAM_MEMBERS_NAV_BTN
} from '../../utilities/dashboard/dashboard-locators'

const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
const STAGING_PAYMENT_METHOD_ENDPOINT = Cypress.env('STAGING_PAYMENT_METHOD_ENDPOINT')
const STAGING_BILLING_AND_PLANS_ENDPOINT = new RegExp(
  Cypress.env('STAGING_BILLING_AND_PLANS_ENDPOINT')
)
describe('Create a new User to test Subscription Page', () => {
  it('should allow a user to sign up successfully', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${STAGING_BASE_URL}/sign_up`)

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

  it('should verify that user is able to subscribe to "WORKFORCE MANAGEMENT PLAN - ANNUALLY"', () => {
    // Logins the newly created user
    cy.visit(`${STAGING_BASE_URL}/login`)
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
    cy.assertElementVisibleAndClick(DOWN_PLAN_DROPDOWN, 'down_icon_dropdown')
    cy.assertElementContainsTextAndClick(
      PLAN_DROPDOWN_OPTIONS,
      'Annual Workforce Management Plan'
    )

    // Verify user is able to enter payment card details
    cy.getStripeElement(PAYMENT_CARD_NUMBER_FLD).type(VISA_CARD)
    cy.getStripeElement(PAYMENT_EXP_DATE_FLD).type(
      `${DYNAMIC_MONTH}/${DYNAMIC_YEAR}`
    )
    cy.getStripeElement(PAYMENT_CVC_FLD).type(DYNAMIC_CVC)
    cy.getStripeElement(PAYMENT_POSTAL_FLD).type(SEATLE_ZIPCODE)

    // Intercept 'POST' Request then wait for the request to have Success 200 Code
    cy.assertElementVisibleAndClick(AGREE_TERMS_OF_SERVICE, 'accept-terms')
    cy.intercept('POST', STAGING_PAYMENT_METHOD_ENDPOINT).as('subscribePlan')
    cy.intercept('POST', STAGING_BILLING_AND_PLANS_ENDPOINT).as('billingEndPoint')

    cy.assertElementVisibleAndClick(SUBSCRIBE_BTN, 'subscribe-btn')
    cy.wait(['@subscribePlan', '@billingEndPoint']).spread(
      (subscribePlan, billingEndPoint) => {
        if (subscribePlan.response != null) {
          expect(subscribePlan.response.statusCode).to.equal(200)
        }

        if (billingEndPoint.response != null) {
          expect(billingEndPoint.response.statusCode).to.equal(200)
        }
      }
    )

    // Verify user is navigated in 'Setup: Get Started' page
    cy.contains('Get Started')
  })

  it('should verify that user is successfully subscribe to "WORKFORCE MANAGEMENT - ANNUALLY"', () => {
    // Logins the newly created user
    cy.visit(`${STAGING_BASE_URL}/login`)
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

    // Verify user is navigated to Plans and Billing Page"
    cy.assertElementVisibleAndClick(SETTINGS_BTN, 'settings-btn')
    cy.assertElementVisibleAndClick(
      PLANS_AND_BILLING_BTN,
      'plans-and-billing-btn'
    )

    // Verify that the user is subscribe to "WORKFORCE MANAGEMENT - ANNUALLY"
    cy.assertElementContainsText(SUBSCRIPTION_TYPE_PLAN_HDR, 'Plan:')
    cy.assertElementContainsText(
      SUBSCRIPTION_TYPE_PLAN_LBL,
      'Workforce Management'
    )
    cy.assertElementContainsText(SUBSCRIPTION_PERIOD_PLAN_HDR, 'Subscription:')
    cy.assertElementContainsText(SUBSCRIPTION_PERIOD_PLAN_LBL, 'Annual')
  })

  it('should verify that user has both "TIME TRACKING and WORKFORCE MANAGEMENT" features only', () => {
    // Logins the newly created user
    cy.visit(`${STAGING_BASE_URL}/login`)
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

    // Verify user subscribed in "WORKFORCE MANAGEMENT" plan has a feature of "Timecards"
    cy.assertElementVisibleAndClick(TIMECARDS_NAV_BTN, 'timecards_btn')
    cy.assertElementsDoNotExist([
      UNLOCK_ICON,
      UNLOCK_FLD,
      START_30_DAY_WFM_TRIAL_BTN
    ])

    // Verify user subscribed in "WORKFORCE MANAGEMENT" has a feature of "Projects"
    cy.assertElementVisibleAndClick(PROJECT_HUB_NAV_BTN, 'project-hub_btn')
    cy.assertElementsDoNotExist([
      UNLOCK_ICON,
      UNLOCK_FLD,
      START_30_DAY_WFM_TRIAL_BTN
    ])

    // Verify user subscribed in "WORKFORCE MANAGEMENT" has a feature of "Projects"
    cy.assertElementVisibleAndClick(TASK_AND_SCHEDULE_NAV_BTN, 'task-sked_btn')
    cy.assertElementsDoNotExist([
      UNLOCK_ICON,
      UNLOCK_FLD,
      START_30_DAY_WFM_TRIAL_BTN
    ])

    // Verify user subscribed in "WORKFORCE MANAGEMENT" has a feature of "Scheduling & Tasks"
    cy.assertElementVisibleAndClick(TASK_AND_SCHEDULE_NAV_BTN, 'task-sked_btn')
    cy.assertElementsDoNotExist([
      UNLOCK_ICON,
      UNLOCK_FLD,
      START_30_DAY_WFM_TRIAL_BTN
    ])

    // Verify user subscribed in "WORKFORCE MANAGEMENT" has a feature of "Job Costing"
    cy.assertElementVisibleAndClick(JOB_COSTING_NAV_BTN, 'job-costing_btn')
    cy.assertElementsDoNotExist([
      UNLOCK_ICON,
      UNLOCK_FLD,
      START_30_DAY_WFM_TRIAL_BTN
    ])

    // // Verify user subscribed in "WORKFORCE MANAGEMENT" has a feature of "Projects"
    cy.assertElementVisibleAndClick(TEAM_MEMBERS_NAV_BTN, 'team-mem_btn')
    cy.assertElementsDoNotExist([
      UNLOCK_ICON,
      UNLOCK_FLD,
      START_30_DAY_WFM_TRIAL_BTN
    ])
  })
  after(() => {
    // This is to clean-up the test organization and its related data associated with it
    cy.testDataCleanUp()
  })
})
