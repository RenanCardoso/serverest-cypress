import { faker } from '@faker-js/faker'

describe('Cadastrar usuário via GUI', () => {

  context('área logada', () => {

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

    it('cadastrar usuário administrador com sucesso', () => {
      let user = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 20 }),
        administrator: true
      }
      cy.guiRegisterUserAdminArea(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 201)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/listarusuarios`)
      cy.contains(user.name).should('be.visible')
      cy.contains(user.email).should('be.visible')
    })

    it('cadastrar usuário não administrador com sucesso', () => {
      let user = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 20 }),
        administrator: false
      }
      cy.guiRegisterUserAdminArea(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 201)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/listarusuarios`)
      cy.contains(user.name).should('be.visible')
      cy.contains(user.email).should('be.visible')
    })

    it('validar tratamento de erro ao cadastrar usuário e mensagens amigáveis', () => {
      let user = undefined
      cy.guiRegisterUserAdminArea(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 400)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/cadastrarusuarios`)
      cy.contains('Nome é obrigatório').should('be.visible')
      cy.contains('Email é obrigatório').should('be.visible')
      cy.contains('Password é obrigatório').should('be.visible')
    })
  })

  context('área pública', () => {

    it('cadastrar usuário administrador com sucesso', () => {
      let user = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 20 }),
        administrator: true
      }
      cy.guiRegisterUserPublicArea(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 201)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/home`)
    })

    it('cadastrar usuário não administrador com sucesso', () => {
      let user = {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password({ length: 20 }),
        administrator: false
      }
      cy.guiRegisterUserPublicArea(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 201)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/home`)
    })

    it('validar tratamento de erro ao cadastrar usuário e mensagens amigáveis', () => {
      let user = undefined
      cy.guiRegisterUserPublicArea(user)
      cy.wait('@postAdicionarUsuario').its('response.statusCode').should('eq', 400)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/cadastrarusuarios`)
      cy.contains('Nome é obrigatório').should('be.visible')
      cy.contains('Email é obrigatório').should('be.visible')
      cy.contains('Password é obrigatório').should('be.visible')
    })
  })
})
