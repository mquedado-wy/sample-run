describe('Verify Workyard Privacy Policy page is loaded', () => {
    it('should visit the Workyard Privacy Policy Page', () => {
    const TERMS_OF_USE_URL = 'https://www.workyard.com/privacy';
  
      // Visit the webpage for TERMS OF USE
      cy.visit(TERMS_OF_USE_URL);

      cy.contains('h1', 'Workyard Privacy Policy').scrollIntoView().should('be.visible').and('contain', "Workyard Privacy Policy");
      cy.contains('p', 'Last Updated 9/15/2020').scrollIntoView().should('be.visible').and('contain', "Last Updated 9/15/2020");
      cy.contains('h2', 'Purpose of Our Policy').scrollIntoView().should('be.visible').and('contain', "Purpose of Our Policy");
      cy.contains('h2', 'Personal Information We Collect').scrollIntoView().should('be.visible').and('contain', "Personal Information We Collect");
      cy.contains('h2', 'How Personal Information Is Collected').scrollIntoView().should('be.visible').and('contain', "How Personal Information Is Collected");
      cy.contains('h2', 'How Personal Information Is Used and Disclosed').scrollIntoView().should('be.visible').and('contain', "How Personal Information Is Used and Disclosed");
      cy.contains('h2', 'Cookies and Other Tracking Technologies').scrollIntoView().should('be.visible').and('contain', "Cookies and Other Tracking Technologies");
      cy.contains('h2', 'Your Choices').scrollIntoView().should('be.visible').and('contain', "Your Choices");
      cy.contains('h2', 'Security').scrollIntoView().should('be.visible').and('contain', "Security");
      cy.contains('h2', 'Your Rights').scrollIntoView().should('be.visible').and('contain', "Your Rights");
      cy.contains('h2', 'California Privacy Rights').scrollIntoView().should('be.visible').and('contain', "California Privacy Rights");
      cy.contains('h2', 'Do Not Track').scrollIntoView().should('be.visible').and('contain', "Do Not Track");
      cy.contains('h2', 'Complaints & Disputes').scrollIntoView().should('be.visible').and('contain', "Complaints & Disputes");
      cy.contains('h2', 'Children').scrollIntoView().should('be.visible').and('contain', "Children");
      cy.contains('h2', 'Third-Party Links').scrollIntoView().should('be.visible').and('contain', "Third-Party Links");
      cy.contains('h2', 'No Rights Of Third Parties').scrollIntoView().should('be.visible').and('contain', "No Rights Of Third Parties");
      cy.contains('h2', 'How We Communicate With You').scrollIntoView().should('be.visible').and('contain', "How We Communicate With You");
      cy.contains('h2', 'Contacting Us').scrollIntoView().should('be.visible').and('contain', "Contacting Us");
      cy.contains('h2', 'Changes To This Privacy Policy').scrollIntoView().should('be.visible').and('contain', "Changes To This Privacy Policy");
      
    });
  });