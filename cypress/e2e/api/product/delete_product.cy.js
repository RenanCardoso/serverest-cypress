import { faker } from '@faker-js/faker'

describe('Deletar produto via API', () => {
  let accessToken = ''

  const product = {
    id: '',
    name: `product ${faker.food.ingredient()}`,
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

  it('deletar produto com sucesso', () => {
    cy.apiDeleteProductById(accessToken, product).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
