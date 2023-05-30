class UserRepositoryInMemory {
  users = []

  async createUser({ name, email, password, role }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      name,
      password,
      role
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email)
  }
}

module.exports = UserRepositoryInMemory