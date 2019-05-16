// Lister logs in and list a room

describe('Lister', function(){

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let fakeemail = chars[Math.floor(Math.random()*26)] + Math.random().toString(36).substring(2,11) + '@mailinator.com';
    print(chars);
    // register user with simple email

    it('Register as lister', function () {
            cy.visit('https://weblocal.badi.com/')
        
            cy.contains('Barcelona')
            cy.get('.ListerInfo__Button').click()
            cy.contains('Rent out your room')
            cy.get('.LandingHeader__Content > .RentRoomButton').click()

            // login with email
            cy.contains('Continue with')
            cy.get(':nth-child(3) > .AuthButton').click()
            cy.get('#username').type(fakeemail)
            cy.get('#password').type('Test123', {delay: 100})
            cy.get('#signUp').should('not.be.disabled')
            cy.get('#signUp').click()

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


      it('step 1 - location', function () {

          // select a city
          cy.get(':nth-child(1) > .Form__GeoSuggest--wrapper > .geosuggest > .geosuggest__input-wrapper > .geosuggest__input')
          .type("Barcelona")
          cy.get('.geosuggest__item--active').click()

          // select a street
          cy.get(':nth-child(2) > .Form__GeoSuggest--wrapper > .geosuggest > .geosuggest__input-wrapper > .geosuggest__input')
          .type('Muntaner')
          cy.get('.geosuggest__item--active').click()

          // click on cookie banner
          cy.get('.CookieConsent__close').click()
          cy.wait(1000)

          // click continue
          cy.contains('Continue').click()
          })
      
      it('step 2 - property', function () {

          // select type of property - private room

          cy.get('.Form__RadioButtonGroup--wrapper > :nth-child(1) > label').click()

          // select flatmates number - 1 of each
          cy.get('[name="maleTenants-add"]').click()
          cy.get('[name="femaleTenants-add"]').click()

          // property size
          cy.get('.Form__InputWithLabel--wrapper > input').type('125')

          // scroll
          //cy.get('Terrace').scrollIntoView()
          // select amenities - wifi and terrace
          cy.get(':nth-child(4) > .Form__Choice--wrapper > :nth-child(2) > label').click()
          cy.get(':nth-child(18) > label').click()
          


          // scroll
          cy.get(':nth-child(5) > h3').scrollIntoView()

          // house rules - couples accepted
          cy.get(':nth-child(5) > .Form__Choice--wrapper > :nth-child(3) > label').click()

          // submit
          cy.get('[type="submit"]').click()
        })

      it('step 3 - room', function () {

          // select double bed
          cy.get('.Form__RadioButtonGroup--wrapper > :nth-child(1) > label').click()

          // size of the room
          cy.get(':nth-child(2) > .Form__InputWithLabel--wrapper > input').type('40')

          // set availability
          cy.get('.DateInput_1').first().click()
          cy.get('[aria-label="Move forward to switch to the next month."]').click()
          cy.get('[aria-label="Thursday, June 6, 2019"]').click()

          // monthly rent
          cy.get(':nth-child(4) > .Form__InputWithLabel--wrapper > input').type('600')

          // Deposit
          cy.get('.col-12 > .Form__InputWithLabel--wrapper > input').type('1600')

          // click continue
          
          cy.get('[type="submit"]').click()
          

            })

      it('step 4 - photos', function () {

        const fileName = 'image.png';

        cy.fixture(fileName).then(fileContent => {
          cy.get('.DropZone__Empty').upload(
            { fileContent, fileName, mimeType: 'image/png' },
            { subjectType: 'input' },
          );
        });

      })

      it('step 4.2 - title and description', function () {


        // add a title
        cy.get('textarea').first().type('THIS IS A TEST FLAT')
        cy.get(':nth-child(3) > .Form__TextArea--wrapper > textarea').type('This is a short description about the flat')

        // click continue
          
        cy.get('[type="submit"]').click()
      })

      it('step 5 - Flatmates', function () {

      // accept default proposition and continue
      cy.get('[type="submit"]').click()

      })

      it('Verify phone pop up', function () {

        //select Spain
        cy.get('.Select--select').select('Spain')
        cy.contains('I have a code').click()
        cy.get('#code').type('2222',{delay: 100})
        cy.get('p.text_center > .Button').click()

      })

      it('Complete profile pop up', function () {
        // check pop up exist

        cy.contains('Your room is nearly published!')
        cy.get('.CompleteProfile--actions > :nth-child(2) > .Button > .Button__text').click()
        
      })

      it('Complete profile', function(){

        // check url
        cy.url().should('include', '/edit')
      })




    
    })