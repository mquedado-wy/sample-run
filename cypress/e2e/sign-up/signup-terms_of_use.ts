describe('Verify Workyard Terms of Service page is loaded', () => {
    it('should visit the Workyard Terms of Service Page', () => {
    const TERMS_OF_USE_URL = 'https://www.workyard.com/terms';
  
      // Visit the webpage for TERMS OF USE
      cy.visit(TERMS_OF_USE_URL);
      cy.title().should('contain', 'Terms and Condition')

      cy.contains('h1', 'Terms of Service').scrollIntoView().should('be.visible').and('contain', "Terms of Service");
      cy.contains('h3', '1. GENERAL RULES').scrollIntoView().should('be.visible').and('contain', "1. GENERAL RULES");
      cy.contains('h3', '2. YOUR ACCOUNT').scrollIntoView().should('be.visible').and('contain', "2. YOUR ACCOUNT");
      cy.contains('h3', '3. PROPRIETARY RIGHTS AND LICENSES').scrollIntoView().should('be.visible').and('contain', "3. PROPRIETARY RIGHTS AND LICENSES");
      cy.contains('h3', '4. PRIVACY AND DATA').scrollIntoView().should('be.visible').and('contain', "4. PRIVACY AND DATA");
      cy.contains('h3', '5. TELECOMMUNICATIONS RESPONSIBLIITY').scrollIntoView().should('be.visible').and('contain', "5. TELECOMMUNICATIONS RESPONSIBLIITY");
      cy.contains('h3', '6. CONTENT').scrollIntoView().should('be.visible').and('contain', "6. CONTENT");
      cy.contains('h3', '7. SUBSCRIPTIONS').scrollIntoView().should('be.visible').and('contain', "7. SUBSCRIPTIONS");
      cy.contains('h3', '8. TERM AND TERMINATION').scrollIntoView().should('be.visible').and('contain', "8. TERM AND TERMINATION");
      cy.contains('h3', '9. WARRANTY DISCLAIMER').scrollIntoView().should('be.visible').and('contain', "9. WARRANTY DISCLAIMER");
      cy.contains('h3', '10. LIMITATION OF LIABILITY AND INDEMNIFICATION').scrollIntoView().should('be.visible').and('contain', "10. LIMITATION OF LIABILITY AND INDEMNIFICATION");
      cy.contains('h3', '11. GOVERNING LAW AND DISPUTES').scrollIntoView().should('be.visible').and('contain', "11. GOVERNING LAW AND DISPUTES");
      cy.contains('h3', '12. MISCELLANEOUS').scrollIntoView().should('be.visible').and('contain', "12. MISCELLANEOUS");
      cy.contains('p', 'Last updated 8/24/2020').scrollIntoView().should('be.visible').and('contain', "Last updated 8/24/2020");

    });
  });