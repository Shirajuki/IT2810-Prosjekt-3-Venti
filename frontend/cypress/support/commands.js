// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('start', () => {
    cy.server();
    cy.route({url:"../mock-data"})
    cy.visit('/');
})

//sorts by price $ - $$$
Cypress.Commands.add('sortAsc', () => {
    //cy.get('[data-cy=sort-filter]').click()
    //cy.get('mdc-select-item').contains('Country seven';
    //Cypress.$('[data-cy=sort-filter]').select('').eq(2).click({ force: true })
    cy.get('[data-cy=sort-filter]').select('Price $ - $$$', {force: true}).should('have.value', 'price_asc');
})
