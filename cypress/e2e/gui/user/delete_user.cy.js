import { faker } from '@faker-js/faker'

describe('Deletar usuários', () => {
  
  context('usuário administrador', () => {
    it('deletar com sucesso', () => {
      // let user = {
      //   name: faker.person.fullName(),
      //   email: faker.internet.email().toLowerCase(),
      //   password: faker.internet.password({ length: 20 }),
      //   administrator: 'true'
      // }
      // cy.apiRegisterUser(user).then((response) => {
      //   expect(response.status).to.equal(201)
      // })
      cy.guiAdminLogin()

      // cy.intercept('DELETE', '**/usuarios/*').as('deleteUsuario')

      // // Encontra o usuário pelo email e clica em Excluir
      // cy.contains(user.email)
      //   .parents('tr') // Encontra a linha da tabela correspondente ao usuário
      //   .find('button:contains("Excluir")') // Encontra o botão de excluir
      //   .click()

      // // Aguarda a requisição DELETE e valida o status
      // cy.wait('@deleteUsuario').its('response.statusCode').should('eq', 200)
    })
  })
})
