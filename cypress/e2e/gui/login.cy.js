describe('Login', () => {
  it('realizar login com sucesso', () => {
    const userEmail = Cypress.env('userEmail')
    const userPassword = Cypress.env('userPassword')
    const options = { cacheSession: false }

    cy.intercept('POST', '/login').as('login')
    cy.guiLogin(userEmail, userPassword, options)

    // Verificar se o serviço de login retornou sucesso
    cy.wait('@login').its('response.statusCode').should('eq', 200)

    // Verificar se foi redirecionado para a url correta após o login
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/home`)
  })
})
