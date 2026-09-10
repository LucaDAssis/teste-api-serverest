# Plano de Teste BDD — API ServeRest

## Feature: Gestão de usuários, produtos e carrinhos

Como cliente da API ServeRest  
Quero validar os fluxos de cadastro, autenticação, manutenção de produtos e criação de carrinho  
Para garantir que a aplicação atende aos requisitos funcionais e regras de negócio.

## Contexto do projeto

Este plano foi desenvolvido com base em um projeto de automação de testes de API em Cypress, validando os principais fluxos da API ServeRest, incluindo:

- cadastro de usuários
- login com autenticação
- consulta de usuários
- atualização de usuários
- cadastro e exclusão de produtos
- criação e consulta de carrinho
- regras de negócio como autenticação obrigatória e validação de estoque

A automação foi executada com sucesso em ambiente real da API pública, cobrindo cenários de sucesso e falha.

## Background

Given que a API ServeRest está disponível em https://compassuol.serverest.dev  
And que o usuário pode criar contas, autenticar-se e consultar produtos  
And que produtos e carrinhos possuem regras de negócio específicas  
Then os testes devem validar o comportamento esperado do sistema.

## Cenários principais

### Cenário 1: cadastro de usuário com dados válidos

Given que o usuário informa nome, email e senha válidos  
When ele envia uma requisição POST para /usuarios  
Then a API deve retornar status 201  
And a mensagem “Cadastro realizado com sucesso”  
And deve retornar um _id válido.

### Cenário 2: login com usuário válido

Given que o usuário já foi cadastrado  
When ele envia uma requisição POST para /login com email e senha corretos  
Then a API deve retornar status 200  
And deve retornar um token de autorização válido.

### Cenário 3: consulta de usuários

Given que existem usuários cadastrados na base  
When o cliente envia uma requisição GET para /usuarios  
Then a API deve retornar status 200  
And deve conter a propriedade quantidade  
And deve retornar uma lista de usuários no campo usuarios.

### Cenário 4: atualização de usuário existente

Given que um usuário já foi cadastrado  
When o cliente envia uma requisição PUT para /usuarios/{_id} com novos dados  
Then a API deve retornar status 200  
And a mensagem “Registro alterado com sucesso”.

### Cenário 5: tentativa de cadastro com email duplicado

Given que já existe um usuário com determinado email  
When um novo cadastro for enviado com o mesmo email  
Then a API deve rejeitar a operação  
And deve retornar um erro de regra de negócio.

### Cenário 6: cadastro de produto com autenticação válida

Given que o usuário está autenticado  
When ele envia uma requisição POST para /produtos com nome, preço, descrição e quantidade válidos  
Then a API deve retornar status 201  
And a mensagem “Cadastro realizado com sucesso”  
And deve retornar um _id do produto.

### Cenário 7: cadastro de produto sem autenticação

Given que o usuário não possui token válido  
When ele envia uma requisição POST para /produtos  
Then a API deve retornar status 401  
And a mensagem informando que o token está ausente ou inválido.

### Cenário 8: cadastro de produto com preço inválido

Given que o usuário está autenticado  
When ele tenta cadastrar um produto com preço zero ou negativo  
Then a API deve retornar status 400  
And deve informar que o preço deve ser um número positivo.

### Cenário 9: exclusão de produto

Given que um produto foi cadastrado anteriormente  
When o cliente envia uma requisição DELETE para /produtos/{_id}  
Then a API deve retornar status 200  
And a mensagem “Registro excluído com sucesso”.

### Cenário 10: criação de carrinho com itens válidos

Given que o usuário está autenticado  
And que há produtos disponíveis em estoque  
When ele envia uma requisição POST para /carrinhos com uma lista de produtos  
Then a API deve retornar status 201  
And a mensagem “Cadastro realizado com sucesso”  
And deve criar o carrinho com sucesso.

### Cenário 11: consulta do carrinho

Given que um carrinho foi criado com itens válidos  
When o cliente envia uma requisição GET para /carrinhos/{_id}  
Then a API deve retornar status 200  
And deve retornar o identificador do carrinho  
And deve conter os itens esperados no carrinho.

### Cenário 12: tentativa de criar carrinho com produto sem estoque

Given que há um produto com quantidade insuficiente ou zero  
When o cliente tenta adicioná-lo ao carrinho  
Then a API deve retornar status 400  
And deve informar que o produto não possui quantidade suficiente.

## Cenários de borda (edge cases)

### Cenário 13: atualização com conflito de email

Given que existe um usuário cadastrado com um email específico  
When um outro usuário tenta atualizar seu email para o mesmo endereço já cadastrado  
Then a API deve retornar status 400  
And deve informar erro de conflito de dados.

### Cenário 14: deleção restrita de produto em carrinho ativo

Given que um produto já foi adicionado em um carrinho ativo  
When o cliente tenta excluir esse produto  
Then a API deve bloquear a operação  
And deve retornar erro de regra de negócio.

### Cenário 15: token mal formatado ou expirado

Given que o usuário envia um token corrompido, expirado ou mal formatado  
When ele tenta acessar um endpoint protegido  
Then a API deve retornar status 401  
And deve informar que o token é inválido ou expirado.

### Cenário 16: carrinho duplicado para o mesmo usuário

Given que o usuário já possui um carrinho ativo  
When ele tenta criar outro carrinho para o mesmo usuário  
Then a API deve impedir a criação  
And deve retornar erro de regra de negócio.

## Regras de negócio validadas

- usuário deve ser cadastrado com dados válidos
- email deve ser único
- login exige credenciais válidas
- produto exige autenticação
- preço deve ser positivo
- carrinho não pode incluir produto sem estoque
- apenas usuários autenticados podem manipular produtos e carrinhos
- não deve existir carrinho duplicado para o mesmo usuário
- ações com token inválido devem ser rejeitadas

## Critérios de aceite

O projeto será considerado concluído quando:

- todos os cenários principais de API estiverem cobertos
- autenticação for validada corretamente
- regras de negócio forem verificadas
- testes automatizados tiverem execução com sucesso no Cypress
- os resultados forem consistentes com as respostas esperadas da API

## Versão resumida para envio

Desenvolvemos um projeto de automação de testes de API utilizando Cypress e a API pública ServeRest, com foco em usuários, produtos e carrinhos. O plano de testes foi estruturado em linguagem BDD e cobriu as principais regras de negócio, como autenticação, cadastro, atualização, exclusão, consulta e validação de estoque. Além dos cenários principais, incluímos casos de borda para atualização com conflito de email, produto em carrinho ativo, token inválido e carrinho duplicado. A automação validou os fluxos de sucesso e falha esperados pela API, garantindo a cobertura funcional do sistema com evidência de execução bem-sucedida.
