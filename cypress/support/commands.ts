declare namespace Cypress {
    interface Chainable {
        genRandomString(length: number): Chainable<string>;
        genRandomNumber(length: number): Chainable<string>;
        
    }
}
Cypress.Commands.add('genRandomString', (length: number) => {
    let resultChar = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      resultChar += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return cy.wrap(resultChar);
  })

Cypress.Commands.add('genRandomNumber', (length: number) => {
    let resultNum = '';
    const numbers = '123456789';
    const numbersLength = numbers.length;
  
    for (let i = 0; i < length; i++) {
      resultNum += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
  
    return cy.wrap(resultNum);
  })
