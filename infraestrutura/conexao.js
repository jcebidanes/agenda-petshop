const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 27306,
  user: 'root',
  password: 'root',
  database: 'agenda-petshop',
  multipleStatements: true
})

module.exports = conexao
