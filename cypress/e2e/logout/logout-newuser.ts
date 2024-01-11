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

const baseUrl = Cypress.env('baseUrl')
describe('Verify a "newly" registered user is able to login', () => {
  it('should allow a user to sign up successfully', () => {
    // User is navigated to SIGN-UP page
    cy.visit(`${baseUrl}/sign_up`)

    cy.genRandomString(6).then((randomString: string) => {
      const finName = INIT_NAME + randomString
      cy.get(FIRST_LAST_NAME_FLD).type(finName)
    })
    cy.get(EMAIL_FLD).type(NEW_SIGNUP_EMAIL_1)
    cy.get(MOBILE_NUMBER_FLD).type(MOBILE_NUMBER_LOGIN)
    cy.get(BUSINESS_NAME_FLD).type(BUSINESS_NAME_LOGIN)

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

    // Newly registered user logs out
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-menu')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
  })

  it('should logout the newly created user from DASHBOARD page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to log in and lands on the DASHBOARD page
    cy.get(DASHBOARD_NAV_BTN).should('be.visible').as('dashboard_btn')
    cy.get('@dashboard_btn').click()
    cy.get(USER_INFO_MENU).should('be.visible').click()
    cy.get(LOGOUT_BUTTON).should('be.visible').click()
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout the newly created user from TIMECARDS page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to log in and navigate to TIMECARDS page
    cy.get(TIMECARDS_NAV_BTN).should('be.visible').as('timecards_btn')
    cy.get(TIMECARDS_NAV_BTN).click()
    cy.get(USER_INFO_MENU).should('be.visible').click()
    cy.get(LOGOUT_BUTTON).should('be.visible').click()
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout the newly created user from PROJECT HUB page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to log in and navigate to PROJECT HUB page
    cy.get(PROJECT_HUB_NAV_BTN).should('be.visible').as('proj-hub_btn')
    cy.get('@proj-hub_btn').click()
    cy.get(USER_INFO_MENU).should('be.visible').click()
    cy.get(LOGOUT_BUTTON).should('be.visible').click()
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout the newly created user from TASK & SCHEDULE page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to log in and navigate to TASK & SCHEDULE page
    cy.get(TASK_AND_SCHEDULE_NAV_BTN).should('be.visible').as('task-sked_btn')
    cy.get('@task-sked_btn').click()
    cy.get(USER_INFO_MENU).should('be.visible').click()
    cy.get(LOGOUT_BUTTON).should('be.visible').click()
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout the newly created user from JOB COSTING page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to log in and navigate to JOB COSTING page
    cy.get(JOB_COSTING_NAV_BTN).should('be.visible').as('job-costing_btn')
    cy.get('@job-costing_btn').click()
    cy.get(USER_INFO_MENU).should('be.visible').click()
    cy.get(LOGOUT_BUTTON).should('be.visible').click()
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout the newly created user from TEAM MEMBERS page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to login and navigated to TEAM MEMBERS page
    cy.assertElementVisibleAndClick(TEAM_MEMBERS_NAV_BTN, 'team-mem-btn')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-menu')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout the newly created user from INTEGRATIONS page', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to login and navigated to INTEGRATIONS page
    cy.assertElementVisibleAndClick(INTEGRATIONS_NAV_BTN, 'integ_btn')
    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-menu')
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should handle no network connectivity when user logs out', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL_1)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    cy.assertElementVisibleAndClick(USER_INFO_MENU, 'user-info-menu')

    // Temporarily simulates no internet connectivity
    cy.intercept({ url: '**/*' }, { forceNetworkError: true })
    cy.assertElementVisibleAndClick(LOGOUT_BUTTON, 'logout-button')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
