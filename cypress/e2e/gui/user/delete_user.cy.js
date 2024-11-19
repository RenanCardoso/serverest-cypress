import { faker } from '@faker-js/faker'

describe('Deletar usuários', () => {

  let user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    administrator: 'true'
  }
  const options = { cacheSession: false }

  before(() => {
    cy.apiRegisterUser(user).then((response) => {
      expect(response.status).to.equal(201)
    })
  })

  beforeEach(() => {
    cy.guiAdminLogin(user.email, user.password, options)
    cy.guiRegisterUserAdminArea(user)
  })

  context('usuário administrador', () => {
    it('deletar com sucesso', () => {
      cy.intercept('DELETE', '**/usuarios/*').as('deleteUsuario')

      // Encontra o usuário pelo email e clica em Excluir
      cy.contains(user.email)
        .parents('tr') // Encontra a linha da tabela correspondente ao usuário
        .find('button:contains("Excluir")') // Encontra o botão de excluir
        .click()

      // Aguarda a requisição DELETE e valida o status
      cy.wait('@deleteUsuario').its('response.statusCode').should('eq', 200)
    })
  })
})
