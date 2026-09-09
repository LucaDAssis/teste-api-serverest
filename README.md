# Testes de API com Cypress e ServeRest

Este projeto foi desenvolvido para automatizar testes de API utilizando Cypress e a API pública ServeRest.

O objetivo principal é demonstrar como validar requisições HTTP, verificar respostas da API e garantir que o comportamento esperado dos endpoints seja atendido de forma confiável e reprodutível.

## Visão geral

A API da ServeRest oferece endpoints para manipulação de usuários, produtos e carrinhos. Neste projeto, o foco inicial está na validação dos endpoints de usuários, com testes de leitura e criação.

A automação foi implementada em JavaScript, com Cypress, permitindo execução direta no terminal e integração fácil em pipelines de CI/CD.

## Tecnologias utilizadas

- Node.js
- Cypress
- JavaScript
- API pública ServeRest

## Estrutura do projeto

```text
testeApiTestServer/
├── cypress/
│   └── e2e/
│       ├── usuarios-get.cy.js
│       └── usuarios-post.cy.js
├── cypress.config.js
├── package.json
├── README.md
└── .gitignore
```

## Objetivo dos testes

Os testes implementados verificam:

- retorno HTTP correto
- estrutura da resposta JSON
- presença das chaves esperadas
- criação bem-sucedida de usuários
- validação do payload enviado

## Casos de teste implementados

### GET /usuarios

Valida que a API:

- responde com status 200
- retorna a propriedade `quantidade`
- retorna a propriedade `usuarios`
- entrega um array com dados válidos
- contém campos como `nome`, `email`, `password`, `administrador` e `_id`

### POST /usuarios

Valida que a API:

- aceita dados de cadastro válidos
- responde com status 201
- retorna a mensagem `Cadastro realizado com sucesso`
- fornece um identificador único (`_id`)

## Como executar

Antes de iniciar, certifique-se de que o Node.js e o npm estejam instalados e acessíveis no terminal.

### 1. Instalar dependências

```powershell
$env:Path += ";C:\Program Files\nodejs"
cd "C:\Projetos\testecomIAgenerativa\testeApiTestServer"
npm install
```

### 2. Executar os testes

```powershell
npx cypress run
```

Ou, para rodar um arquivo específico:

```powershell
npx cypress run --spec "cypress/e2e/usuarios-get.cy.js"
```

### 3. Abrir a interface do Cypress

```powershell
npx cypress open
```

## Observações

- Este projeto foi criado para fins de estudo e demonstração.
- O foco principal é o uso de testes automatizados de API com Cypress.
- A API da ServeRest é pública e pode ser consumida em ambiente de testes para validação de comportamento.

## Benefícios

- redução de erros manuais
- maior confiabilidade em integrações
- validação contínua do comportamento da API
- facilidade de automação em pipelines de CI/CD

## Conclusão

Este projeto demonstra uma abordagem prática de automação de testes de API utilizando Cypress, com foco em robustez, clareza e facilidade de execução. Ele pode ser utilizado como base para testes mais complexos, incluindo cenários de validação, criação, atualização e exclusão de dados.

## Autor

Lucas Da Silva Assis
