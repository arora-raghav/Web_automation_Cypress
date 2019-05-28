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
    cy.get('.map__point_active > .map__point > .map__price > .map__cost').should('be.visible')
    .click()
    //cy.get('.map__point_active > .map__point > .map__price > .map__cost').click()
    cy.contains('Request to chat').click()
    cy.get('.carousel__item_active > .carousel__link > .carousel__block > .carousel__send')
    cy.contains('Once accepted you\'ll be able to chat with this badi!')
    cy.contains('Requested room')

     //save lister name in the listerName variable
     cy.get('.human__name').then(($textString) => {
         const listerName = $textString.text()
         console.log(listerName)
     })
     cy.get('.popup__close').click()

    })

    // check request is in the inbox
    // Lister name is not defined because it's inside a previous promise. Needs to be in the same test
    // or find another way

    it('Check inbox', function () {
        cy.get('.TopBar__Nav_list > :nth-child(6) > a').click()
        cy.url().should('include', '/inbox')
        cy.get('.InboxRow--User__Name').first().should('contain', listerName)
        .find('div > p')
        .should('have.text', 'Room enquiry')
        .find(parent)
        cy.get('InboxRow--Status')
        .first()
        .find('span')
        .should('contain', 'pending')


    })


    // log out
    it('Logs out', function () {
       // cy.logOut()
    })


// need a lister account with rooms - my test account
// to check the request

})