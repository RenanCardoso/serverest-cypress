import { faker } from '@faker-js/faker'

describe('Logout', () => {

    it('realizar logout de usuário administrador com sucesso', () => {
        let user = {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 20 }),
            administrator: 'true'
        }
        const options = { cacheSession: false }
        cy.apiRegisterUser(user).then((response) => {
            expect(response.status).to.equal(201)
        })
        cy.guiAdminLogin(user.email, user.password, options)

        cy.get("[data-testid='logout']").click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`)
        cy.contains('Login').should('be.visible')
    })

    it('realizar logout de usuário não administrador com sucesso', () => {
        let user = {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: faker.internet.password({ length: 20 }),
            administrator: 'false'
        }
        const options = { cacheSession: false }
        cy.apiRegisterUser(user).then((response) => {
            expect(response.status).to.equal(201)
        })
        cy.guiAdminLogin(user.email, user.password, options)

        cy.get("[data-testid='logout']").click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`)
        cy.contains('Login').should('be.visible')
    })
})
