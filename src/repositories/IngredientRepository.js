const knex = require('../database/knex');

class IngredientRepository {

  async findById(food_id) {
    const ingredients = await knex('ingredients').where({ food_id: food_id }).select('*').orderBy('ingredient')

    return ingredients
  }

  async createIngredient(ingredientsInsert) {
    console.log(ingredientsInsert + 'B');
    const ingriedient = await knex('ingredients').insert(ingredientsInsert)

    return ingriedient
  }

  async deleteIngredient(ingredientsDelete) {
    const ingredientsDeleteds = await knex('ingredients').whereIn('id', ingredientsDelete).del()

    return ingredientsDeleteds
  }
}

module.exports = IngredientRepository