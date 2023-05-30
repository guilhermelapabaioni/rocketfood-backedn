const IngredientRepository = require('../repositories/IngredientRepository')
const IngredientServices = require('../services/IngredientServices')

class IngredientsController {
  async index(request, response) {
    const ingredients = await knex('ingredients')

    return response.json(ingredients)
  }

  async get(request, response) {
    const { id } = request.params

    const ingredientRepository = new IngredientRepository()
    const ingredientServices = new IngredientServices(ingredientRepository)

    const nextId = await ingredientServices.getIngredientMaxId(id)
    

    return response.json(nextId)
  }
}

module.exports = IngredientsController