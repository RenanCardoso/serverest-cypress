import { faker } from '@faker-js/faker'

describe('Editar usuário via API', () => {
  let accessToken = ''

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 20 }),
    administrator: 'true'
  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  context('usuário administrador', () => {
    const newUser = {
      id: '',
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 20 }),
      administrator: 'true'
    }
    it('editar com sucesso', () => {
      cy.apiEditUserById(accessToken, user, newUser).then((response) => {
        expect(response.status).to.equal(201)
      })
    })
  })
})
