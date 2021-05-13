## Requisitos não funcionais
- [ ] Todas as rotas devem ser documentadas com swagger
- [ ] Todas os casos de uso devem ser testados com testes unitários 

## Requisitos Funcionais
- [ ] Cadastro de usuário
- [ ] Login na apiS
- [ ] Cadastrar restaurante
  - [ ] O restaurante deve ter um tipo de culinaria
  - [ ] Não pode haver 2 restaurante com o mesmo nome

- [ ] Cadastrar um item para o restaurante
  - [ ] Somente usuário autenticado pode criar um item
  - [ ] o item deve conter um preço
- [ ] Atualizar os dados de um item
  - [ ] Somente usuário autenticado pode atualizar um item
- [ ] Listar os restaurantes
  - [ ] Listar os restaurantes de acordo com os parametros: [Cidade, Distância, Tipo de cozinha, prato]
  - [ ] A listagem pode conter um ou mais destes parâmetros e deve trazer a junção de todos

user = {
  email,
  password,
}

restaurant = {
  name
  cnpj,
  description,
  banner_url,
  culinary,
  cep,
  nr,
  city,
  street
}

item = {
  name,
  price,
  description,
  restaurant_id,
  photo_id
}