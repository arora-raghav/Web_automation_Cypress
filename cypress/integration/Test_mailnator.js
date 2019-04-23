describe.only('Test mailinator', function() {

    it('Simple email registration"', function() {
        cy.visit('https://www.mailinator.com/')
        cy.get('#inboxfield').type('vycieelukz{enter}')
        cy.contains('code').click()

        // need to find a way to be able to select the mail to get the code
        // mailinator API is not free
        // or find activation code 


    })

})