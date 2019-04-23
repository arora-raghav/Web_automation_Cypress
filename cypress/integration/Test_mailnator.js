describe.only('Test gmail', function() {

    it('Simple email registration"', function() {
        cy.visit('https://www.google.com')
        cy.get('#gb_70').click()
       cy.get('input').type('teamtestbadi@gmail.com')
        // need to find a way to be able to select the mail to get the code
        // mailinator API is not free
        // or find activation code 
        // OR TRY WITH GMAIL

    })

})