const sqliteConnection = require('../database/sqlite/index')

class UserRepository {

  async findByEmail(email) {
    // Fazendo a conexão com o banco de dados sqlite.
    const database = await sqliteConnection()
    // Buscando o usuário cujo o e-mail foi informado.
    const user = await database.get('SELECT email FROM users WHERE email = (?)', [email])
    // Retornando o usuário cujo o e-mail foi informado.
    return user
  }

  async findById(user_id) {
    // Fazendo a conexão com o banco de dados sqlite.
    const database = await sqliteConnection()
    // Buscando o usuário cujo o ID foi informado.
    const user = await database.get('SELECT id FROM users WHERE id = (?)', [user_id])
    // Retornando o usuário cujo o ID foi informado.
    return user
  }

  async createUser({ name, email, password, role }) {
    const database = await sqliteConnection()

    const user = await database.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role])

    return user
  }
}

module.exports = UserRepository