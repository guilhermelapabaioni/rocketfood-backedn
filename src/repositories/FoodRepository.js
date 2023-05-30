const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite/index')


class FoodRepository {
  async indexFoods() {
    const foods = await knex('foods').orderBy('foods.id');

    return foods
  }

  async indexFoodsWithIngredients({ search }) {
    const ingredients = search.split(',').map(ingredient => ingredient.trim());
    const lowercaseSearch = search.toLowerCase()
    
    const foods = await knex('ingredients')
      .innerJoin('foods', 'foods.id', 'ingredients.food_id')
      .whereRaw('LOWER(foods.name) LIKE ?', `%${lowercaseSearch}%`)
      .orWhereIn(knex.raw('LOWER(ingredients.ingredient)'), ingredients.map(ingredient => ingredient.toLowerCase()))
      .groupBy('foods.id')
      .orderBy('foods.name');

    return foods
  }

  async findById(id) {
    const food = await knex('foods').where({ id }).first()

    return food
  }

  async createFood({ user_id, image, name, category, price, description }) {
    const database = await sqliteConnection()

    try {
      const food_id = await database.run('INSERT INTO foods (user_id, image, name, category, price, description) VALUES (?, ?, ?, ?, ?, ?)', [user_id, image, name, category, price, description])

      return food_id
    } catch (error) {
      console.error(error)
      throw new AppError('Error creating food')
    }
  }

  async updateFood({ id, image, name, category, price, description }) {
    await knex('foods').where({ id }).update({
      image, name, category, price, description
    })
  }

  async deleteFood({ id }) {
    await knex('foods').where({ id }).delete()
  }
}

module.exports = FoodRepository