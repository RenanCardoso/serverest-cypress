Cypress.Commands.add(
  'guiLogin',
  (
    user = Cypress.env('userEmail'),
    password = Cypress.env('userPassword'),
    { cacheSession = true } = {}
  ) => {
    const login = () => {
      cy.visit(`${Cypress.config('baseUrl')}/login`)
      cy.get("[data-testid='email']").type(user)
      cy.get("[data-testid='senha']").type(password, { log: false })

      cy.intercept('POST', '**/login').as('postLogin')
      cy.get("[data-testid='entrar']").click()
      cy.wait('@postLogin').its('response.statusCode').should('eq', 200)
    }

    const validate = () => {
      cy.visit(`${Cypress.config('baseUrl')}/admin/home`)
      cy.location('pathname', { timeout: 1000 })
        .should('not.eq', `${Cypress.config('baseUrl')}/login`)
    }

    const options = {
      cacheAcrossSpecs: true,
      validate
    }

    if (cacheSession) {
      cy.session(user, login, options)
    } else {
      login()
    }
  })

Cypress.Commands.add('guiRegisterUser', (user) => {
  cy.visit(`${Cypress.config('baseUrl')}/admin/cadastrarusuarios`)

  cy.get('[data-testid="nome"]').type(user.name)
  cy.get('[data-testid="email"]').type(user.email)
  cy.get('[data-testid="password"]').type(user.password)
  if (user.administrator) {
    cy.get('[data-testid="checkbox"]').check()
  }
  cy.intercept('POST', '**/usuarios').as('postAdicionarUsuario')
  cy.get('[data-testid="cadastrarUsuario"]').type(user.email)
})
