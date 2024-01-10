describe('Verify Workyard Privacy Policy page is loaded', () => {
  it('should visit the Workyard Privacy Policy Page', () => {
    const TERMS_OF_USE_URL = 'https://www.workyard.com/privacy'

    // Visit the webpage for TERMS OF USE
    cy.visit(TERMS_OF_USE_URL)

    cy.assertScrollIntoViewElementContainsText(
      'h1',
      'Workyard Privacy Policy',
      'Workyard Privacy Policy'
    )
    cy.assertScrollIntoViewElementContainsText(
      'p',
      'Last Updated 9/15/2020',
      'Last Updated 9/15/2020'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Purpose of Our Policy',
      'Purpose of Our Policy'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Personal Information We Collect',
      'Personal Information We Collect'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How Personal Information Is Collected',
      'How Personal Information Is Collected'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How Personal Information Is Used and Disclosed',
      'How Personal Information Is Used and Disclosed'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Cookies and Other Tracking Technologies',
      'Cookies and Other Tracking Technologies'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Your Choices',
      'Your Choices'
    )
    cy.assertScrollIntoViewElementContainsText('h2', 'Security', 'Security')
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Your Rights',
      'Your Rights'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'California Privacy Rights',
      'California Privacy Rights'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Do Not Track',
      'Do Not Track'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Complaints & Disputes',
      'Complaints & Disputes'
    )
    cy.assertScrollIntoViewElementContainsText('h2', 'Children', 'Children')
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Third-Party Links',
      'Third-Party Links'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'No Rights Of Third Parties',
      'No Rights Of Third Parties'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How We Communicate With You',
      'How We Communicate With You'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Contacting Us',
      'Contacting Us'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Changes To This Privacy Policy',
      'Changes To This Privacy Policy'
    )
  })
})
