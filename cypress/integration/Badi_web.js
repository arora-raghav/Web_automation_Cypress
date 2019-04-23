

describe('Opening the app', function() {
    it('finds the content "Barcelona"', function() {
      cy.visit('https://weblocal.badi.com/')
  
      cy.contains('Barcelona')
    })
  })

describe('Searching for Barcelona', function(){
    it('Search for Barcelona in search bar', function () {
        cy.get('.geosuggest__input')
        .type('Barcelona')
        cy.get('.geosuggest__item--active > div > .geosuggest__text')
        .click()
        cy.contains('Barcelona, Spain')

    })

    it('Check cookie banner', function (){
        cy.contains('cookie')
    })

    it('Refine search in with date', function() {
        cy.get('.filter__options_status > .filter__select').click()
        cy.contains('Choose day')
        cy.get('.filter__options_status > .filter__dropdown > .filter__box > .filter__list > :nth-child(2) > .switcher > .switcher__text').click()    
        cy.contains('April 2019') 
        cy.get('[aria-label="Monday, April 29, 2019"]').click()
        cy.contains('29 April')
        cy.get('.filter__options_status > .filter__choose > .filter__clear').click()
    })

    it('Selecting amenities', function () {
        cy.get('.filter__options_type > .filter__select').click()
        cy.contains('Bed type')
        cy.get('.filter__col_first > .filter__list > :nth-child(3) > .switcher > .switcher__text').click()
        cy.get(':nth-child(2) > .filter__list > :nth-child(1) > .switcher > .switcher__text').click()
        cy.contains('Wifi').click()
        cy.contains('Washing machine').click()
        cy.contains('Amenities').click()

    })

    it('Select max price', function (){
        cy.get('.filter__input').type('400')
        cy.wait(1000)
        cy.expect

    })

    it('Click on room', function (){
        cy.get('.map__point_active > .map__point > .map__price > .map__cost').click()
        cy.contains('Request to chat')
    })

    it('Request to chat send to register screen', function (){
        cy.contains('Request to chat').click()
        cy.get('.AuthForms').contains('Register')
        cy.contains('Google')
        cy.contains('Email')
        cy.contains('Facebook')

    })


})

describe.only('Registering user', function() {

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let fakeemail = chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@mailinator.com';
    print(chars);
    // register user with simple email

    it('Simple email registration"', function() {
      cy.visit('https://weblocal.badi.com/')
      cy.get(':nth-child(6) > .Text__button').click()
      cy.contains('Already have an account? Log in')
      cy.get('.AuthButton__email').click()

      //let chars = 'abcdefghijklmnopqrstuvwxyz';
      //let fakeemail = chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@mailinator.com';
      //print(chars);

      // enter username and password
      cy.get('#username').type(fakeemail)
      cy.get('#password').type("Test123")
      cy.get('#signUp').click()

      // accept GDPR modal
      cy.get('.GDPR__modal').contains('Just to let you know')
      cy.get('.GDPR__buttons > :nth-child(1)').click()

      // Assert modal seeker/lister is there
      cy.contains('I have a room to list')
      cy.contains('I\'m looking for a room to live in')

      // go to seeker mode
      cy.get('.Form__RadioButtonGroup--wrapper > :nth-child(2)').click()
      cy.get('.Button__green-dark').click()

      // assert user is logged-in
      cy.get('.UserMenu__avatar').click()
      cy.url().should('include', '/my-profile')
    })

    it('Complete profile', function(){
        // check page is profile page
        cy.url().should('include', '/my-profile')
        cy.contains('Verify your profile')

        //enter email activation code
        cy.get('#email').type(fakeemail)
        cy.log(fakeemail)
        cy.get(':nth-child(1) > form > .VerificationBlock > .VerificationButtons > .Button__green').click()
        //cy.contains('address').contains('Enter the code we just emailed you to finish verifying your email address.').click()
        //cy.visit('https://www.mailinator.com/')
    })


  })
