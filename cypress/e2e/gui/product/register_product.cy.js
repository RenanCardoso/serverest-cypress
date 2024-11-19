import { faker } from '@faker-js/faker'

describe('Cadastrar produto via GUI', () => {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 20 }),
        administrator: 'true'
    }
    const options = { cacheSession: false }

    before(() => {
        cy.apiRegisterUser(user).then((response) => {
            expect(response.status).to.equal(201)
        })
    })

    beforeEach(() => {
        cy.guiAdminLogin(user.email, user.password, options)
    })

    it('cadastrar com sucesso', () => {
        let product = {
            id: '',
            name: `product ${faker.food.ingredient()}`,
            price: faker.number.int({ min: 1, max: 1000 }),
            description: faker.lorem.lines(1),
            quantity: faker.number.int({ min: 1, max: 1000 })
        }

        cy.guiRegisterProduct(product)
        cy.wait('@postAdicionarProduto').its('response.statusCode').should('eq', 201)
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/listarprodutos`)
        cy.contains('Lista dos Produtos').should('be.visible')
    })

    it.only('validar tratamento de erro ao cadastrar produto e mensagens amigáveis', () => {
        let product = undefined
        cy.guiRegisterProduct(product)
        cy.wait('@postAdicionarProduto').its('response.statusCode').should('eq', 400)
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/cadastrarprodutos`)
        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Preco é obrigatório').should('be.visible')
        cy.contains('Descricao é obrigatório').should('be.visible')
        cy.contains('Quantidade é obrigatório').should('be.visible')
    })
})
