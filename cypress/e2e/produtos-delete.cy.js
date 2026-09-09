describe('DELETE /produtos da ServeRest', () => {
  const timestamp = Date.now()

  const adminUser = {
    nome: `Admin Delete ${timestamp}`,
    email: `admin.delete.${timestamp}@teste.com`,
    password: '123456',
    administrador: 'true'
  }

  const productToDelete = {
    nome: `FIFA 25 ${timestamp}`,
    preco: 299,
    descricao: 'Jogo eletrônico de futebol EA Sports FC 25',
    quantidade: 15
  }

  let authToken = ''
  let productId = ''

  before(() => {
    cy.request('POST', `${Cypress.config('baseUrl')}/usuarios`, adminUser)
      .then((response) => {
        expect(response.status).to.eq(201)

        return cy.request('POST', `${Cypress.config('baseUrl')}/login`, {
          email: adminUser.email,
          password: adminUser.password
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('authorization')
        authToken = response.body.authorization

        return cy.request({
          method: 'POST',
          url: `${Cypress.config('baseUrl')}/produtos`,
          headers: {
            authorization: authToken
          },
          body: productToDelete
        })
      })
      .then((response) => {
        expect(response.status).to.eq(201)
        productId = response.body._id
      })
  })

  it('deleta o produto FIFA 25', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.config('baseUrl')}/produtos/${productId}`,
      headers: {
        authorization: authToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Registro excluído com sucesso')
    })
  })
})
