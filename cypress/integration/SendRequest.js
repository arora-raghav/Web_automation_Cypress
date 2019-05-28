describe('Seeker sends request', function() {


    // need a seeker account with complete profile

    it('Seekers logs in', function () {

        cy.signIn({email: 'jules.seeker@mailinator.com', password: 'Test.123'})

    })

    // search for barcelona
    it('Search for Rambla de Prim, Barcelona, Spain in search bar', function () {
        cy.get('.FeaturedCity__Image').first().click()
        cy.url().should('include', 'Barcelona')
    })

    // find first room and send enquiry
    it('Sends enquiry', function () {
    cy.get('.map__point_active > .map__point > .map__price > .map__cost').click()
    cy.contains('Request to chat').click()
    cy.get('.carousel__item_active > .carousel__link > .carousel__block > .carousel__send')
    
     cy.contains('Once accepted you\'ll be able to chat with this badi!')
    })

// need a lister account with rooms - my test account
// to check the request

})