import { DEFAULT_PASSWORD } from '../../utilities/login/login-messages-constants'

import {
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  LOGIN_BTN
} from '../../utilities/login/login-locators'

import {
  SUBSCRIBE_REACTIVATE_CONTAINER,
  TRIAL_EXPIRED_DAYS_LEFT,
  TRIAL_EXPIRED_DAYS_LEFT2,
  TRIAL_EXPIRED_DIV_OVERLAY,
  TRIAL_EXPIRED_FLD1,
  TRIAL_EXPIRED_FLD2,
  TRIAL_EXPIRED_ACTIVATE_BTN,
  TRIAL_EXPIRED_WANT_HELP,
  TRIAL_EXPIRED_REACTIVATE_OPTION,
  TRIAL_EXPIRED_REACTIVATE_FIELD_A,
  TRIAL_EXPIRED_REACTIVATE_FIELD_B,
  TRIAL_EXPIRED_SUBSCRIBE_OPTION,
  TRIAL_EXPIRED_SUBSCRIBE_FIELD_A,
  TRIAL_EXPIRED_SUBSCRIBE_FIELD_B
} from '../../utilities/subscription/subscription-locators'

import {
  DASHBOARD_NAV_BTN,
  TIMECARDS_NAV_BTN,
  PROJECT_HUB_NAV_BTN,
  JOB_COSTING_NAV_BTN,
  TEAM_MEMBERS_NAV_BTN,
  INTEGRATIONS_NAV_BTN
} from '../../utilities/dashboard/dashboard-locators'

import {
  TRIAL_EXPIRY_MESSAGE_A,
  TRIAL_EXPIRY_MESSAGE_B,
  TRIAL_REACTIVATE_MESSAGE,
  TRIAL_SUBSCRIBE_MESSAGE
} from '../../utilities/subscription/subscription-messages-constants'

const STAGING_BASE_URL = Cypress.env('STAGING_BASE_URL')
const STAGING_TEST_ADMIN_EXPIRED_MONTHLY_WFM = Cypress.env('STAGING_TEST_ADMIN_EXPIRED_MONTHLY_WFM')
describe('Verify when trial expires after 14days the screen will be take over by ', () => {
  it('should verify that Admin subscribed to 14-day trial of "Monthly Workforce Managment" plan is blocked by the "take-over-screen"', () => {
    // Logins the test data for User: Manager
    cy.visit(`${STAGING_BASE_URL}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(STAGING_TEST_ADMIN_EXPIRED_MONTHLY_WFM)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()
    cy.assertElementsAreVisible([TRIAL_EXPIRED_DIV_OVERLAY])

    cy.assertElementContainsText(
      TRIAL_EXPIRED_FLD1,
      TRIAL_EXPIRY_MESSAGE_A
    )
    cy.assertElementContainsText(
      TRIAL_EXPIRED_FLD2,
      TRIAL_EXPIRY_MESSAGE_B
    )
    cy.assertElementsAreVisible([TRIAL_EXPIRED_REACTIVATE_OPTION, TRIAL_EXPIRED_SUBSCRIBE_OPTION])
    cy.assertElementContainsText(
      TRIAL_EXPIRED_REACTIVATE_FIELD_A,
      'Reactivate Free Trial'
    )
    cy.assertElementContainsText(
      TRIAL_EXPIRED_REACTIVATE_FIELD_B,
      TRIAL_REACTIVATE_MESSAGE
    )
    cy.assertElementContainsText(
      TRIAL_EXPIRED_SUBSCRIBE_FIELD_A,
      'Subscribe'
    )
    cy.assertElementContainsText(
      TRIAL_EXPIRED_SUBSCRIBE_FIELD_B,
      TRIAL_SUBSCRIBE_MESSAGE
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
      SUBSCRIBE_REACTIVATE_CONTAINER
    ])

    cy.assertElementVisibleAndClick(PROJECT_HUB_NAV_BTN, 'project-hub_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIBE_REACTIVATE_CONTAINER
    ])

    cy.assertElementVisibleAndClick(JOB_COSTING_NAV_BTN, 'job-costing_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIBE_REACTIVATE_CONTAINER
    ])
    cy.assertElementVisibleAndClick(TEAM_MEMBERS_NAV_BTN, 'team-members_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIBE_REACTIVATE_CONTAINER
    ])
    cy.assertElementVisibleAndClick(INTEGRATIONS_NAV_BTN, 'integrations_btn')
    cy.assertElementsAreVisible([
      TRIAL_EXPIRED_DIV_OVERLAY,
      SUBSCRIBE_REACTIVATE_CONTAINER
    ])
  })
})
