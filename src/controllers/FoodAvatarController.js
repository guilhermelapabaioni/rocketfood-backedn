const knex = require('../database/knex');
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class FoodsAvatarController {
  async update(request, response) {
    const food_id = request.user.id
    const avatarFileName = request.file.filename

    const diskStorage = new DiskStorage()

    const food = await knex('food').where({ id: food_id }).first()

    if (!food) {
      throw new AppError('Inválido')
    }

    if (food.avatar) {
      await diskStorage.deleteFile(food.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFileName)

    food.avatar = filename

    await knex('food').update(food).where({ id: food_id })

    return response.json(food)
  }
}

module.exports = FoodsAvatarController;