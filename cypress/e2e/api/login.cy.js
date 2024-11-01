describe('Login', () => {
  it('realizar login com sucesso via API e alterei', () => {
    const userEmail = Cypress.env('userEmail')
    const userPassword = Cypress.env('userPassword')

    cy.apiLogin(userEmail, userPassword).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
