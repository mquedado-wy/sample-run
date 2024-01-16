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
      'div',
      'Last updated',
      'Last updated'
    )
    cy.assertScrollIntoViewElementContainsText(
      'div',
      'Oct 13, 2023',
      'Oct 13, 2023'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '1. General Rules',
      '1. General Rules'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '2. Changes To The Terms',
      '2. Changes To The Terms'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '3. Scope Of SAAS Services',
      '3. Scope Of SAAS Services'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '4. Your Account',
      '4. Your Account'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '5. Subscription Plans',
      '5. Subscription Plans'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '6. Licenses And Use Restrictions',
      '6. Licenses And Use Restrictions'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '7. Customer Data',
      '7. Customer Data'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '8. Workyard And Customer Property‍',
      '8. Workyard And Customer Property‍'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '9. Customer Obligations And Acknowledgements ‍',
      '9. Customer Obligations And Acknowledgements ‍'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '10. Unauthorized Access',
      '10. Unauthorized Access'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '11. Customer System Obligations',
      '11. Customer System Obligations'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '12. Workyard Obligations',
      '12. Workyard Obligations'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '13. Data Security',
      '13. Data Security'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '14. Changes To The Services And Pricing',
      '14. Changes To The Services And Pricing'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '15. Term And Termination',
      '15. Term And Termination'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '16. Copyright And Other Intellectual Property Infringement Claims',
      '16. Copyright And Other Intellectual Property Infringement Claims'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '17. Confidentiality',
      '17. Confidentiality'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '18. Indemnification',
      '18. Indemnification'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '19. Representations And Warranties‍',
      '19. Representations And Warranties‍'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '20. Disclaimers',
      '20. Disclaimers'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '21. Limitation of Liability',
      '21. Limitation of Liability'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '22. California Resident Waiver',
      '22. California Resident Waiver'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '23. Force Majeure',
      '23. Force Majeure'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '24. Informal DIspute Procedure',
      '24. Informal DIspute Procedure'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '25. Arbitration',
      '25. Arbitration'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '26. Miscellaneous Terms',
      '26. Miscellaneous Terms'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '27. Workyard Electronic Communications To You',
      '27. Workyard Electronic Communications To You'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h3',
      '28. Contact Us',
      '28. Contact Us'
    )
  })
})
