describe('Viewport example', () => {
    const baseurl = "http://localhost:8080/"
    const full_name = 'Little Groupe'
    const email = 'littlegroupe@ecoles-epsi.fr'
    const password = 'littlegroupe'

    it('should display a button menu and button login on a mobile configuration (screen width <= 991px)', () => {
        cy.viewport(991, 759)
        cy.visit('http://localhost:8080/')
        cy.get('.navbar-toggler-icon').should('be.visible')
        cy.get('.navbar-toggler').click()
        cy.get('.collapse a[href="/login"]').should('be.visible')
        cy.get('.collapse a[href="/login"]').click()
        cy.login(email, password)
        cy.contains('Success! You are logged in.').should('be.visible')
        cy.url().should('contain', baseurl)
    })

    it('should check display button menu with viewport width-max 991', () => {
      cy.viewport(991, 759)
      cy.visit('/')
      cy.cookie()
      cy.get('.navbar-toggler').should('be.visible')
      cy.get('.navbar-toggler').click()
      cy.get('a[href="/signup"]').should('be.visible')
      cy.get('a[href="/signup"]').click()
    })

})