describe('Log account', () => {
  const baseurl = "http://localhost:8080/"
  const full_name = 'Little Groupe'
  const email = 'littlegroupe@ecoles-epsi.fr'
  const password = 'littlegroupe'

  it('should have a link to go to login page', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('.collapse a[href="/login"]').click()
    cy.url().should('contain', '/login')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.login(email, password)
    cy.contains('Success! You are logged in.').should('exist')
    cy.url().should('contain', baseurl)
  })

  it('login page', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.login(email, password)
    //cy.wait('@login')
    cy.contains('Success! You are logged in.').should('exist')
    cy.url().should('contain', baseurl)
  })

  it('should be a email invalid', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('input[name="email"]').type('littlegroupe')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })

  it('should be a password invalid', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('littlegroup')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password.').should('exist')
    cy.url().should('contain', '/')
  })

  it('should be able to logout', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('.collapse a[href="/login"]').click()
    cy.url().should('contain', '/login')
    cy.login(email, password)
    cy.contains('Success! You are logged in.').should('exist')
    cy.get('.collapse a[href="/logout"]').click()
    cy.url().should('contain', baseurl)
  })

  it('should be a login and password empty', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('button[type="submit"]').click()
    //cy.contains('Veuillez renseigner ce champ.').should('exist')
  })

  it('forgot password with mail valid', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="email"]').type(email)
    cy.get('button[type="submit"]').click()
    cy.contains('Error sending the password reset message. Please try again shortly.').should('exist')
  })

  it('mail not valid', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="email"]').type('littlegroupe@')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })

  it('email not in BDD', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="email"]').type('littlegroup@ecoles-epsi.fr')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
    cy.contains('Account with that email address does not exist.').should('exist')
  })

  it('empty email forgot password', () => {
    cy.visit('/login')
    cy.cookie()
    cy.get('.container a[href="/forgot"]').click()
    cy.url().should('contain', '/forgot')
    //cy.get('input[name="email"]').should('exist')
    cy.get('button[type="submit"]').click()
    cy.get('#email[required]')
  })
})