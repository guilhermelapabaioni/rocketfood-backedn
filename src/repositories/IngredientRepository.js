const knex = require('../database/knex');

class IngredientRepository {
  async maxId(id) {
    const maxId = await knex('ingredients').where({ food_id: id }).max('id as maxId')

    return maxId
  }


  async findById(food_id) {
    const ingredients = await knex('ingredients').where({ food_id: food_id }).select('*').orderBy('ingredient')

    return ingredients
  }

  async createIngredient(ingredientsInsert) {
    const ingriedient = await knex('ingredients').insert(ingredientsInsert)

    return ingriedient
  }

  async deleteIngredient(ingredientsDelete) {
    if (ingredientsDelete) {
      const ingredientsDeleteds = await knex('ingredients').whereIn('id', ingredientsDelete).del()

      return ingredientsDeleteds
    } else {
      const ingredientsDeleteds = await knex('ingredients').delete()

      return ingredientsDeleteds
    }

  }
}

module.exports = IngredientRepository