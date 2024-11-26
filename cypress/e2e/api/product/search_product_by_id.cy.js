import { faker } from '@faker-js/faker'

describe('Buscar produto por ID via API', () => {
  let accessToken = ''

  const product = {
    id: '',
    name: `product ${faker.food.ingredient()} ${faker.string.uuid()}`,
    price: faker.number.int({ min: 1, max: 1000 }),
    description: faker.lorem.lines(1),
    quantity: faker.number.int({ min: 1, max: 1000 })
  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
      cy.apiRegisterProduct(accessToken, product).then((response) => {
        expect(response.status).to.equal(201)
        product.id = response.body._id
      })
    })
  })

  it('buscar produto com sucesso', () => {
    cy.apiSearchProductById(accessToken, product).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
