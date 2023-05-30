const UserServices = require('../services/UserServices')
const UserRepositoryInMemory = require('./UserRepositoryInMemory')
const AppError = require('../utils/AppError')

describe('UserServiceCreate', () => {
  let userRepositoryInMemory = new UserRepositoryInMemory()
  let userServices = new UserServices()

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userServices = new UserServices(userRepositoryInMemory)
  })

  it("user should be created", async function () {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "Ryumeialua1@",
      confirmPassword: "Ryumeialua1@",
      role: "admin"
    }

    const userCreated = await userServices.createUser(user)

    expect(userCreated).toHaveProperty('id')

    return console.log(userCreated);
  })

  // it("user not should be create with exist email ", async function () {
  //   const user1 = {
  //     name: "User Test 1",
  //     email: "user@test.com",
  //     password: "123"
  //   }

  //   const user2 = {
  //     name: "User Test 2",
  //     email: "user@test.com",
  //     password: "123"
  //   }

  //   await userServices.createUser(user1)

  //   await expect(userServices.createUser(user2)).rejects.toEqual(new AppError("E-mail já cadastrado."))
  // })
})