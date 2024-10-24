import { faker } from '@faker-js/faker'

describe('Cadastrar produto via API', () => {
  let accessToken = ''

  const product = {
    name: `product ${faker.food.ingredient()}`,
    price: faker.number.int({ min: 1, max: 1000 }),
    description: faker.lorem.lines(1),
    quantity: faker.number.int({ min: 1, max: 1000 })
  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  it('cadastrar com sucesso', () => {
    cy.apiRegisterProduct(accessToken, product).then((response) => {
      expect(response.status).to.equal(201)
    })
  })
})
