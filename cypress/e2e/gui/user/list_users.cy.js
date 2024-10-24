describe('Listar usuários', () => {
  beforeEach(() => {
    cy.guiLogin()
  })

  it('listar com sucesso', () => {
    // cy.get("[data-testid='listarUsuarios']").click()
    cy.visit('/admin/listarusuarios')
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/admin/listarusuarios`)
    cy.contains('Lista dos usuários').should('be.visible')
  })
})
