const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')
const authConfig = require('../config/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {

  async create(req, res, next) {
    const { email, password } = req.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('E-mail or password incorrect.', 401)
    }

    // const passwordMatch = await compare(password, user.password)

    if (password != user.password) {
      throw new AppError('E-mail or password incorrect')
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ secret }, secret, {
      subject: String(user.id),
      expiresIn
    })

    if (user.role === 'admin') {
      const admin = user
      return res.json({ admin, token })
    } else {
      return res.json({ user, token })
    }
  }
}

module.exports = SessionsController