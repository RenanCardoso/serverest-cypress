import { faker } from '@faker-js/faker'

describe('Excluir carrinho e retornar produtos para estoque via API', () => {
    let accessToken = ''
    const cart = {

    }

    before(() => {
        cy.apiLogin().then((response) => {
            accessToken = response.body.authorization
        })
    })

    it('cancelar compra com usuário sem carrinho', () => {
        cy.apiCancelPurchaseDeleteCart(accessToken).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Não foi encontrado carrinho para esse usuário")
        })
    })

    context('sucesso', () => {

        let product = {}
        let cart = {}

        beforeEach(() => {
            product = {
                id: '',
                name: `product ${faker.food.ingredient()} ${faker.string.uuid()}`,
                price: faker.number.int({ min: 1, max: 1000 }),
                description: faker.lorem.lines(1),
                quantity: faker.number.int({ min: 1, max: 1000 })
            }

            cy.apiRegisterProduct(accessToken, product).then((response) => {
                expect(response.status).to.equal(201)
                product.id = response.body._id
                cart = {
                    productId: product.id,
                    quantity: faker.number.int({ min: 1, max: 10 })
                }
                cy.apiRegisterCart(accessToken, cart.productId, cart.quantity).then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
                })
            })
        });

        it('cancelar compra com sucesso e devolver produto para estoque', () => {
            cy.apiCancelPurchaseDeleteCart(accessToken).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Registro excluído com sucesso. Estoque dos produtos reabastecido")
            })
            cy.apiSearchProductById(accessToken, product).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.quantidade).to.equal(product.quantity)
            })
        })
    })
})
