import { faker } from '@faker-js/faker'

describe('Logout', () => {

    it('realizar logout de usuário administrador com sucesso', () => {
        cy.guiAdminLogin()
        cy.visit(`${Cypress.config('baseUrl')}/admin/home`);

        cy.get("[data-testid='logout']").click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`)
        cy.contains('Login').should('be.visible')
    })

    it('realizar logout de usuário não administrador com sucesso', () => {
        cy.guiLogin()
        cy.visit(`${Cypress.config('baseUrl')}/home`);

        cy.get("[data-testid='logout']").click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/login`)
        cy.contains('Login').should('be.visible')
    })
})
