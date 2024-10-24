const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev', // URL base da aplicação em teste
    apiUrl: 'https://serverest.dev', // URL base da API da aplicação em teste
    env: {
      hideCredentials: true, // Como boa prática, é usado este variável de teste para que o token de acesso (o qual é um dados sensível) fique protegido
      requestMode: true, // feedback visual ocorra mesmo que estejamos utilizando o comando cy.request()
      snapshotOnly: true // para que nos testes de GUI, também tenhamos feedback visual quando chamadas de API estiverem rodando
    },
    experimentalRunAllSpecs: true // para rodar todos os testes em modo interativo
  }
})
