const AppError = require('../utils/AppError')
const { hash } = require('bcryptjs')

class UserServices {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({ name, email, password, confirmPassword, role }) {
    if (!name || !email || !password || !confirmPassword) {
      throw new AppError('All fields need to be provided.')
    }

    const checkUserExists = await this.userRepository.findByEmail(email)
    if (checkUserExists) {
      throw new AppError('E-mail already exists.')
    }

    if (password != confirmPassword) {
      throw new AppError('The passwords not match.')
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!passwordRegex.test(password)) {
      throw new AppError('Your paasword must be at least 8 characters, one number and one special character.')
    }

    const hashedPassword = await hash(password, 8)

    if (role) {
      const userCreated = await this.userRepository.createUser({ name, email, password: hashedPassword, role })

      return userCreated
    } else {
      const userCreated = await this.userRepository.createUser({ name, email, password: hashedPassword, role: 'user' })

      return userCreated
    }
  }
}

module.exports = UserServices