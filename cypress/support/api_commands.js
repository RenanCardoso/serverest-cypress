Cypress.Commands.add('apiLogin', (userEmail, userPassword) => {
  if (!userEmail && !userPassword) {
    userEmail = Cypress.env('userEmail')
    userPassword = Cypress.env('userPassword')
  }
  return cy.request({
    method: 'POST',
    url: `${Cypress.config('apiUrl')}/login`,
    body: {
      email: userEmail,
      password: userPassword
    }
  })
})

/** ** Produtos ****/
Cypress.Commands.add('apiRegisterProduct', (accessToken, product) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('apiUrl')}/produtos`,
    body: {
      nome: product.name,
      preco: product.price,
      descricao: product.description,
      quantidade: product.quantity
    },
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiListProducts', (accessToken, product) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('apiUrl')}/produtos`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiSearchProductById', (accessToken, product) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('apiUrl')}/produtos/${product.id}`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiDeleteProductById', (accessToken, product) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.config('apiUrl')}/produtos/${product.id}`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiEditProductById', (accessToken, product, newProduct) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.config('apiUrl')}/produtos/${product.id}`,
    body: {
      nome: newProduct.name,
      preco: newProduct.price,
      descricao: newProduct.description,
      quantidade: newProduct.quantity
    },
    headers: { Authorization: accessToken }
  })
})

/** ** Usuários ****/
Cypress.Commands.add('apiRegisterUser', (accessToken, user) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('apiUrl')}/usuarios`,
    body: {
      nome: user.name,
      email: user.email,
      password: user.password,
      administrador: user.administrator
    },
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiListUsers', (accessToken, user) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('apiUrl')}/usuarios`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiDeleteUserById', (accessToken, user) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.config('apiUrl')}/produtos/${user.id}`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiSearchUserById', (accessToken, user) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.config('apiUrl')}/usuarios/${user.id}`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('apiEditUserById', (accessToken, user, newUser) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.config('apiUrl')}/usuarios/${user.id}`,
    body: {
      nome: newUser.name,
      email: newUser.email,
      password: newUser.password,
      administrador: newUser.administrator
    },
    headers: { Authorization: accessToken }
  })
})
