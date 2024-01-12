declare namespace Cypress {
  interface Chainable {
    genRandomString(length: number): Chainable<string>
    genRandomNumber(length: number): Chainable<string>
    getStripeElement(fieldName: string): Chainable<JQuery<HTMLElement>>
    assertElementsDoNotExist(selectors: string[]): Chainable
    assertElementsAreVisible(selectors: string[]): Chainable
    assertElementContainsText(selector: string, text: string): Chainable
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
    assertScrollIntoViewElementIsVisible(
      selector: string
    ): Chainable
    assertElementVisibleAndClick(selector: string, aliasName: string): Chainable
    assertStringsInElement(
      elementSelector: string,
      expectedStrings: string[]
    ): Chainable<Element>
    assertElementNotContainText(selector: string, text: string): Chainable
  }
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
  'assertElementVisibleAndClick',
  (selector: string, aliasName: string) => {
    cy.get(selector).should('exist').should('be.visible').as(aliasName).click({ force: true })
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
  (selector: string, text: string, expectedAttr: string, expectedAttrValue: string) => {
    cy.contains(selector, text)
      .scrollIntoView()
      .should('be.visible')
      .and('have.attr', expectedAttr, expectedAttrValue)
  }
)

Cypress.Commands.add(
  'assertScrollIntoViewElementIsVisible',
  (selector: string) => {
    cy.get(selector)
      .scrollIntoView()
      .should('be.visible')
  }
)
