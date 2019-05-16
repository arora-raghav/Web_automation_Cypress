
// simple going to the page and searching using the filters

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


    // check last date of the month, need to do this progammatically
    it('Refine search in with date', function() {
        cy.get('.filter__options_status > .filter__select').click()
        cy.contains('Choose day')
        cy.get('.filter__options_status > .filter__dropdown > .filter__box > .filter__list > :nth-child(2) > .switcher > .switcher__text').click()    
        cy.contains('May 2019') 
        cy.get('[aria-label="Monday, May 27, 2019"]').click()
        cy.contains('27 May')
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

    it('Close the chat and go back to homepage', function (){
        cy.get(':nth-child(2) > .popup > .popup__main > .popup__head > .popup__close').click()
        cy.get('.popup__close').click()
        cy.get('a > svg').click()
    })

})

describe('Refining search per price', function(){

    it('finds the content "Barcelona"', function() {
        cy.visit('https://weblocal.badi.com/')
    
        cy.contains('Barcelona')
      })

    it('Search for Barcelona in search bar', function () {
        cy.get('.geosuggest__input')
        .type('Barcelona')
        cy.get('.geosuggest__item--active > div > .geosuggest__text')
        .click()
        cy.contains('Barcelona, Spain')

    })

    it('Select max price to 13 euros', function (){
        cy.get('.filter__input').type('13')
        cy.wait(1000)
        // expect just one result in the carousel)
        cy.get('.carousel__list').find('li').should('have.length', 1)

    })

    it('Remove price filter', function (){
        cy.get('.filter__unprice').click()
        cy.wait(1000)
        // expect 20 result in the carousel)
        cy.get('.carousel__list').find('li').should('have.length', 20)

    })

})

describe.only('Refining search per availability', function(){

    const urlForSearchShortStay = 'https://weblocal.badi.com/s/Rambla-de-Prim--Barcelona--Spain?stay=1&sort=2&bounds=41.4443281427171,2.233610199658216;41.39528359789645,2.1838284003418096&center=41.41981049999998,2.2087193000000127&max=1700&min=1000&d=2&city=Barcelona&pid=EiBSYW1ibGEgZGUgUHJpbSwgQmFyY2Vsb25hLCBTcGFpbiIuKiwKFAoSCf8xpFlLo6QSEZ2ZOxm4Cf36EhQKEgnlMI5xFpikEhEKZkdPPfuwRA&z=14'
    const urlForSearchMediumStay = 'https://weblocal.badi.com/s/Rambla-de-Prim--Barcelona--Spain?stay=6&sort=2&bounds=41.4443281427171,2.233610199658216;41.39528359789645,2.1838284003418096&center=41.41981049999998,2.2087193000000127&max=1700&min=1000&d=2&city=Barcelona&pid=EiBSYW1ibGEgZGUgUHJpbSwgQmFyY2Vsb25hLCBTcGFpbiIuKiwKFAoSCf8xpFlLo6QSEZ2ZOxm4Cf36EhQKEgnlMI5xFpikEhEKZkdPPfuwRA&z=14'
    const urlForSearchLongStay = 'https://weblocal.badi.com/s/Rambla-de-Prim--Barcelona--Spain?stay=12&sort=2&bounds=41.4443281427171,2.233610199658216;41.39528359789645,2.1838284003418096&center=41.41981049999998,2.2087193000000127&max=1700&min=1000&d=2&city=Barcelona&pid=EiBSYW1ibGEgZGUgUHJpbSwgQmFyY2Vsb25hLCBTcGFpbiIuKiwKFAoSCf8xpFlLo6QSEZ2ZOxm4Cf36EhQKEgnlMI5xFpikEhEKZkdPPfuwRA&z=14'

    // to use slider, found on https://github.com/cypress-io/cypress/issues/1570
    

    it('finds the content "Barcelona"', function() {
        cy.visit('https://weblocal.badi.com/')
    
        cy.contains('Barcelona')
      })

    it('Search for Rambla de Prim, Barcelona, Spain in search bar', function () {
        cy.get('.geosuggest__input')
        .type('Barcelona, Rambla de Prim')
        cy.get('.geosuggest__item--active > div > .geosuggest__text')
        .click()
        cy.url().should('include', 'Rambla-de-Prim--Barcelona--Spain')


    })

    it('Check 3 tests flats are present', function (){
        cy.get('#room-list-card-5190').find('h4')
        .should('be.visible')
        .should('have.text', '€1,003/month')
        cy.get('#room-list-card-5192').find('h4')
        .should('be.visible')
        .should('have.text', '€1,218/month')
        cy.get('#room-list-card-5191').find('h4')
        .should('be.visible')
        .should('have.text', '€1,611/month')

    })

    it('Set filter to short', function (){

        // need to move the slider on the filter
        // cy.get('#filter-availability').click()
        // cy.get('.DefaultHandle_handle')
        // invoke('val', 1)
        // .trigger('input')
        // .contains('Apply').click()

        // trying to bypass slider by url
        cy.visit(urlForSearchShortStay)
        
        //should contain the following
        cy.get('#room-list-card-5190').find('h4')
        .should('be.visible')
        .should('have.text', '€1,003/month')

        // should not contain the following
        cy.get('#room-list-card-5192')
        .should('not.exist')

        cy.get('#room-list-card-5191')
        .should('not.exist')
    })

    it('Set filter to medium', function (){

        // trying to bypass slider by url
        cy.visit(urlForSearchMediumStay)
        
        //should contain the following
        cy.get('#room-list-card-5190').find('h4')
        .should('be.visible')
        .should('have.text', '€1,003/month')

        cy.get('#room-list-card-5191').find('h4')
        .should('be.visible')
        .should('have.text', '€1,611/month')

        // should not contain the following
        cy.get('#room-list-card-5192')
        .should('not.exist')
    })

    it('Set filter to long', function (){

        // trying to bypass slider by url
        cy.visit(urlForSearchLongStay)
        
        //should contain the following
        cy.get('#room-list-card-5190').find('h4')
        .should('be.visible')
        .should('have.text', '€1,003/month')
        
        cy.get('#room-list-card-5192').find('h4')
        .should('be.visible')
        .should('have.text', '€1,218/month')
        
        cy.get('#room-list-card-5191').find('h4')
        .should('be.visible')
        .should('have.text', '€1,611/month')
    })

})
