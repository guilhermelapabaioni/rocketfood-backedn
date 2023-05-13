const UserRepository = require('../repositories/UserRepository')
const SessionServices = require('../services/SessionServices')

class SessionsController {
  async create(request, response, next) {
    const { email, password } = request.body

    const userRepository = new UserRepository()
    const sessionServices = new SessionServices(userRepository)

    const user = await sessionServices.create({ email, password })


    return response.status(200).json({ ...user })
  }
}

module.exports = SessionsController