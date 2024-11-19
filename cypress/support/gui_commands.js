import 'cypress-file-upload'

Cypress.Commands.add(
  'guiAdminLogin',
  (
    user = Cypress.env('adminUserEmail'),
    password = Cypress.env('adminUserPassword'),
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
      cy.visit(`${Cypress.config('baseUrl')}/home`)
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

Cypress.Commands.add('guiRegisterUserAdminArea', (user) => {
  cy.visit(`${Cypress.config('baseUrl')}/admin/cadastrarusuarios`)

  if (user) {
    cy.get('[data-testid="nome"]').type(user.name)
    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)
    if (user.administrator) {
      cy.get('[data-testid="checkbox"]').check()
    }
  }
  cy.intercept('POST', '**/usuarios').as('postAdicionarUsuario')
  cy.get('[data-testid="cadastrarUsuario"]').click()
})

Cypress.Commands.add('guiRegisterUserPublicArea', (user) => {
  cy.visit(`${Cypress.config('baseUrl')}/cadastrarusuarios`)

  if (user) {
    cy.get('[data-testid="nome"]').type(user.name)
    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)
    if (user.administrator) {
      cy.get('[data-testid="checkbox"]').check()
    }
  }
  cy.intercept('POST', '**/usuarios').as('postAdicionarUsuario')
  cy.get('[data-testid="cadastrar"]').click()
})

/** ** Produtos ****/
Cypress.Commands.add('guiRegisterProduct', (product) => {
  cy.visit(`${Cypress.config('baseUrl')}/admin/cadastrarprodutos`)

  if (product) {
    cy.get('[data-testid="nome"]').type(product.name)
    cy.get('[data-testid="preco"]').type(product.price)
    cy.get('[data-testid="descricao"]').type(product.description)
    cy.get('[data-testid="quantity"]').type(product.quantity)
    cy.get('[data-testid="imagem"]').as('fileInput').attachFile('teste.jpeg')
  }
  cy.intercept('POST', '**/produtos').as('postAdicionarProduto')
  cy.get('[data-testid="cadastarProdutos"]').click()
})

Cypress.Commands.add('guiSearchProduct', (product) => {
  cy.get('[data-testid="pesquisar"]').type(product.name)

  cy.intercept({
    method: 'GET',
    pathname: '**/produtos',
    query: {
      nome: product.name
    }
  }).as('getBuscarProduto')

  cy.get('[data-testid="botaoPesquisar"]').click()
})