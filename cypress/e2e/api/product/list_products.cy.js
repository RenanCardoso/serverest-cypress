describe('Listar produtos via API', () => {
  let accessToken = ''
  const product = {

  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  it('listar com sucesso', () => {
    cy.apiListProducts(accessToken, product).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
