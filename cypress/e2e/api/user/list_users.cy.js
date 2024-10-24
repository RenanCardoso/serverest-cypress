describe('Listar usuários via API', () => {
  let accessToken = ''
  const user = {

  }

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  it('listar com sucesso', () => {
    cy.apiListUsers(accessToken, user).then((response) => {
      expect(response.status).to.equal(200)
    })
  })
})
