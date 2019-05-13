// simple registering of a seeker

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

        //enter email activation code - not able check email at the momment
        cy.get('#email').type(fakeemail)
        cy.log(fakeemail)
        cy.get(':nth-child(1) > form > .VerificationBlock > .VerificationButtons > .Button__green').click()


        //verify phone number using 2222
        cy.get(':nth-child(3) > form > .VerificationBlock > .VerificationButtons > .Button__grey').click()
        cy.get(':nth-child(3) > form > .VerificationBlock > .VerificationInputs > .form__input > [data-tip=""] > #code').type('2222')

        cy.get(':nth-child(3) > form > .VerificationBlock > .VerificationInputs > .form__input > [data-tip=""] > #code')
          .should('not.have.class', 'Button__disabled')
        cy.get(':nth-child(3) > form > .VerificationBlock > .VerificationButtons > .Button__green').click()
        cy.contains('Your phone has been confirmed')

        // click on complete profile

        cy.contains('Complete profile').click()    
        cy.url().should('include', 'users/edit')
        cy.get('#name').type('Testuserfirstname')
        cy.get('#lastName').type('Testuserlastname')
        cy.get('.col-4 > .Form__Select--wrapper > select').select('1981')
        cy.contains('female').click()
        cy.contains('work').click()
        cy.get('#formblock-work > .Form__Select--wrapper > select').select('IT') //add what do you do for a living 
        cy.get('.Form__SelectMultiple--placeholder').click()
        cy.contains('English').click() // add language
        cy.contains('French').click()
        cy.contains('Armenian').click()
        cy.get('.Form__SelectMultiple--outer-background').click()

        // add personality traits

        cy.get('.Form__TagList > :nth-child(1)').click()
        cy.contains('Active').click()
        cy.contains('Practical').click()
        cy.contains('Tolerant').click()

        // add lifestyle trait
        cy.contains('Lifestyle').click()
        cy.contains('Chef').click()
        cy.contains('Book lover').click()
        cy.contains('Partier').click()
        
        // add Music taste
        cy.contains('Music').click()
        cy.contains('Reggae').click()
        cy.contains('Metal').click()
        cy.contains('Ska').click()

         // add Sports genres taste
        cy.contains('Sports').click()
        cy.contains('Athletics').click()
        cy.contains('Pole dancing').click()
        cy.contains('Hiking').click()

        // add Movie genres taste
        cy.contains('Movie genres').click()
        cy.contains('Sci-fi').click()
        cy.contains('Documentary').click()
        cy.contains('Horror').click()

        // save profile
        cy.contains('Save').click()

        cy.get('textarea').type('This is a sample of text about me and my life')

        //check profile is correct
        //cy.contains('Documentary', 'Hiking', 'Sci-fi')
        

        //upload profile pics
        const fileName = 'image.png';

        cy.fixture(fileName).then(fileContent => {
          cy.get('.DropZone__Empty').upload(
            { fileContent, fileName, mimeType: 'image/png' },
            { subjectType: 'drag-n-drop' },
          );
        });

        // click on cookie banner
        cy.get('[id="icon/close"]').click()
        cy.wait(1000)
        // click submit button
        //cy.get('.DropZone__Preview--loader > svg', {timeout: 1000}).should("not.be.visible")

        cy.get('[type="submit"]').click()

        //check we are back on profile page

        cy.contains('100%')


    })


  })
