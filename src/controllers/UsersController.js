const UserRepository = require('../repositories/UserRepository')
const UserServices = require('../services/UserServices')

class UsersController {
  async create(request, response) {
    const { name, email, password, confirmPassword, role } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserServices(userRepository)
    await userCreateService.createUser({ name, email, password, confirmPassword, role })

    return response.status(201).json()
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
      const checkOldPassword = await compare(oldPassword, user.password)
      if (!checkOldPassword) {
        throw new AppError('Your old password is incorrect!')
      }
      user.password = await hash(newPassword, 8)
    }

    await database.run(`UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?`, [user.name, user.email, user.password, id])

    return res.json({ user })
  }

  async delete(req, res) { }

  async index(req, res) { }

  async get(req, res) { }
}

module.exports = UsersController;

