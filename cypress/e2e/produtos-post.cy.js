describe('POST /produtos da ServeRest', () => {
  const timestamp = Date.now()

  const adminUser = {
    nome: `Admin Produtos ${timestamp}`,
    email: `admin.produtos.${timestamp}@teste.com`,
    password: '123456',
    administrador: 'true'
  }

  const products = [
    {
      nome: `PS5 ${timestamp}`,
      preco: 4500,
      descricao: 'Console Sony PlayStation 5',
      quantidade: 10
    },
    {
      nome: `NINTENDO SWITCH ${timestamp}`,
      preco: 2800,
      descricao: 'Console Nintendo Switch',
      quantidade: 8
    },
    {
      nome: `XBOX SERIES X/S ${timestamp}`,
      preco: 4200,
      descricao: 'Console Microsoft Xbox Series X/S',
      quantidade: 12
    }
  ]

  let authToken = ''

  before(() => {
    cy.request('POST', `${Cypress.config('baseUrl')}/usuarios`, adminUser)
      .then((response) => {
        expect(response.status).to.eq(201)
      })

    cy.request('POST', `${Cypress.config('baseUrl')}/login`, {
      email: adminUser.email,
      password: adminUser.password
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      authToken = response.body.authorization
    })
  })

  products.forEach((product) => {
    it(`cadastra o produto ${product.nome}`, () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}/produtos`,
        headers: {
          authorization: authToken
        },
        body: product
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id')
        expect(response.body._id).to.be.a('string')
      })
    })
  })
})
