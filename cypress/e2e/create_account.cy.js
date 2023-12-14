describe('Create account', () => {
  const baseurl = "http://localhost:8080/"
  const userName = 'John'
  const userEmail = 'john-azerty@mail.fr'
  const userPassword = 'Azerty-12'
  const wrongPassword = 'Qwerty-12'
  it.skip('Nominal test', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('a[href="/signup"]').click()
    cy.get('input[id="fullname"]').type(userName)
    cy.get('input[id="email"]').type(userEmail)
    cy.get('input[id="password"]').type(userPassword)
    cy.get('input[id="confirmPassword"]').type(userPassword)
    cy.get('button').contains('Signup').click()
    cy.get('a[href="/account"]').contains('My account')
  })

  it.skip('should check the page when the account already exists', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('a[href="/signup"]').click()
    cy.get('input[id="fullname"]').type(userName)
    cy.get('input[id="email"]').type(userEmail)
    cy.get('input[id="password"]').type(userPassword)
    cy.get('input[id="confirmPassword"]').type(userPassword)
    cy.get('button').contains('Signup').click()
    cy.get('.alert-danger').contains('Account with that email address already exists.')
  })

  it.skip('should check the page with all empty values', () => {
    cy.visit('/')
    cy.cookie()
    cy.get('a[href="/signup"]').click()
    cy.get('button').contains('Signup').click()
    cy.get('#fullname[required]')
    cy.get('#fullname[required]').type(userName)
    cy.get('button').contains('Signup').click()
    cy.get('#email[required]')
    cy.get('#email[required]').type(userEmail)
    cy.get('button').contains('Signup').click()
    cy.get('#password[required]')
    cy.get('#password[required]').type(userPassword)
    cy.get('button').contains('Signup').click()
    cy.get('#confirmPassword[required]')
    cy.get('#confirmPassword[required]').type(wrongPassword)
    cy.get('button').contains('Signup').click()
    cy.get('div[role="alert"]').contains('Passwords do not match')
  })
})