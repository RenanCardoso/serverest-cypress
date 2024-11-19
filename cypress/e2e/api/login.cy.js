describe('Login', () => {
  it('realizar login com sucesso via API', () => {
    const userEmail = Cypress.env('adminUserEmail')
    const userPassword = Cypress.env('adminUserPassword')

    cy.apiLogin(userEmail, userPassword).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
