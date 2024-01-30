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
  USER_INFO_MENU,
  LOGOUT_BUTTON,
  DASHBOARD_NAV_BTN,
  TIMECARDS_NAV_BTN,
  PROJECT_HUB_NAV_BTN,
  TASK_AND_SCHEDULE_NAV_BTN,
  JOB_COSTING_NAV_BTN,
  TEAM_MEMBERS_NAV_BTN,
  INTEGRATIONS_NAV_BTN
} from '../../utilities/dashboard/dashboard-locators'

import {
  LOGIN_EMAIL_FLD,
  LOGIN_PASSWORD_FLD,
  LOGIN_BTN
} from '../../utilities/login/login-locators'

import {
  DEFAULT_PASSWORD,
  NEW_SIGNUP_EMAIL_1,
  MOBILE_NUMBER_LOGIN,
  BUSINESS_NAME_LOGIN,
  INIT_NAME
} from '../../utilities/login/login-messages-constants'

const BASE_URL = Cypress.env('BASE_URL')
describe('Verify a "newly" registered user is able to login', () => {
  it('should allow a user to sign up successfully', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${BASE_URL}/sign_up`)

    cy.genRandomString(6).then((randomString: string) => {
      const finName = INIT_NAME + randomString
      cy.get(FIRST_LAST_NAME_FLD).type(finName)
    })
    cy.assertElementVisibleAndType(EMAIL_FLD, 'email-field', NEW_SIGNUP_EMAIL_1)
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

    // Newly registered user logs out
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-menu')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
  })

  it('should logout the newly created user from DASHBOARD page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to log in and lands on the DASHBOARD page
    cy.assertElementVisibleAndClick(DASHBOARD_NAV_BTN, 'dashboard-button')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should logout the newly created user from TIMECARDS page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to log in and navigate to TIMECARDS page
    cy.assertElementVisibleAndClick(TIMECARDS_NAV_BTN, 'timecards-button')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should logout the newly created user from PROJECT HUB page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to log in and navigate to PROJECT HUB page
    cy.assertElementVisibleAndClick(PROJECT_HUB_NAV_BTN, 'proj-hub-button')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should logout the newly created user from TASK & SCHEDULE page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to log in and navigate to TASK & SCHEDULE page
    cy.assertElementVisibleAndClick(
      TASK_AND_SCHEDULE_NAV_BTN,
      'task-sched-button'
    )
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should logout the newly created user from JOB COSTING page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to log in and navigate to JOB COSTING page
    cy.assertElementVisibleAndClick(JOB_COSTING_NAV_BTN, 'job-costing-button')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should logout the newly created user from TEAM MEMBERS page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to login and navigated to TEAM MEMBERS page
    cy.assertElementVisibleAndClick(TEAM_MEMBERS_NAV_BTN, 'team-mem-button')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-menu')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should logout the newly created user from INTEGRATIONS page', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    // Verify user is able to login and navigated to INTEGRATIONS page
    cy.assertElementVisibleAndClick(INTEGRATIONS_NAV_BTN, 'integration-button')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })

  it('should handle no network connectivity when user logs out', () => {
    cy.visit(`${BASE_URL}/login`)
    cy.assertElementVisibleAndType(
      LOGIN_EMAIL_FLD,
      'login-email-field',
      NEW_SIGNUP_EMAIL_1
    )
    cy.assertElementVisibleAndType(
      LOGIN_PASSWORD_FLD,
      'login-password-field',
      DEFAULT_PASSWORD
    )
    cy.assertElementVisibleAndClick(LOGIN_BTN, 'login-button')

    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-button')

    // Temporarily simulates no internet connectivity
    cy.intercept({ url: '**/*' }, { forceNetworkError: true })
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${BASE_URL}/login`)
  })
  after(() => {
    // This is to clean-up the test organization and its related data associated with it
    cy.testDataCleanUp()
  })
})
