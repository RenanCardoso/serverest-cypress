describe('Listar carrinhos via API', () => {
    let accessToken = ''
    const cart = {
  
    }
  
    before(() => {
      cy.apiLogin().then((response) => {
        accessToken = response.body.authorization
      })
    })
  
    it('listar com sucesso', () => {
      cy.apiListCarts(accessToken, cart).then((response) => {
        expect(response.status).to.equal(200)
      })
    })
  })
  