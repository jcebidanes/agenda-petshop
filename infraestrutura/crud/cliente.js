const executaQuery = require('../database/queries')
const _ = require('lodash');

class Cliente {
  lista() {
    const sql = 'SELECT * FROM Clientes; SELECT * FROM Pets';

    return executaQuery(sql).then(dados => {
      const clientes = dados[0];
      const pets = dados[1];

      return clientes.map(cliente => {
        const petsCliente = pets.filter(pet => pet.donoId === cliente.id)

        return ({
            ...cliente,
            pets: petsCliente
        })
      })
    });
  }



  // lista() {
  //   const sql = `
  //     SELECT 
  //       p.id as petId
  //       , p.nome as petNome
  //       , p.donoId as petDonoId
  //       , p.tipo as petTipo
  //       , p.observacoes as petObservacoes
  //       , c.id as donoId
  //       , c.nome as donoNome
  //       , c.cpf as donoCpf 
  //     FROM Clientes c 
  //     LEFT JOIN Pets p ON p.donoId = c.id
  //   `
  //   return executaQuery(sql).then( results => {
  //     const clientes = _.groupBy(results, "donoId");
  //     const keys = Object.keys(clientes);
  //     const donos = [];

  //     // Mount Client
  //     keys.map(key =>{
  //       let client = clientes[key][0];
  //       donos.push({
  //         id: client.donoId,
  //         nome: client.donoNome,
  //         cpf: client.donoCpf,
  //         pets: []
  //       })
  //     })

  //     return donos.map(client => {
  //       const petsClient = results.filter(row => row.petDonoId === client.id);
  //       // Mount pets
  //       petsClient.map(pet => {
  //         client.pets.push({
  //           id: pet.petId,
  //           nome: pet.petNome,
  //           tipo: pet.petTipo,
  //           observacoes: pet.petObservacoes,
  //           dono: client
  //         })
  //       })

  //      return client;
  //     })
    
  //   })
  // }

  buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}`

    return executaQuery(sql).then( clientes => clientes[0])
  }

  adiciona(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql).then( resposta =>
      ({
        id: resposta.insertId, 
        nome, 
        cpf
      })  
    )
  }

  atualiza(novoItem) {
    const { id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql).then( resposta =>
      (novoItem)  
    )
  }

  deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql).then(()=> id)
  }
}

module.exports = new Cliente
