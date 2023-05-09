const FoodRepository = require('../repositories/FoodRepository')
const FoodServices = require('../services/FoodServices')
const knex = require('../database/knex')

class FoodsController {
  async create(request, response) {
    const { user_id } = request.params
    const image = request.file.filename
    const parsedData = JSON.parse(request.body.data)

    const { name, category, price, description, ingredients } = parsedData;

    const foodRepository = new FoodRepository()
    const foodCreateService = new FoodServices(foodRepository)
    await foodCreateService.createFood({ user_id, image, name, category, price, description, ingredients })

    return response.status(201).json()
  }

  async update(request, response) {
    const { id } = request.params
    const parsedData = JSON.parse(request.body.data)
    const { name, category, price, description, oldIngredients, ingredients } = parsedData

    const image = request.file.filename

    const foodRepository = new FoodRepository()
    const foodCreateService = new FoodServices(foodRepository)
    await foodCreateService.updateFood({ id, image, name, category, price, description, oldIngredients, ingredients })
    // const food = await knex('foods').where({ id }).first()

    // if (!food) {
    //   throw new AppError('Inválido')
    // }

    // const diskStorage = new DiskStorage()
    // if (req.file) {
    //   if (food.imageFoodFile) {
    //     await diskStorage.deleteFile(food.imageFoodFile)
    //   }
    //   const image = await diskStorage.saveFile(imageFoodFile)

    //   await knex('foods').where({ id }).update({
    //     image,
    //     name,
    //     category,
    //     price,
    //     description
    //   })
    // }


    // const existingIngredients = await knex('ingredients').where({ food_id: id }).select('*')

    // if (JSON.stringify(existingIngredients) !== JSON.stringify(oldIngredients)) {
    //   // Coletando os IDs dos ingredientes registrados na comida presentes no banco de dados.
    //   const existingIngredientsIds = existingIngredients.map(ingredient => ingredient.id)
    //   // Coletando os IDs dos ingredientes registrado na comida informados pelo frontend.
    //   const oldIngredientsIds = oldIngredients.map(ingredient => ingredient.id)

    //   // Realizando um filtro comparativo que irá retornar apenas os IDs que não forem encontrados na tabela do banco de dados.
    //   const removedIngredientsId = existingIngredientsIds.filter(id => !oldIngredientsIds.includes(id))
    //   // Deletando da tabela ingredientes os IDs que foram deletados pelo frontend.
    //   if (removedIngredientsId.length) {
    //     await knex('ingredients').whereIn('id', removedIngredientsId).del()
    //   }
    // }

    // if (JSON.stringify(existingIngredients) !== JSON.stringify(ingredients)) {
    //   const existingIngredientsIds = existingIngredients.map(ingredient => ingredient.id)
    //   const ingredientsIds = ingredients.map(ingredient => ingredient.id)

    //   const addedIngredientsIds = existingIngredientsIds.filter(id => !ingredientsIds.includes(id))
    //   if (addedIngredientsIds.length) {
    //     const ingredientsInsert = ingredients.map(ingredient => {
    //       return {
    //         food_id: id[0],
    //         ingredient
    //       }
    //     })

    //     if (ingredientsInsert.length) {
    //       await knex('ingredients').insert(ingredientsInsert)
    //     }
    //   }
    // }

    response.json(`Update was successful`)
  }


  async index(req, res) {
    const foods = await knex('foods')
    res.json(foods)
  }

  async get(req, res) {
    const { id } = req.params

    const food = await knex('foods').where({ id }).first()
    const ingredient = await knex('ingredients').where({ food_id: id }).orderBy('ingredient')

    return res.json({ ...food, ingredient })
  }

  async delete(req, res) {
    const { id } = req.params

    const food = await knex('foods').where({ id }).first()

    const ingredients = await knex('ingredients').where({ food_id: id }).select('*')

    await knex('foods').where({ id }).delete()
    await knex('ingredients').where({ food_id: id }).delete()

    res.json({ food, ingredients })
  }
}

module.exports = FoodsController