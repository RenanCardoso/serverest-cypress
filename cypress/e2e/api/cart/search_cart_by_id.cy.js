import { faker } from '@faker-js/faker'

describe('Buscar carrinho por ID via API', () => {
  let accessToken = ''

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    //   cy.apiRegisterProduct(accessToken, product).then((response) => {
    //     expect(response.status).to.equal(201)
    //     product.id = response.body._id
    //   })
    })
  })

  it('buscar carrinho com sucesso', () => {
    cy.apiSearchCartById(accessToken, '').then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
