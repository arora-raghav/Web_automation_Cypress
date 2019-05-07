describe('Lister', function(){

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let fakeemail = chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@mailinator.com';
    print(chars);
    // register user with simple email

    it('Log in as lister', function () {
        cy.visit('https://weblocal.badi.com/')
    
        cy.contains('Barcelona')
        cy.get('.ListerInfo__Button').click()
        cy.contains('Rent out your room')
        cy.get('.LandingHeader__Content > .RentRoomButton').click()

        // login with email
        cy.contains('Continue with')
        cy.get(':nth-child(3) > .AuthButton').click()
        cy.get('#username').type(fakeemail)
        cy.get('#password').type('Test123')
        cy.get('.Button__text').should('not.be.disabled')
        cy.get('.Button__text').click()

        // accept GDPR modal
        cy.get('.GDPR__modal').contains('Just to let you know')
        cy.contains('Accept').click()

        // switch to lister mode
        cy.contains('I have a room to list')
        cy.get(':nth-child(1) > label').click()
        cy.contains('Continue').click()

        // select "I live in this property"
        cy.get(':nth-child(1) > label').click()
        cy.get('.Button__green-dark').click()

        // check url
        cy.url().should('include', '/rent-room')

        // click on rent out your room
        cy.contains('Rent out your room').click()
      })


      it('Create a listing', function () {

      // select a city
      cy.get(':nth-child(1) > .Form__GeoSuggest--wrapper > .geosuggest > .geosuggest__input-wrapper > .geosuggest__input')
      .type("Barcelona")
      cy.get('.geosuggest__item--active').click()

      })

    
    })