const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

class UsersController {
  async create(req, res) {
    const { name, email, password, confirmPassword } = req.body

    const database = await sqliteConnection()

    const checkUserByEmail = await database.get('SELECT email FROM users WHERE email = (?)', [email])

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      throw new AppError('Todos os campos precisam ser preenchidos!')
    }

    if (checkUserByEmail) {
      throw new AppError('E-mail já cadastrado!')
    }

    if (password != confirmPassword) {
      throw new AppError('As senhas não coincidem!')
    }

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password])

    return res.json('User created successfully.')
  }

  async update(req, res) {
    const { id } = req.params
    const { name, email, oldPassword, newPassword } = req.body
    

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])
    const checkUserEmail = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if (checkUserEmail && checkUserEmail.id != user.id) {
      throw new AppError('E-mail already in use!')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (oldPassword && !newPassword) {
      throw new AppError('You need inform your new password.')
    }

    if (!oldPassword && newPassword) {
      throw new AppError('You need inform your old password.')
    }

    if (oldPassword && newPassword) {
      if (oldPassword !== user.password) {
        throw new AppError('Your old password is incorrect!')
      }
      user.password = newPassword
    }

    await database.run(`UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?`, [user.name, user.email, user.password, id])

    return res.json({ user })
  }

  async delete(req, res) { }

  async index(req, res) { }

  async get(req, res) { }
}

module.exports = UsersController;

