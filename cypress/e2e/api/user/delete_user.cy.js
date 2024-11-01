import { faker } from '@faker-js/faker'

describe('Deletar usuário via API', () => {
  let accessToken = ''

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  it('deletar usuário administrador com sucesso', () => {
    let user = {
      id: '',
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 20 }),
      administrator: 'true'
    }
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
      cy.apiRegisterUser(accessToken, user).then((response) => {
        expect(response.status).to.equal(201)
        user.id = response.body._id
      })
    })

    cy.apiDeleteUserById(accessToken, user).then((response) => {
      expect(response.status).to.equal(200)
    })
  })

  it('deletar usuário não administrador com sucesso', () => {
    let user = {
      id: '',
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 20 }),
      administrator: 'false'
    }
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
      cy.apiRegisterUser(accessToken, user).then((response) => {
        expect(response.status).to.equal(201)
        user.id = response.body._id
      })
    })

    cy.apiDeleteUserById(accessToken, user).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
