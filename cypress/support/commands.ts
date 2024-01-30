declare namespace Cypress {
  interface Chainable {
    genRandomString(length: number): Chainable<string>
    genRandomNumber(length: number): Chainable<string>
    getStripeElement(fieldName: string): Chainable<JQuery<HTMLElement>>
    assertElementsDoNotExist(selectors: string[]): Chainable
    assertElementsAreVisible(selectors: string[]): Chainable
    assertElementContainsText(selector: string, text: string): Chainable
    assertElementContainsTextAndClick(selector: string, text: string): Chainable
    assertScrollIntoViewElementContainsText(
      selector: string,
      text: string,
      expectedText: string
    ): Chainable
    assertElementContainsText(selector: string, text: string): Chainable
    assertScrollIntoViewElementHaveAttr(
      selector: string,
      text: string,
      expectedAttr: string,
      expectedAttrValue: string
    ): Chainable
    assertScrollIntoViewElementIsVisible(selector: string): Chainable
    assertElementVisibleAndClick(selector: string, aliasName: string): Chainable
    assertElementVisibleAndType(
      selector: string,
      aliasName: string,
      userInputnput: string
    ): Chainable
    assertStringsInElement(
      elementSelector: string,
      expectedStrings: string[]
    ): Chainable<Element>
    assertElementNotContainText(selector: string, text: string): Chainable
    assertScrollIntoViewElementsAreVisible(selectors: string[]): Chainable
    testDataCleanUp(): Chainable
    mailinatorEmailCleanUp(): Chainable
    resetPasswordRequest(): Chainable
    resendEmailInviteRequest(): Chainable
  }
}
interface Mail {
  subject: string
  from: string
  // Add other fields as needed
}

interface MailinatorResponse {
  msgs: Mail[]
}
Cypress.Commands.add('genRandomString', (length: number) => {
  let resultChar = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    resultChar += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    )
  }

  return cy.wrap(resultChar)
})

Cypress.Commands.add('genRandomNumber', (length: number) => {
  let resultNum = ''
  const numbers = '123456789'
  const numbersLength = numbers.length

  for (let i = 0; i < length; i++) {
    resultNum += numbers.charAt(Math.floor(Math.random() * numbersLength))
  }

  return cy.wrap(resultNum)
})

Cypress.Commands.add('getStripeElement', (fieldName: string) => {
  if (Cypress.config('chromeWebSecurity')) {
    throw new Error(
      'To get stripe element `chromeWebSecurity` must be disabled'
    )
  }

  const selector = `input[name="${fieldName}"]`

  return cy
    .get('iframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap)
    .find(selector)
})

Cypress.Commands.add('assertElementsDoNotExist', (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(selector).should('not.exist')
  })
})

Cypress.Commands.add('assertElementsAreVisible', (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(selector).should('be.visible')
  })
})

Cypress.Commands.add(
  'assertElementContainsText',
  (selector: string, text: string) => {
    cy.get(selector).should('be.visible').and('contain', text)
  }
)

Cypress.Commands.add(
  'assertElementContainsTextAndClick',
  (selector: string, text: string) => {
    cy.get(selector).should('be.visible').contains(text).click()
  }
)

Cypress.Commands.add(
  'assertElementVisibleAndClick',
  (selector: string, aliasName: string) => {
    cy.get(selector).should('be.visible').as(aliasName).click()
  }
)

Cypress.Commands.add(
  'assertElementVisibleAndType',
  (selector: string, aliasName: string, userInput: string) => {
    cy.get(selector)
      .should('be.visible')
      .as(aliasName)
      .type(userInput)
  }
)

Cypress.Commands.add('assertStringsInElement', (selector, expectedStrings) => {
  cy.get(selector)
    .find('li')
    .each(($option, index) => {
      cy.wrap($option).invoke('text').should('eq', expectedStrings[index])
    })
})

Cypress.Commands.add(
  'assertElementNotContainText',
  (selector: string, text: string) => {
    cy.get(selector)
      .should('be.visible')
      .should($element => {
        const elementText = $element.text()
        expect(elementText.includes(text)).to.equal(false)
      })
  }
)

Cypress.Commands.add(
  'assertScrollIntoViewElementContainsText',
  (selector: string, text: string, expectedText: string) => {
    cy.contains(selector, text)
      .scrollIntoView()
      .should('be.visible')
      .and('contain', expectedText)
  }
)

Cypress.Commands.add(
  'assertScrollIntoViewElementHaveAttr',
  (
    selector: string,
    text: string,
    expectedAttr: string,
    expectedAttrValue: string
  ) => {
    cy.contains(selector, text)
      .scrollIntoView()
      .should('be.visible')
      .and('have.attr', expectedAttr, expectedAttrValue)
  }
)

Cypress.Commands.add(
  'assertScrollIntoViewElementIsVisible',
  (selector: string) => {
    cy.get(selector).scrollIntoView().should('be.visible')
  }
)

Cypress.Commands.add(
  'assertScrollIntoViewElementsAreVisible',
  (selectors: string[]) => {
    selectors.forEach(selector => {
      cy.get(selector).scrollIntoView().should('be.visible')
    })
  }
)
Cypress.Commands.add(
  'testDataCleanUp', () => {
    cy.request({
      method: 'DELETE',
      url: `https://${Cypress.env('STAGING_APP_ENV')}-api1.workyard.com/delete_test_orgs`,
      headers: {
        'x-workyard-system-tests': true
      }
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  }
)

Cypress.Commands.add(
  'mailinatorEmailCleanUp', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://mailinator.com/api/v2/domains/private/inboxes',
      headers: {
        Authorization: `${Cypress.env('STAGING_MAILINATOR_BEARER_TOKEN')}`
      }
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  }
)

Cypress.Commands.add(
  'resetPasswordRequest', () => {
    cy.request({
      method: 'POST',
      url: 'https://staging-api1.workyard.com/request_password_reset',
      headers: {
        Authorization: `${Cypress.env('STAGING_FORGOTPW_AUTH_TOKEN')}`,
        'Workyard-Agent': 'website|Windows|NA|14.5.1|1920|1080|1|NA|Asia/Manila|v:1704844800',
        'x-workyard-system-tests': true
      },
      body: {
        email: 'existing.user.staging@workyard.testinator.com'
      }
    }).then(response => {
      // Verify that the response status is 200 OK
      expect(response.status).to.equal(200)
    })
  }
)

Cypress.Commands.add(
  'resendEmailInviteRequest', () => {
    cy.request({
      method: 'POST',
      url: 'https://staging-api1.workyard.com/resend_invite_by_email',
      headers: {
        Authorization: `${Cypress.env('STAGING_FORGOTPW_AUTH_TOKEN')}`,
        'Workyard-Agent': 'website|Windows|NA|14.5.1|1920|1080|1|NA|Asia/Manila|v:1704844800',
        'x-workyard-system-tests': true
      },
      body: {
        email: 'pending.user.staging@workyard.testinator.com'
      }
    }).then(response => {
      // Verify that the response status is 200 OK
      expect(response.status).to.equal(200)
    })
  }
)
