const AppError = require('../utils/AppError')
const { compare } = require("bcryptjs");
const authConfig = require('../config/auth')
const { sign } = require("jsonwebtoken");

class SessionServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create({ email, password }) {
    if (!email || !password) {
      throw new AppError('Please enter a valid email and password.')
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail or password is incorrect.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('E-mail or password is incorrect.')
    }

    const { secret, expiresIn } = authConfig.jwt
    console.log(secret);
    const token = sign({user_id: user.id}, secret, {
      subject: String(user.id),
      expiresIn
    })

    if (user.role === 'admin') {
      const admin = user;
      return { admin, token }
    } else {
      return { user, token }
    }
  }
}

module.exports = SessionServices;