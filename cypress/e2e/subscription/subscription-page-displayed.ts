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

const baseUrl = Cypress.env('baseUrl')
describe('Create a new User to test Subscription Page', () => {
  it('should allow a user to sign up successfully', () => {
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
    cy.get(DOWN_EMP_DROPDOWN).should('be.visible').click()
    cy.get(EMPLOYEE_DROPDOWN).should('be.visible').contains('6-10').click()
    cy.get(PASSWORD_FLD).type(DEFAULT_PASSWORD)

    cy.get(LETSGO_BTN).should('be.visible').click()

    // Verify that the loading spinner is displayed
    cy.get(LOADING_SPINNER).should('be.visible')
    // This is to wait for the loading spinner to be not visible before proceeding with the next action
    cy.get(LOADING_SPINNER).should('not.exist')

    // User Account is expected to be created and User is navigated to Dashboard page
    cy.get(SKIP_ONBOARDING_BTN).should('be.visible').as('skipbtn')
    cy.get('@skipbtn').click()
    cy.get(CLOSE_TUTORIAL_BTN).should('be.visible').as('closebtn')
    cy.get('@closebtn').click()

    // Verify user is navigated in Dashboard page
    cy.contains('Get Started')
  })

  it('should verify that all "Subscription" fields,labels and headers are displayed', () => {
    // Logins the newly created user
    cy.visit(`${baseUrl}/login`)
    cy.get(LOGIN_EMAIL_FLD).should('be.visible').type(NEW_SIGNUP_EMAIL)
    cy.get(LOGIN_PASSWORD_FLD).type(DEFAULT_PASSWORD)
    cy.get(LOGIN_BTN).should('be.visible').click()

    // Verify user is able to login and navigated to Dashboard page
    cy.contains('Get Started')

    cy.get(ACTIVATE_PLAN_BTN).should('be.visible').as('activate_plan_btn')
    cy.get('@activate_plan_btn').click()
    cy.get(SUBSCRIPTION_MODAL_CONTAINER).should('be.visible')
    cy.get(SUBSCRIBE_HDR)
      .should('be.visible')
      .and('contain', SUBSCRIPTION_HDR_MSG)
    cy.get(PLAN_LBL1).should('be.visible')
    cy.get(PLAN_DROPDOWN).should('be.visible')
    cy.assertScrollIntoViewElementContainsText(
      SUBSCRIPTION_PLAN_FLD,
      MONTHLY_SUBCRIPTION_MSG,
      MONTHLY_SUBCRIPTION_MSG
    )
    cy.get(DOWN_PLAN_DROPDOWN).should('be.visible').click()
    cy.get(PLAN_DROPDOWN_LIST)
      .should('be.visible')
      .contains('Annual Time Tracking Plan')
      .click()
    cy.assertScrollIntoViewElementContainsText(
      SUBSCRIPTION_PLAN_FLD,
      ANNUAL_SUBCRIPTION_MSG,
      ANNUAL_SUBCRIPTION_MSG
    )
    cy.get(PLAN_LBL2).scrollIntoView().should('be.visible')
    cy.get(PLAN_SUMMARY1).scrollIntoView().should('be.visible')
    cy.get(PLAN_SUMMARY2).scrollIntoView().should('be.visible')
    cy.get(APPLY_COUPON).scrollIntoView().should('be.visible')
    cy.get(DUE_NOW_HDR).should('be.visible')
    cy.get(CREDIT_CARD_FLD).should('be.visible')
    cy.get(SUBSCRIBE_BTN).should('be.visible')
    cy.get(AGREE_TERMS_OF_SERVICE)
      .scrollIntoView()
      .should('be.visible')
      .and('contain', AGREE_TERMS_OF_SERVICE_MSG)
    cy.contains('button', 'Terms of service').should('be.visible')
  })
})
