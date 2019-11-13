const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente')
const Pets = new Operacoes('pet') 

const resolvers = {
  Query: {
    status: () => "rodando....",
    clientes: () => Clientes.lista(),
    cliente: (root, params) => Clientes.buscaPorId( params.id ),
    pets: () => Pets.lista(),
    pet: (root, params) => Pets.buscaPorId( params.id )
    
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params),
    atualizarCliente: (root, params) => Clientes.atualiza(params),
    deletarCliente: (root, params) => Clientes.deleta( params.id ),
    adicionarPet: (root, params) => Pets.adiciona(params)
  }
}

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})
servidor.start(() => console.log('Servidor rodando ....'))