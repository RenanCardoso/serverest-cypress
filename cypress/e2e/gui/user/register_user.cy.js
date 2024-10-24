import { faker } from '@faker-js/faker'

describe('Cadastrar usuário via GUI', () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    administrator: null
  }

  beforeEach(() => {
    cy.guiLogin()
  })

  context('usuário administrador', () => {
    user.administrator = true // Configura o administrador para true

    it('cadastrar com sucesso', () => {
      cy.guiRegisterUser(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 201)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/listarusuarios`)
      cy.contains(user.name).should('be.visible')
      cy.contains(user.email).should('be.visible')
    })
  })
})
