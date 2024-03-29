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
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add('signIn', ({email, password}) => {
        cy.visit('https://weblocal.badi.com/')
        cy.get(':nth-child(7) > .Text__button').click()
        cy.contains('Continue with Email').click()
        cy.get('#username').type(email)
        cy.get('#password').type(password)
        cy.get('[type="submit"]').click();
})

Cypress.Commands.add('logOut', () => {

        cy.get('.TopBar__UserMenu').contains('Log out').click({force:true});
         
})

Cypress.Commands.add('searchBar', (searchTerms) => {
        cy.get('.geosuggest__input')
        .type(searchTerms)
        cy.get('.geosuggest__item--active > div > .geosuggest__text')
        .click()
        cy.contains(searchTerms);
})
