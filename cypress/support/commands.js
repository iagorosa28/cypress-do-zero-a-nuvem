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

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user) => { // daria para fazer com que o user tenha 'valores padrão'
    cy.get('input#firstName').type(user.firstname)
    cy.get('input#lastName').type(user.lastname)
    cy.get('input#email').type(user.email)
    cy.get('textarea#open-text-area').type('iabadabadu iabadabadu iabadabadu iabadabadu', { delay: 0 })
    cy.contains('button', 'Enviar').click() // Exercício extra 8 (troquei o get por contains)
    cy.get('span.success').should('be.visible')
})
// valores padrão seriam valores utilizados caso não passe nada no parametro (igual aquele esquema em python)
// ai ficaria -> (user = {firstname: 'Iago', lastname: 'Oliveira', etc})