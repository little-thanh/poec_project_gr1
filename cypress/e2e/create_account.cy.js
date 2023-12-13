describe('Create account', () => {
  const baseurl = "http://localhost:8080/"
  const userName = 'John'
  const userEmail = 'john-azerty@mail.fr'
  const userPassword = 'Azerty-12'
  it.skip('Nominal test', () => {
    cy.visit('/')
    cy.get('a[href="/signup"]').click()
    cy.get('input[id="fullname"]').type(userName)
    cy.get('input[id="email"]').type(userEmail)
    cy.get('input[id="password"]').type(userPassword)
    cy.get('input[id="confirmPassword"]').type(userPassword)
    cy.get('button').contains('Signup').click()
    cy.get('a[href="/account"]').contains('My account')
  })
  it.skip('Account already exist', () => {
    cy.visit('/')
    cy.get('a[href="/signup"]').click()
    cy.get('input[id="fullname"]').type(userName)
    cy.get('input[id="email"]').type(userEmail)
    cy.get('input[id="password"]').type(userPassword)
    cy.get('input[id="confirmPassword"]').type(userPassword)
    cy.get('button').contains('Signup').click()
    cy.get('.alert-danger').contains('Account with that email address already exists.')
  })
  it('Test with empty ', () => {
    cy.visit('/')
    cy.get('a[href="/signup"]').click()
    cy.get('button').contains('Signup').click()
    cy.get('')
  })
})