describe('GET /usuarios da ServeRest', () => {
  it('retorna status 200 e lista de usuários', () => {
    cy.request('GET', `${Cypress.config('baseUrl')}/usuarios`)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('quantidade')
        expect(response.body).to.have.property('usuarios')
        expect(response.body.usuarios).to.be.an('array')
        expect(response.body.usuarios.length).to.be.greaterThan(0)

        const primeiroUsuario = response.body.usuarios[0]
        expect(primeiroUsuario).to.have.property('nome')
        expect(primeiroUsuario).to.have.property('email')
        expect(primeiroUsuario).to.have.property('password')
        expect(primeiroUsuario).to.have.property('administrador')
        expect(primeiroUsuario).to.have.property('_id')
      })
  })
})
