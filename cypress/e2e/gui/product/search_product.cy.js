import { faker } from '@faker-js/faker'

describe('Buscar produto via GUI', () => {

    let accessToken = ''
    let product = {
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

    beforeEach(() => {
        cy.guiLogin()
    })

    context('usuário não administrador', () => {
        it('buscar produto com sucesso', () => {
            cy.guiSearchProduct(product)
            cy.wait('@getBuscarProduto').its('response.statusCode').should('eq', 200)
        })
    })
})
