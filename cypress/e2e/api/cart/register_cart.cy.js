import { faker } from '@faker-js/faker'

describe('Cadastrar carrinho via API', () => {
    let accessToken = ''

    before(() => {
        cy.apiLogin().then((response) => {
            accessToken = response.body.authorization
        })
    })

    context('Sucesso', () => {
        it('cadastrar com sucesso', () => {
            let product = {
                id: '',
                name: `product ${faker.food.ingredient()} ${faker.string.uuid()}`,
                price: faker.number.int({ min: 1, max: 1000 }),
                description: faker.lorem.lines(1),
                quantity: faker.number.int({ min: 1, max: 1000 })
            }
            cy.apiRegisterProduct(accessToken, product).then((response) => {
                expect(response.status).to.equal(201)
                product.id = response.body._id
                cy.apiRegisterCart(accessToken, product.id, faker.number.int({ min: 1, max: 10 })).then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
                })
            })
        })

        it('Verificar se contabilizou estoque', () => {
            let product = {
                id: '',
                name: `product ${faker.food.ingredient()} ${faker.string.uuid()}`,
                price: faker.number.int({ min: 1, max: 1000 }),
                description: faker.lorem.lines(1),
                quantity: faker.number.int({ min: 1, max: 1000 })
            }
            cy.apiRegisterProduct(accessToken, product).then((response) => {
                expect(response.status).to.equal(201)
                product.id = response.body._id
                let cart = {
                    productId: product.id,
                    quantity: faker.number.int({ min: 1, max: 10 })
                }
                cy.apiRegisterCart(accessToken, cart.productId, cart.quantity).then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
                })
                let finalQuantityProduct = product.quantity - cart.quantity
                cy.apiSearchProductById(accessToken, product).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.quantidade).to.equal(finalQuantityProduct)
                })
            })
        })
    });

    // context('Erro', () => {
    //     it('não deve permitir ter mais de um carrinho', () => {
           
    //     })
    // })


    //Limpar o carrinho a cada teste
    afterEach(() => {
        cy.apiDeleteCart(accessToken).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Registro excluído com sucesso")
        })
    })
})
