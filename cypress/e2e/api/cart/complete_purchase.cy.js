import { faker } from '@faker-js/faker'

describe('Concluir compra do carrinho via API', () => {
    let accessToken = ''
    const cart = {

    }

    before(() => {
        cy.apiLogin().then((response) => {
            accessToken = response.body.authorization
        })
    })

    it('concluir compra com usuário sem carrinho', () => {
        cy.apiDeleteCart(accessToken).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Não foi encontrado carrinho para esse usuário")
        })
    })

    it('excluir carrinho com sucesso', () => {
        let product = {
            id : '',
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
        cy.apiDeleteCart(accessToken).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Registro excluído com sucesso")
        })
    })

})
