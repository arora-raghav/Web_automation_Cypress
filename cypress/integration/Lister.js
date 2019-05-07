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
        cy.contains('Continue with')
        cy.get(':nth-child(3) > .AuthButton').click()
        cy.get('#username').type(fakeemail)
        cy.get('#password').type('Test123')
        cy.get('.Button__text').should('not.be.disabled')
        cy.get('.Button__text').click()
        cy.get(':nth-child(1) > .Button').click()
        cy.get(':nth-child(1) > label').click()
        cy.get('.Button').click()
        cy.get(':nth-child(1) > label').click()
        cy.get('.Button__green-dark').click()
        cy.get('.LandingHeader__Content > .RentRoomButton').click()

        cy.get(':nth-child(1) > .Form__GeoSuggest--wrapper > .geosuggest > .geosuggest__input-wrapper > .geosuggest__input').type('Barcelona')
        cy.get('.geosuggest__item--active').click()
        cy.get(':nth-child(2) > .Form__GeoSuggest--wrapper > .geosuggest > .geosuggest__input-wrapper > .geosuggest__input').type('Muntaner')
        cy.get('.geosuggest__item--active > span > .geosuggest__item__matched-text').click()
        cy.get('.col-12 > .Button').click()
      })
    })