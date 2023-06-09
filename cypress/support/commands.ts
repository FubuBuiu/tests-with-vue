/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('addToCart', (mode) => {
  cy.getByTestId('productCard').as('productCards');

  function addByIndex(index: number) {
    cy.get('@productCards').eq(index).find('button').click();
  }
  function addByIndexes(indexesList: Array<number>) {
    for (const index of indexesList) {
      cy.get('@productCards').eq(index).find('button').click({ force: true });
    }
  }
  function addAll() {
    cy.get('@productCards').then(($elements) => {
      let index = 0;
      while (index < $elements.length) {
        cy.get('@productCards').eq(index).find('button').click({ force: true });
        index++;
      }
    });
  }

  if (Array.isArray(mode)) {
    addByIndexes(mode);
  } else if (typeof mode === 'number') {
    addByIndex(mode);
  } else if (typeof mode === 'string' && mode === 'all') {
    addAll();
  } else {
    throw new Error(
      'Please provide a valid input for cy.addToCart()\r\nProssible values are Array, number or "all"'
    );
  }
});
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
