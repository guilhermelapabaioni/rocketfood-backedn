const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsDatabase() {
  const schemas = [createUsers].join('')

  sqliteConnection()
    .then(database => database.exec(schemas))
    .catch(error => console.log(error))
}

module.exports = migrationsDatabase