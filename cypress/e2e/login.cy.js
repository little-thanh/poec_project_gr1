describe('Log account', () => {
  const baseurl = "http://localhost:8080/"
  const full_name = 'Little Groupe'
  const email = 'littlegroupe@ecoles-epsi.fr'
  const password = 'littlegroupe'

  it('should navigate to the login page', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('.collapse a[href="/login"]').click()
    cy.url().should('contain', '/login')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.login(email, password)
    cy.contains('Success! You are logged in.').should('be.visible')
    cy.url().should('contain', baseurl)
  })

  it('should check the login page', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.login(email, password)
    //cy.wait('@login')
    cy.contains('Success! You are logged in.').should('be.visible')
    cy.url().should('contain', baseurl)
  })

  it('should check an invalid email', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('input[name="email"]').type('littlegroupe')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })

  it('should check an invalid password', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('littlegroup')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password.').should('be.visible')
    cy.url().should('contain', '/')
  })

  it('should check the page with an empty login and password', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })

  it('should be able to log out', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('.collapse a[href="/login"]').click()
    cy.url().should('contain', '/login')
    cy.login(email, password)
    cy.contains('Success! You are logged in.').should('be.visible')
    cy.get('.collapse a[href="/logout"]').click()
    cy.url().should('contain', baseurl)
  })

  it('should check the option "forgotten password" by submitting a valid email', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="email"]').type(email)
    cy.get('button[type="submit"]').click()
    cy.contains('Error sending the password reset message. Please try again shortly.').should('be.visible')
  })

  it('should check the page when the email is not valid', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="email"]').type('littlegroupe@')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })

  it('should check when the email is not in the DB', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="email"]').type('littlegroup@ecoles-epsi.fr')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
    cy.contains('Account with that email address does not exist.').should('be.visible')
  })

  it('should check when the email is empty and password forgotten', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    //cy.get('input[name="email"]').should('exist')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })

})