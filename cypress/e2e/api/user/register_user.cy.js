import { faker } from '@faker-js/faker'

describe('Cadastrar usuário via API', () => {
  let accessToken = ''

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    administrator: null
  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  context('usuário administrador', () => {
    user.administrator = 'true' // Configura o administrador para true

    it('cadastrar com sucesso', () => {
      cy.apiRegisterUser(accessToken, user).then((response) => {
        expect(response.status).to.equal(201)
      })
    })
  })
})
