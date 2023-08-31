import {
    FIRST_LAST_NAME_FLD, EMAIL_FLD, MOBILE_NUMBER_FLD, BUSINESS_NAME_FLD, EMPLOYEE_DROPDOWN,
    DOWN_EMP_DROPDOWN, PASSWORD_FLD, LETSGO_BTN, FIRST_LAST_NAME_ERROR_FLD, EMAIL_ERROR_FLD, 
    MOBILE_NUMBER_ERROR_FLD, BUSINESS_NAME_ERROR_FLD, EMPLOYEE_DROPDOWN_ERROR_FLD, PASSWORD_ERROR_FLD, PASSWORD_INFO_FLD, 
    MOBILE_NUMBER_INFO_FLD
  } from '../utilities/sign-up/signup-locators';

import {
    FIRST_LAST_NAME_ERROR_MSG1, FIRST_LAST_NAME_ERROR_MSG2, EMAIL_ERROR_MSG, MOBILE_NUMBER_ERROR_MSG1, MOBILE_NUMBER_ERROR_MSG2,
    BUSINESS_NAME_ERROR_MSG, EMPLOYEE_DROPDOWN_ERROR_MSG, PASSWORD_ERROR_MSG1, PASSWORD_ERROR_MSG2, MOBILE_NUMBER_INFO_MSG, 
    PASSWORD_INFO_MSG, DEFAULT_PASSWORD, INIT_NAME, DYNAMIC_EMAIL, DYNAMIC_MOBILE_NUMBER, DYNAMIC_BUSINESS_NAME
 } from '../utilities/sign-up/signup-messages-constants' 

describe('Sign-up field validation', () => {
    it('should allow a user to sign up successfully', () => {

      //User is navigated to SIGN-UP page
      const baseUrl = Cypress.env('BASE_URL');
      cy.visit(`${baseUrl}/sign_up`);

      //First Round of Error Field Validations
      cy.get(LETSGO_BTN).click()
      cy.get(FIRST_LAST_NAME_ERROR_FLD).should('be.visible').and('contain', FIRST_LAST_NAME_ERROR_MSG1);
      cy.get(EMAIL_ERROR_FLD).should('be.visible').and('contain', EMAIL_ERROR_MSG);
      cy.get(MOBILE_NUMBER_ERROR_FLD).should('be.visible').and('contain', MOBILE_NUMBER_ERROR_MSG1);
      cy.get(BUSINESS_NAME_ERROR_FLD).should('be.visible').and('contain', BUSINESS_NAME_ERROR_MSG);
      cy.get(EMPLOYEE_DROPDOWN_ERROR_FLD).should('be.visible').and('contain', EMPLOYEE_DROPDOWN_ERROR_MSG);
      cy.get(PASSWORD_ERROR_FLD).should('be.visible').and('contain', PASSWORD_ERROR_MSG1);

      //Second Round of Error Field Validations
      cy.get(FIRST_LAST_NAME_FLD).type('M');
      cy.get(FIRST_LAST_NAME_ERROR_FLD).should('be.visible').and('contain', FIRST_LAST_NAME_ERROR_MSG2);
      cy.get(MOBILE_NUMBER_FLD).type('+1');
      cy.get(MOBILE_NUMBER_ERROR_FLD).should('be.visible').and('contain', MOBILE_NUMBER_ERROR_MSG2);
      cy.get(PASSWORD_FLD).type('wy');
      cy.get(PASSWORD_ERROR_FLD).should('be.visible').and('contain', PASSWORD_ERROR_MSG2);

      cy.get(FIRST_LAST_NAME_FLD).clear();
      cy.get(MOBILE_NUMBER_FLD).clear();
      cy.get(PASSWORD_FLD).clear();

      //Supplying valid inputs to all fields
      cy.genRandomString(6).then((randomString) => {
        const finName = INIT_NAME + randomString;
      cy.get(FIRST_LAST_NAME_FLD).type(finName);
      });
  
      cy.get(EMAIL_FLD).type(DYNAMIC_EMAIL);
  
      cy.get(MOBILE_NUMBER_FLD).type(DYNAMIC_MOBILE_NUMBER);
        
      cy.get(BUSINESS_NAME_FLD).type(DYNAMIC_BUSINESS_NAME);
  
      cy.get(DOWN_EMP_DROPDOWN).should('be.visible').click();
      cy.get(EMPLOYEE_DROPDOWN).should('be.visible').contains('6-10').click();
      cy.get(PASSWORD_FLD).type(DEFAULT_PASSWORD);
        
      //Third Round of Error Field Validations
      cy.get(FIRST_LAST_NAME_ERROR_FLD).should('not.exist');
      cy.get(EMAIL_ERROR_FLD).should('not.exist');
      cy.get(MOBILE_NUMBER_ERROR_FLD).should('not.exist');
      cy.get(BUSINESS_NAME_ERROR_FLD).should('not.exist');
      cy.get(EMPLOYEE_DROPDOWN_ERROR_FLD).should('not.exist');

      //Verifying of Info Messages Displayed
      cy.get(MOBILE_NUMBER_INFO_FLD).should('be.visible').and('contain', MOBILE_NUMBER_INFO_MSG);
      cy.get(PASSWORD_INFO_FLD).should('be.visible').and('contain', PASSWORD_INFO_MSG);

    })
})