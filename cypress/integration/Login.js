// Login using Email, Facebook and Gmail



describe('Login with Email', function() {
    it('User logs with email"', function() {
      cy.visit('https://weblocal.badi.com/')
  
      // clicks login
      cy.get(':nth-child(7) > .Text__button').click()

      // assert all login option are present
      cy.get('.AuthForms__title').contains('Log in')
      cy.contains('Continue with Facebook')
      cy.contains('Continue with Google')
      cy.contains('Continue with Email')

      // click on email login

      cy.get(':nth-child(3) > .AuthButton').click()

      // check modal

      // enter credentials
      cy.get('#username').type('jules.maurel@badiapp.com')
      cy.get('#password').type('Test.123')
      cy.get('.Button').click()

      //check url
      cy.url().should('include', '/listings')

      // log out
      
    })

  })