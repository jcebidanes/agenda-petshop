const executaQuery = require('../database/queries')

class Pet {
  lista() {
    const sql = `
    SELECT 
      p.id as petId
      , p.nome as petNome
      , p.donoId as petDonoId
      , p.tipo as petiTipo
      , p.observacoes as petObservacoes
      , c.id as donoId
      , c.nome as donoNome
      , c.cpf as donoCpf 
    FROM Pets p 
    INNER JOIN Clientes c ON p.donoId = c.id
    `

    return executaQuery(sql).then(pets =>
      pets.map( pet => ({
        id: pet.petId,
        nome: pet.petNome,
        tipo: pet.petTipo,
        observacoes: pet.petObeservacoes,
        dono: {
          id: pet.donoId,
          nome: pet.donoNome,
          cpf: pet.donoCpf
        }
      })))
  }

  buscaPorId(id) {
    const sql = `
    SELECT 
      p.id as petId
      , p.nome as petNome
      , p.donoId as petDonoId
      , p.tipo as petiTipo
      , p.observacoes as petObservacoes
      , c.id as donoId
      , c.nome as donoNome
      , c.cpf as donoCpf 
    FROM Pets p 
    INNER JOIN Clientes c ON p.donoId = c.id
    WHERE p.id=${parseInt(id)}
    `
    return executaQuery(sql).then(pet =>
      ({
        id: pet[0].petId,
        nome: pet[0].petNome,
        tipo: pet[0].petTipo,
        observacoes: pet[0].petObeservacoes,
        dono: {
          id: pet[0].donoId,
          nome: pet[0].donoNome,
          cpf: pet[0].donoCpf
        }
      }))
  }

  adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item
    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`

    return executaQuery(sql).then( resposta =>
      ({
        id: resposta.insertId, 
        nome, 
        tipo,
        observacoes
      })  
    )
  }

  atualiza(novoItem, id) {
    const { nome, dono, tipo, observacoes } = novoItem

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${dono}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`

    executaQuery(sql)
  }

  deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    executaQuery(sql)
  }
}

module.exports = new Pet
