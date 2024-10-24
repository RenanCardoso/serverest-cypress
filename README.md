# Testando aplicação ServeRest com Cypress

Olá, seja muito bem-vindo(a)!

Fiz este projeto de exemplo para demonstração de testes automatizados de GUI e API escritos com [Cypress](https://cypress.io) utilizando a aplicação [ServeRest](https://front.serverest.dev) que foi desenvolvida e é mantida por [Paulo Gonçalves](https://github.com/PauloGoncalvesBH).


## Pré-requisitos

Para baixar e rodar este projeto, você precisará das seguintes tecnologias instaladas em seu computador:

- [git](https://git-scm.com/downloads) (usei a versão `2.47.0` enquanto escrevia este documento)
- [Node.js](https://nodejs.org/en/) (usei a versão `v20.17.0` enquanto escrevia este documento)
- npm (usei a versão `10.8.2` enquanto escrevia este documento)

**Obs:** Ao instalar o Node.js, o npm é instalado automaticamente.

## Instalação

Após clonar o projeto, execute o comando `npm install` (ou `npm i` para a versão curta) para instalar as dependências de desenvolvimento.

## Consumindo o ServeRest

O ServeRest está disponível de forma [online](https://serverest.dev), no [npm](https://www.npmjs.com/package/serverest) e no [docker](https://hub.docker.com/r/paulogoncalvesbh/serverest/).

Todas essas opções possuem as mesmas rotas, regras, dados pré-cadastrados e documentação. Escolha a melhor opção para você.

No ambiente online os dados cadastrados são removidos diariamente, enquanto que no local basta reiniciar o ServeRest.

> Para facilitar a execução do projeto por terceiros, ele foi configurado por padrão para utilizar a aplicação de forma online. Porém, pode-se utilizar a opção de ambiente local caso precise que os dados não sejam alterados por outro usuário.

Acesse **<https://serverest.dev>** para visualizar a documentação e as rotas disponíveis.

## Executando os testes

Neste projeto, você pode rodar os testes em modo interativo ou modo [_headless_](https://docs.cypress.io/guides/guides/command-line).

### Modo _headless_

Execute o comando `npm test` (ou `npm t` para a versão curta) para rodar a   todos os testes em modo [_headless_](https://docs.cypress.io/guides/guides/command-line).


### Modo interativo

Execute o comando `npm run cy:open` para abrir a Cypress App e rodar os testes.

### Análise estática

Para análise estática de código estou utilizando a biblioteca [_eslint-plugin-cypress_](https://www.npmjs.com/package/eslint-plugin-cypress).
Para realizar a análise estática de código, basta rodar o comando `npm run lint` ou execute diretamente o comando `npm run lint:fix` para realizar a análise e corrigir automaticamente os problemas encontrados.
___

Feito com ☕ e ❤️ por [Renan](https://github.com/RenanCardoso).