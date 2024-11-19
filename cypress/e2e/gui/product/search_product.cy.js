import { faker } from '@faker-js/faker'

describe('Buscar produto via GUI', () => {
    let accessToken = ''
    let product = {
        id: '',
        name: `product ${faker.food.ingredient()}`,
        price: faker.number.int({ min: 1, max: 1000 }),
        description: faker.lorem.lines(1),
        quantity: faker.number.int({ min: 1, max: 1000 })
    }
    const options = { cacheSession: false }
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 20 }),
        administrator: 'false'
    }
    before(() => {
        cy.apiLogin().then((response) => {
            accessToken = response.body.authorization
            cy.apiRegisterProduct(accessToken, product).then((response) => {
                expect(response.status).to.equal(201)
                product.id = response.body._id
            })
        })

        cy.apiRegisterUser(user).then((response) => {
            expect(response.status).to.equal(201)
        })

    })

    context('usuário não administrador', () => {

        beforeEach(() => {
            cy.guiAdminLogin(user.email, user.password, options)
        })

        it('buscar produto com sucesso', () => {
            cy.guiSearchProduct(product)
            cy.wait('@getBuscarProduto').its('response.statusCode').should('eq', 200)
        })
    })
})
