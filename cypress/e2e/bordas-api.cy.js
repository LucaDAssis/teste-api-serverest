describe('Cenários de borda da API ServeRest', () => {
  const baseUrl = Cypress.config('baseUrl')
  const timestamp = Date.now()

  it('retorna erro ao cadastrar usuário com email duplicado', () => {
    const user = {
      nome: 'Usuário Duplicado',
      email: `duplicado.${timestamp}@teste.com`,
      password: '123456',
      administrador: 'true'
    }

    cy.request('POST', `${baseUrl}/usuarios`, user)
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')

        return cy.request({
          method: 'POST',
          url: `${baseUrl}/usuarios`,
          failOnStatusCode: false,
          body: user
        })
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message.toLowerCase()).to.match(/email|já está sendo usado|já cadastrado/i)
      })
  })

  it('retorna 401 ao usar token inválido em endpoint protegido', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      headers: {
        authorization: 'token-invalido'
      },
      body: {
        nome: `Produto Token Inválido ${Date.now()}`,
        preco: 100,
        descricao: 'Produto para validar autenticação inválida',
        quantidade: 5
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message')
      expect(response.body.message.toLowerCase()).to.match(/token|acesso|inválido|expirado|não autorizado/i)
    })
  })

  it('bloqueia criação de segundo carrinho para o mesmo usuário', () => {
    const user = {
      nome: `Usuário Carrinho ${timestamp}`,
      email: `carrinho.duplicado.${timestamp}@teste.com`,
      password: '123456',
      administrador: 'true'
    }

    let authToken = ''
    let productId = ''

    cy.request('POST', `${baseUrl}/usuarios`, user)
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.request('POST', `${baseUrl}/login`, {
          email: user.email,
          password: user.password
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        authToken = response.body.authorization

        return cy.request({
          method: 'GET',
          url: `${baseUrl}/produtos`,
          headers: { authorization: authToken }
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)

        const produto = response.body.produtos.find((item) => item.quantidade > 0)
        expect(produto, 'deve existir ao menos um produto em estoque').to.exist
        productId = produto._id

        return cy.request({
          method: 'POST',
          url: `${baseUrl}/carrinhos`,
          headers: { authorization: authToken },
          body: {
            produtos: [{ idProduto: productId, quantidade: 1 }]
          }
        })
      })
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.request({
          method: 'POST',
          url: `${baseUrl}/carrinhos`,
          headers: { authorization: authToken },
          body: {
            produtos: [{ idProduto: productId, quantidade: 1 }]
          },
          failOnStatusCode: false
        })
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message.toLowerCase()).to.match(/carrinho|usuário|já existe|ativo/i)
      })
  })

  it('bloqueia exclusão de produto que está em carrinho ativo', () => {
    const user = {
      nome: `Usuário Produto Carrinho ${timestamp}`,
      email: `produto.carrinho.${timestamp}@teste.com`,
      password: '123456',
      administrador: 'true'
    }

    const product = {
      nome: `Produto Em Carrinho ${timestamp}`,
      preco: 199,
      descricao: 'Produto de teste para cenário de exclusão proibida',
      quantidade: 10
    }

    let authToken = ''
    let productId = ''

    cy.request('POST', `${baseUrl}/usuarios`, user)
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.request('POST', `${baseUrl}/login`, {
          email: user.email,
          password: user.password
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        authToken = response.body.authorization

        return cy.request({
          method: 'POST',
          url: `${baseUrl}/produtos`,
          headers: { authorization: authToken },
          body: product
        })
      })
      .then((response) => {
        expect(response.status).to.eq(201)
        productId = response.body._id

        return cy.request({
          method: 'POST',
          url: `${baseUrl}/carrinhos`,
          headers: { authorization: authToken },
          body: {
            produtos: [{ idProduto: productId, quantidade: 1 }]
          }
        })
      })
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.request({
          method: 'DELETE',
          url: `${baseUrl}/produtos/${productId}`,
          headers: { authorization: authToken },
          failOnStatusCode: false
        })
      })
      .then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message.toLowerCase()).to.match(/produto|carrinho|excluir|permitido/i)
      })
  })
})
