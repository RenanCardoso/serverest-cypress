import { faker } from '@faker-js/faker'

describe('Cadastrar usuário via API', () => {
  let accessToken = ''
  let user = {}

  before(() => {
    cy.apiLogin().then((response) => {
      accessToken = response.body.authorization
    })
  })

  beforeEach(() => {
    user = {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 20 }),
      administrator: null
    }
  });

  context('cadastrar com sucesso', () => {

    it('usuário administrador', () => {
      user.administrator = 'true' 
      cy.apiRegisterUser(accessToken, user).then((response) => {
        expect(response.status).to.equal(201)
      })
    })

    it('usuário não administrador', () => {
      user.administrator = 'false' 
      cy.apiRegisterUser(accessToken, user).then((response) => {
        expect(response.status).to.equal(201)
      })
    })

  })

  context('falha ao cadastrar', () => {

    context('inerente ao tipo de usuário', () => {
      //Cenário com erro em produção, pois está permitindo fazer a requisição mesmo sem o token de acesso
      it.skip('requisição não autorizada por falta do token de acesso', () => {
        accessToken = undefined
        cy.log('token: ' + accessToken)
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(401)
        })
      })

      it('cadastrar usuário com flag administrador não preenchida', () => {
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.administrador).to.equal("administrador deve ser 'true' ou 'false'")
        })
      })
    })

    context('usuário administrador', () => {
      beforeEach(() => {
        // Configurar administrador para todos os testes
        user.administrator = 'true';
      });

      it('cadastrar usuário com e-mail já utilizado', () => {
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal("Cadastro realizado com sucesso")
        })
        const newUser = {
          id: '',
          name: faker.person.fullName(),
          email: user.email,
          password: faker.internet.password({ length: 20 }),
          administrator: 'true'
        }
        cy.apiRegisterUser(accessToken, newUser).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal("Este email já está sendo usado")
        })
      })

      it('cadastrar usuário com nome não preenchido', () => {
        user.name = '' 
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.nome).to.equal("nome não pode ficar em branco")
        })
      })

      it('cadastrar usuário com e-mail não preenchido', () => {
        user.email = '' 
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.email).to.equal("email não pode ficar em branco")
        })
      })

      it('cadastrar usuário com senha não preenchida', () => {
        user.password = '' 
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.password).to.equal("password não pode ficar em branco")
        })
      })
    })

    context('usuário não administrador', () => {
      beforeEach(() => {
        // Configurar não administrador para todos os testes
        user.administrator = 'false';
      });

      it('cadastrar usuário com e-mail já utilizado', () => {
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal("Cadastro realizado com sucesso")
        })
        const newUser = {
          id: '',
          name: faker.person.fullName(),
          email: user.email,
          password: faker.internet.password({ length: 20 }),
          administrator: 'true'
        }
        cy.apiRegisterUser(accessToken, newUser).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal("Este email já está sendo usado")
        })
      })

      it('cadastrar usuário com nome não preenchido', () => {
        user.name = '' 
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.nome).to.equal("nome não pode ficar em branco")
        })
      })

      it('cadastrar usuário com e-mail não preenchido', () => {
        user.email = '' 
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.email).to.equal("email não pode ficar em branco")
        })
      })

      it('cadastrar usuário com senha não preenchida', () => {
        user.password = '' 
        cy.apiRegisterUser(accessToken, user).then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.password).to.equal("password não pode ficar em branco")
        })
      })
    })
  })


})
