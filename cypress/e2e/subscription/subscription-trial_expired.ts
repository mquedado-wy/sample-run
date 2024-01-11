import { DEFAULT_PASSWORD } from '../../utilities/login/login-messages-constants'

import {
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  LOGIN_BTN
} from '../../utilities/login/login-locators'

import {
  SUBSCRIPTION_MODAL_CONTAINER,
  TRIAL_EXPIRED_DAYS_LEFT,
  TRIAL_EXPIRED_DAYS_LEFT2,
  TRIAL_EXPIRED_DIV_OVERLAY,
  TRIAL_EXPIRED_FLD1,
  TRIAL_EXPIRED_FLD2,
  TRIAL_EXPIRED_ACTIVATE_BTN,
  TRIAL_EXPIRED_WANT_HELP,
  CURRENT_VALUE_OF_PLAN_TYPE
} from '../../utilities/subscription/subscription-locators'

import {
  DASHBOARD_NAV_BTN,
  TIMECARDS_NAV_BTN,
  PROJECT_HUB_NAV_BTN,
  JOB_COSTING_NAV_BTN
} from '../../utilities/dashboard/dashboard-locators'

const baseUrl = Cypress.env('baseUrl')
const testAdminExpdMonthlyWFM = Cypress.env('testAdminExpdMonthlyWFM')
describe('Verify when trial expires after 14days the screen will be take over by ', () => {
  it('should verify that Admin subscribed to 14-day trial of "Monthly Workforce Managment" plan is blocked by the "take-over-screen"', () => {
    // Logins the test data for User: Manager
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(testAdminExpdMonthlyWFM)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()
    cy.assertElementsAreVisible([TRIAL_EXPIRED_DIV_OVERLAY])

    cy.assertElementContainsText(
      TRIAL_EXPIRED_FLD1,
      'Your free trial has expired'
    )
    cy.assertElementContainsText(
      TRIAL_EXPIRED_FLD2,
      'Subscribe to a plan to keep enjoying Workyard'
    )
    cy.assertElementContainsText(
      CURRENT_VALUE_OF_PLAN_TYPE,
      'Monthly Workforce Management Plan'
    )
    cy.assertElementVisibleAndClick(DASHBOARD_NAV_BTN, 'dashboard-nav-btn')

    cy.assertElementContainsText(TRIAL_EXPIRED_DAYS_LEFT, '0 days')
    cy.assertElementContainsText(
      TRIAL_EXPIRED_DAYS_LEFT2,
      'left in your free trial'
    )
    cy.assertElementsAreVisible([TRIAL_EXPIRED_ACTIVATE_BTN])
    cy.assertElementContainsText(
      TRIAL_EXPIRED_WANT_HELP,
      'Want help getting started? Call Sales: 650-332-8623'
    )

    cy.assertElementVisibleAndClick(TIMECARDS_NAV_BTN, 'timecards_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIPTION_MODAL_CONTAINER
    ])

    cy.assertElementVisibleAndClick(PROJECT_HUB_NAV_BTN, 'project-hub_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIPTION_MODAL_CONTAINER
    ])

    cy.assertElementVisibleAndClick(JOB_COSTING_NAV_BTN, 'job-costing_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIPTION_MODAL_CONTAINER
    ])
  })
})
