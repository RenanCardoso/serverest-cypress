import 'cypress-file-upload'
import { faker } from '@faker-js/faker'

Cypress.Commands.add(
  'guiAdminLogin',
  (
    user = Cypress.env('adminUserEmail'),
    password = Cypress.env('adminUserPassword'),
    { cacheSession = true } = {}
  ) => {
    const verifyUserExist = () => {
      return cy.request({
        method: 'POST',
        url: `${Cypress.config('apiUrl')}/login`,
        body: { email: user, password },
        failOnStatusCode: false // Evita falhas automáticas em caso de status code diferente de 2xx
      });
    };

    const performLogin = (email, password) => {
      cy.visit(`${Cypress.config('baseUrl')}/login`);
      cy.get("[data-testid='email']").type(email);
      cy.get("[data-testid='senha']").type(password, { log: false });

      cy.intercept('POST', '**/login').as('postLogin');
      cy.get("[data-testid='entrar']").click();
      cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    };

    const validateSession = () => {
      cy.visit(`${Cypress.config('baseUrl')}/admin/home`);
      cy.location('pathname', { timeout: 1000 }).should('not.eq', '/login');
    };

    const options = {
      cacheAcrossSpecs: true,
      validate: validateSession
    };

    verifyUserExist().then(response => {
      if (response.status !== 200) {
        const newUser = {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: faker.internet.password({ length: 20 }),
          administrator: 'true'
        };

        cy.apiRegisterUser(newUser).then(() => {
          performLogin(newUser.email, newUser.password);
        });
      } else {
        if (cacheSession) {
          cy.session(user, () => performLogin(user, password), options);
        } else {
          performLogin(user, password);
        }
      }
    });
  }
);

Cypress.Commands.add(
  'guiLogin',
  (
    user = Cypress.env('userEmail'),
    password = Cypress.env('userPassword'),
    { cacheSession = true } = {}
  ) => {
    const verifyUserExist = () => {
      return cy.request({
        method: 'POST',
        url: `${Cypress.config('apiUrl')}/login`,
        body: { email: user, password },
        failOnStatusCode: false // Evita falhas automáticas em caso de status code diferente de 2xx
      });
    };

    const performLogin = (email, password) => {
      cy.visit(`${Cypress.config('baseUrl')}/login`);
      cy.get("[data-testid='email']").type(email);
      cy.get("[data-testid='senha']").type(password, { log: false });

      cy.intercept('POST', '**/login').as('postLogin');
      cy.get("[data-testid='entrar']").click();
      cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
    };

    const validateSession = () => {
      cy.visit(`${Cypress.config('baseUrl')}/home`);
      cy.location('pathname', { timeout: 1000 }).should('not.eq', '/login');
    };

    const options = {
      cacheAcrossSpecs: true,
      validate: validateSession
    };

    verifyUserExist().then(response => {
      if (response.status !== 200) {
        const newUser = {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: faker.internet.password({ length: 20 }),
          administrator: 'false'
        };

        cy.apiRegisterUser(newUser).then(() => {
          performLogin(newUser.email, newUser.password);
        });
      } else {
        if (cacheSession) {
          cy.session(user, () => performLogin(user, password), options);
        } else {
          performLogin(user, password);
        }
      }
    });
  }
);

Cypress.Commands.add('guiRegisterUserAdminArea', (user) => {
  cy.visit(`${Cypress.config('baseUrl')}/admin/cadastrarusuarios`)

  if (user) {
    cy.get('[data-testid="nome"]').type(user.name)
    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)
    if (user.administrator) {
      cy.get('[data-testid="checkbox"]').check()
    }
  }
  cy.intercept('POST', '**/usuarios').as('postAdicionarUsuario')
  cy.get('[data-testid="cadastrarUsuario"]').click()
})

Cypress.Commands.add('guiRegisterUserPublicArea', (user) => {
  cy.visit(`${Cypress.config('baseUrl')}/cadastrarusuarios`)

  if (user) {
    cy.get('[data-testid="nome"]').type(user.name)
    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)
    if (user.administrator) {
      cy.get('[data-testid="checkbox"]').check()
    }
  }
  cy.intercept('POST', '**/usuarios').as('postAdicionarUsuario')
  cy.get('[data-testid="cadastrar"]').click()
})

/** ** Produtos ****/
Cypress.Commands.add('guiRegisterProduct', (product) => {
  cy.visit(`${Cypress.config('baseUrl')}/admin/cadastrarprodutos`)

  if (product) {
    cy.get('[data-testid="nome"]').type(product.name)
    cy.get('[data-testid="preco"]').type(product.price)
    cy.get('[data-testid="descricao"]').type(product.description)
    cy.get('[data-testid="quantity"]').type(product.quantity)
    cy.get('[data-testid="imagem"]').as('fileInput').attachFile('teste.jpeg')
  }
  cy.intercept('POST', '**/produtos').as('postAdicionarProduto')
  cy.get('[data-testid="cadastarProdutos"]').click()
})

Cypress.Commands.add('guiSearchProduct', (product) => {

  cy.get('[data-testid="pesquisar"]').type(product.name)

  cy.intercept({
    method: 'GET',
    pathname: '**/produtos',
    query: {
      nome: product.name
    }
  }).as('getBuscarProduto')

  cy.get('[data-testid="botaoPesquisar"]').click()
})