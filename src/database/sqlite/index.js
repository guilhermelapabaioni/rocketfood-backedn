const sqlite3 = require('sqlite3');
const sqlite = require('sqlite')
const path = require('path')

// Função responsável pela criação do banco de dados
async function sqliteConnection() {
  // Aqui informamos onde o arquivo do banco de dados será criado e o driver cujo o banco de dados utilizará.
  const database = await sqlite.open({
    // Resolvendo o caminho onde o arquivo do banco de dados será criado.
    filename: path.resolve(__dirname, '..', 'database.db'),
    // Driver que o banco de dados utilizará
    driver: sqlite3.Database
  })
  return database
}

module.exports = sqliteConnection