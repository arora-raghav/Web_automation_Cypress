describe('Lister checks inbox', function() {
    beforeEach(function () {
        cy.signIn({email: 'jules.maurel@badiapp.com', password: 'Test.123'})
        cy.url().should('include', 'overview')
        cy.get('.TopBar__Nav_list > :nth-child(6) > a').click()
    })


    it('check inbox layout', function () {
        cy.url().should('include', 'overview')
        cy.contains('Inactive listings')
        cy.contains('Become a Trusted User')
        cy.contains('Room enquiries')
        cy.contains('Recommended tenants')

    })

    it('check room enquiries', function () {
    })

    it('check recommended tenants', function () {
    })

    it('check booking request', function () {
    })

    it('check unpublished room', function () {
    })

})