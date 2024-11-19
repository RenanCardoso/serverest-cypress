describe('Listar usuários', () => {
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

  it('listar com sucesso', () => {
    // cy.get("[data-testid='listarUsuarios']").click()
    cy.visit('/admin/listarusuarios')
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/listarusuarios`)
    cy.contains('Lista dos usuários').should('be.visible')
  })
})
