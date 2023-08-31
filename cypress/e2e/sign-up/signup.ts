  import {
    FIRST_LAST_NAME_FLD, EMAIL_FLD, MOBILE_NUMBER_FLD, BUSINESS_NAME_FLD, EMPLOYEE_DROPDOWN,
    DOWN_EMP_DROPDOWN, PASSWORD_FLD, LETSGO_BTN, CLOSE_TUTORIAL_BTN, SKIP_ONBOARDING_BTN,
    LOADING_SPINNER
  } from '../utilities/sign-up/signup-locators';

  import {
    INIT_NAME, DYNAMIC_EMAIL, DYNAMIC_BUSINESS_NAME, DYNAMIC_MOBILE_NUMBER, DEFAULT_PASSWORD
  } from '../utilities/sign-up/signup-messages-constants'

  describe('Verify User Signs up for a 14-day Trial Period', () => {
  it('should allow a user to sign up successfully', () => {
    
    //User is navigated to SIGN-UP page
    const baseUrl = Cypress.env('BASE_URL');
    cy.visit(`${baseUrl}/sign_up`);

    //User supplies valid inputs for all fields
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

    //Temporarily simulating no internet connection
    cy.window().then(win => {
      cy.stub(win.navigator, 'onLine').value(false);
    });
    
    cy.get(LETSGO_BTN).should('be.visible').click();

    //Verify that the loading spinner is displayed
    cy.get(LOADING_SPINNER).should('be.visible');
    //This is to wait for the loading spinner to be not visible before proceeding with the next action
    cy.get(LOADING_SPINNER).should('not.exist');

    //User Account is expected to be created and User is navigated to Dashboard page
    cy.get(SKIP_ONBOARDING_BTN).should('be.visible').as('skipbtn');
    cy.get('@skipbtn').click();
    cy.get(CLOSE_TUTORIAL_BTN).should('be.visible').as('closebtn');
    cy.get('@closebtn').click();
    
    // Verify user is navigated in Dashboard page
    cy.contains('Get Started');
    })
  })
  