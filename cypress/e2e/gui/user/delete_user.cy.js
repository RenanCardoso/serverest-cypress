import { faker } from '@faker-js/faker'

describe('Deletar usuários', () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    administrator: true
  }

  beforeEach(() => {
    cy.guiLogin()
    cy.guiRegisterUser(user)
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
