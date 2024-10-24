import { faker } from '@faker-js/faker'

describe('Buscar usuário por ID via API', () => {
  let accessToken = ''

  const user = {
    id: '',
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    administrator: null
  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
      cy.apiRegisterUser(accessToken, user).then((response) => {
        expect(response.status).to.equal(201)
        user.id = response.body._id
      })
    })
  })

  context('usuário administrador', () => {
    user.administrator = 'true' // Configura o administrador para true
    it('buscar com sucesso', () => {
      cy.apiSearchUserById(accessToken, user).then((response) => {
        expect(response.status).to.equal(200)
      })
    })
  })
})
