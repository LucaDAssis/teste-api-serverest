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
    },
    {
      nome: `FIFA 25 ${timestamp}`,
      preco: 299,
      descricao: 'Jogo eletrônico de futebol EA Sports FC 25',
      quantidade: 15
    },
    {
      nome: `SPIDER-MAN 2 ${timestamp}`,
      preco: 349,
      descricao: 'Jogo de ação e aventura da Marvel',
      quantidade: 9
    },
    {
      nome: `ZELDA TOTK ${timestamp}`,
      preco: 319,
      descricao: 'Jogo de aventura e exploração para Nintendo Switch',
      quantidade: 7
    },
    {
      nome: `DARK SOULS ${timestamp}`,
      preco: 179,
      descricao: 'Jogo de RPG action para PC e consoles',
      quantidade: 11
    },
    {
      nome: `SUPER MARIO ${timestamp}`,
      preco: 249,
      descricao: 'Jogo de plataforma com o personagem Mario',
      quantidade: 13
    },
    {
      nome: `FORTNITE V-BUCKS 1000 ${timestamp}`,
      preco: 49,
      descricao: 'Pacote de V-Bucks para o jogo Fortnite',
      quantidade: 50
    },
    {
      nome: `FORTNITE V-BUCKS 2800 ${timestamp}`,
      preco: 99,
      descricao: 'Pacote premium de V-Bucks para o jogo Fortnite',
      quantidade: 30
    },
    {
      nome: `WARFRAME PLATINUM 300 ${timestamp}`,
      preco: 29,
      descricao: 'Pacote de Platinum para o jogo Warframe',
      quantidade: 40
    },
    {
      nome: `WARFRAME PLATINUM 650 ${timestamp}`,
      preco: 59,
      descricao: 'Pacote premium de Platinum para o jogo Warframe',
      quantidade: 25
    },
    {
      nome: `GEARS OF WAR ${timestamp}`,
      preco: 199,
      descricao: 'Jogo de tiro em terceira pessoa',
      quantidade: 10
    },
    {
      nome: `GOD OF WAR ${timestamp}`,
      preco: 259,
      descricao: 'Jogo de ação e aventura inspirado em mitologia',
      quantidade: 12
    },
    {
      nome: `LUIGI MANSIONS ${timestamp}`,
      preco: 169,
      descricao: 'Jogo de aventura e mistério com Luigi',
      quantidade: 9
    },
    {
      nome: `THE LAST OF US ${timestamp}`,
      preco: 219,
      descricao: 'Jogo de sobrevivência em mundo pós-apocalíptico',
      quantidade: 8
    },
    {
      nome: `HALO ${timestamp}`,
      preco: 229,
      descricao: 'Jogo de tiro em primeira pessoa com combate espacial',
      quantidade: 14
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
