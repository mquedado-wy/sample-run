describe('Verify Workyard Privacy Policy page is loaded', () => {
  it('should visit the Workyard Privacy Policy Page', () => {
    const PRIVACY_POLICY_URL = 'https://www.workyard.com/privacy'

    // Visit the webpage for TERMS OF USE
    cy.visit(PRIVACY_POLICY_URL)

    cy.assertScrollIntoViewElementContainsText(
      'h1',
      'Privacy policy',
      'Privacy policy'
    )
    cy.assertScrollIntoViewElementContainsText(
      'div',
      'Last Updated',
      'Last Updated'
    )
    cy.assertScrollIntoViewElementContainsText(
      'div',
      'Oct 15, 2023',
      'Oct 15, 2023'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How You are Subject to this Privacy Policy',
      'How You are Subject to this Privacy Policy'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'What We Mean by Personal Information',
      'What We Mean by Personal Information'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Personal Information We Collect',
      'Personal Information We Collect'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Usage Data We Collect',
      'Usage Data We Collect'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'User Content',
      'User Content'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Geolocation Data',
      'Geolocation Data'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Personal Information Collected If You Make Purchases',
      'Personal Information Collected If You Make Purchases'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How We Use or Share Your Personal Information',
      'How We Use or Share Your Personal Information'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'When You Should Not Share Personal Information With Us',
      'When You Should Not Share Personal Information With Us'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Other Information We Collect and Use (Not Personal)',
      'Other Information We Collect and Use (Not Personal)'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'What Other Technologies Affect Your Privacy and Use of Our Services',
      'What Other Technologies Affect Your Privacy and Use of Our Services'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Promotional and Non-Promotional Emails',
      'Promotional and Non-Promotional Emails'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Advertising',
      'Advertising'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How User Data is Processed and Stored',
      'How User Data is Processed and Stored'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Third Party Services, Devices and Links',
      'Third Party Services, Devices and Links'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Third Party Services, Devices and Links',
      'Third Party Services, Devices and Links'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Hosting Services Provider and Data Transfers',
      'Hosting Services Provider and Data Transfers'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How We Secure and Protect Your Personal Information',
      'How We Secure and Protect Your Personal Information'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Your Opt-Out Rights',
      'Your Opt-Out Rights'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Your Choices',
      'Your Choices'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Your Rights',
      'Your Rights'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'For Users Residing in California',
      'For Users Residing in California'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Children',
      'Children'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Changes To This Privacy Policy',
      'Changes To This Privacy Policy'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'Complaints & Disputes',
      'Complaints & Disputes'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'How to Contact Us',
      'How to Contact Us'
    )
    cy.assertScrollIntoViewElementContainsText(
      'h2',
      'CALIFORNIA PRIVACY NOTICE',
      'CALIFORNIA PRIVACY NOTICE'
    )
  })
})
