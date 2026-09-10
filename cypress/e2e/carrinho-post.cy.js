describe('POST /carrinhos da ServeRest', () => {
  const timestamp = Date.now()

  const user = {
    nome: 'Isaac Rafael',
    email: `isaac.carrinho.${timestamp}@teste.com`,
    password: '123456',
    administrador: 'true'
  }

  const productsToCreate = [
    {
      nome: `PS5 ${timestamp}`,
      preco: 4500,
      descricao: 'Console Sony PlayStation 5',
      quantidade: 10
    },
    {
      nome: `GOD OF WAR ${timestamp}`,
      preco: 259,
      descricao: 'Jogo de ação e aventura inspirado em mitologia',
      quantidade: 12
    },
    {
      nome: `THE LAST OF US ${timestamp}`,
      preco: 219,
      descricao: 'Jogo de sobrevivência em mundo pós-apocalíptico',
      quantidade: 8
    },
    {
      nome: `WARFRAME PLATINUM ${timestamp}`,
      preco: 29,
      descricao: 'Pacote de Platinum para o jogo Warframe',
      quantidade: 40
    }
  ]

  let authToken = ''
  let productIds = {}

  before(() => {
    cy.request('POST', `${Cypress.config('baseUrl')}/usuarios`, user)
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.request('POST', `${Cypress.config('baseUrl')}/login`, {
          email: user.email,
          password: user.password
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        authToken = response.body.authorization

        productsToCreate.forEach((product) => {
          cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/produtos`,
            headers: { authorization: authToken },
            body: product
          }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.message).to.eq('Cadastro realizado com sucesso')
          })
        })
      })
      .then(() => {
        return cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}/produtos`,
          headers: { authorization: authToken }
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)

        const ps5 = response.body.produtos.find((produto) => produto.nome.includes('PS5') && produto.quantidade > 0)
        const godOfWar = response.body.produtos.find((produto) => produto.nome.includes('GOD OF WAR') && produto.quantidade > 0)
        const lastOfUs = response.body.produtos.find((produto) => produto.nome.includes('THE LAST OF US') && produto.quantidade > 0)
        const warframe = response.body.produtos.find((produto) => produto.nome.includes('WARFRAME PLATINUM') && produto.quantidade > 0)

        expect(ps5, 'PS5 should exist with stock').to.exist
        expect(godOfWar, 'God of War should exist with stock').to.exist
        expect(lastOfUs, 'The Last of Us should exist with stock').to.exist
        expect(warframe, 'Warframe Platinum should exist with stock').to.exist

        productIds = {
          ps5: ps5._id,
          godOfWar: godOfWar._id,
          lastOfUs: lastOfUs._id,
          warframe: warframe._id
        }
      })
  })

  it('cria um carrinho com PS5, God of War, The Last of Us e Warframe Platinum', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/carrinhos`,
      headers: {
        authorization: authToken
      },
      body: {
        produtos: [
          { idProduto: productIds.ps5, quantidade: 1 },
          { idProduto: productIds.godOfWar, quantidade: 1 },
          { idProduto: productIds.lastOfUs, quantidade: 1 },
          { idProduto: productIds.warframe, quantidade: 1 }
        ]
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body).to.have.property('_id')
      expect(response.body._id).to.be.a('string')
    })
  })
})
