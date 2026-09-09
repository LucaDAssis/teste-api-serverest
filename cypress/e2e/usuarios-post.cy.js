describe('POST /usuarios da ServeRest', () => {
  const timestamp = Date.now()

  const users = [
    {
      nome: 'Lucas',
      email: `lucas${timestamp}@teste.com`,
      password: '123456',
      administrador: 'true'
    },
    {
      nome: 'Isaac',
      email: `isaac${timestamp + 1}@teste.com`,
      password: '123456',
      administrador: 'true'
    },
    {
      nome: 'Yohan',
      email: `yohan${timestamp + 2}@teste.com`,
      password: '123456',
      administrador: 'true'
    }
  ]

  users.forEach((user) => {
    it(`cadastra o usuário ${user.nome}`, () => {
      cy.request('POST', `${Cypress.config('baseUrl')}/usuarios`, user)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          expect(response.body).to.have.property('_id')
          expect(response.body._id).to.be.a('string')
        })
    })
  })
})
