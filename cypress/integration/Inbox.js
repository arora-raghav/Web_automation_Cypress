describe('Lister checks request', function() {
    beforeEach(function () {
        cy.signIn({email: 'jules.maurel@badiapp.com', password: 'Test.123'})
        cy.url().should('include', 'overview')
        cy.get('.TopBar__Nav_list > :nth-child(8) > a').click()
    })


    it('check inbox layout', function () {
        cy.url().should('include', 'inbox')

    })


})

