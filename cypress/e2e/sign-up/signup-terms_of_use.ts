describe('Verify Workyard Terms of Service page is loaded', () => {
  it('should visit the Workyard Terms of Service Page', () => {
    const TERMS_OF_USE_URL = 'https://www.workyard.com/terms'

    // Visit the webpage for TERMS OF USE
    cy.visit(TERMS_OF_USE_URL)
    cy.title().should('contain', 'Terms and Condition')

    cy.assertScrollIntoViewElementContainsText(
      'h1',
      'Terms of Service',
      'Terms of Service'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '1. GENERAL RULES',
      '1. GENERAL RULES'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '2. YOUR ACCOUNT',
      '2. YOUR ACCOUNT'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '3. PROPRIETARY RIGHTS AND LICENSES',
      '3. PROPRIETARY RIGHTS AND LICENSES'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '4. PRIVACY AND DATA',
      '4. PRIVACY AND DATA'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '5. TELECOMMUNICATIONS RESPONSIBLIITY',
      '5. TELECOMMUNICATIONS RESPONSIBLIITY'
    )
    cy.assertScrollIntoViewElementContainsText('h3', '6. CONTENT', '6. CONTENT')
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '7. SUBSCRIPTIONS',
      '7. SUBSCRIPTIONS'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '8. TERM AND TERMINATION',
      '8. TERM AND TERMINATION'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '9. WARRANTY DISCLAIMER',
      '9. WARRANTY DISCLAIMER'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '10. LIMITATION OF LIABILITY AND INDEMNIFICATION',
      '10. LIMITATION OF LIABILITY AND INDEMNIFICATION'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '11. GOVERNING LAW AND DISPUTES',
      '11. GOVERNING LAW AND DISPUTES'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '12. MISCELLANEOUS',
      '12. MISCELLANEOUS'
    )
    cy.assertScrollIntoViewElementContainsText(
      'p',
      'Last updated 8/24/2020',
      'Last updated 8/24/2020'
    )
  })
})
