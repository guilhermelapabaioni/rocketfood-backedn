const FoodRepository = require('../repositories/FoodRepository')
const FoodServices = require('../services/FoodServices')
const IngredientRepository = require('../repositories/IngredientRepository')

const foodRepository = new FoodRepository()
const foodServices = new FoodServices(foodRepository)

class FoodsController {
  async create(request, response) {
    const { user_id } = request.params
    const image = request.file.filename
    const parsedData = JSON.parse(request.body.data)

    const { name, category, price, description, ingredients } = parsedData;

    await foodServices.createFood({ user_id, image, name, category, price, description, ingredients })

    return response.status(201).json()
  }

  async update(request, response) {
    const { id } = request.params
    const parsedData = JSON.parse(request.body.data)
    const { name, category, price, description, oldIngredients, ingredients } = parsedData

    const image = request.file.filename

    await foodServices.updateFood({ id, image, name, category, price, description, oldIngredients, ingredients })

    response.json(`Update was successful`)
  }


  async index(request, response) {
    const search = request.query.search;

    const foods = await foodServices.index({ search });

    return response.status(200).json(foods)
  }

  async get(request, response) {
    const { id } = request.params

    const food = await foodRepository.findById(id)

    const ingredientRepository = new IngredientRepository()
    const ingredient = await ingredientRepository.findById(id)

    return response.json({ ...food, ingredient })
  }

  async delete(request, response) {
    const { id } = request.params

    const food = await foodRepository.findById(id)

    await foodServices.deleteFood({ id })

    response.json(food)
  }
}

module.exports = FoodsController