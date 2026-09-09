describe('PUT /usuarios da ServeRest', () => {
  const timestamp = Date.now()

  const usersToCreate = [
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

  const usersToUpdate = [
    {
      nome: 'Lucas Assis',
      email: `lucas.assis.${timestamp}@teste.com`,
      password: '123456',
      administrador: 'true'
    },
    {
      nome: 'Isaac Rafael',
      email: `isaac.rafael.${timestamp + 1}@teste.com`,
      password: '123456',
      administrador: 'true'
    },
    {
      nome: 'Yohan Luca',
      email: `yohan.luca.${timestamp + 2}@teste.com`,
      password: '123456',
      administrador: 'true'
    }
  ]

  it('cria usuários e atualiza o nome para sobrenome', () => {
    const createdIds = []

    usersToCreate.forEach((user) => {
      cy.request('POST', `${Cypress.config('baseUrl')}/usuarios`, user)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
          createdIds.push(response.body._id)
        })
    })

    cy.then(() => {
      createdIds.forEach((userId, index) => {
        const updatedUser = usersToUpdate[index]

        cy.request('PUT', `${Cypress.config('baseUrl')}/usuarios/${userId}`, updatedUser)
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso')
          })
      })
    })
  })
})
