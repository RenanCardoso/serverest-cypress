import { faker } from '@faker-js/faker'

describe('Login', () => {
  it('realizar login de usuário administrador com sucesso', () => {

    let user = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 20 }),
      administrator: 'true'
    }
    cy.apiRegisterUser(user).then((response) => {
      expect(response.status).to.equal(201)
    })

    const options = { cacheSession: false }

    cy.intercept('POST', '/login').as('login')
    cy.guiAdminLogin(user.email, user.password, options)

    // Verificar se o serviço de login retornou sucesso
    cy.wait('@login').its('response.statusCode').should('eq', 200)

    // Verificar se foi redirecionado para a url correta após o login
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/home`)
  })

  it('realizar login de usuário não administrador com sucesso', () => {

    let user = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 20 }),
      administrator: 'false'
    }
    cy.apiRegisterUser(user).then((response) => {
      expect(response.status).to.equal(201)
    })

    const options = { cacheSession: false }

    cy.intercept('POST', '/login').as('login')
    cy.guiAdminLogin(user.email, user.password, options)

    // Verificar se o serviço de login retornou sucesso
    cy.wait('@login').its('response.statusCode').should('eq', 200)

    // Verificar se foi redirecionado para a url correta após o login
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/home`)
    cy.contains('Password é obrigatório').should('be.visible')
  })
})
