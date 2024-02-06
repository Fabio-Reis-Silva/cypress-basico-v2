Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Fábio')
    cy.get('#lastName').type('Reis')
    cy.get('input[type="email"]').type('testefabio@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('Teste comandos customizados')
    cy.get('button[type="submit"]').click()    
})