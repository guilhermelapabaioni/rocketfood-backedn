const AppError = require('../utils/AppError')
const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage')

class FoodsController {
  async create(req, res) {
    const { user_id } = req.params
    const imageFileName = req.file.filename
    const parsedData = JSON.parse(req.body.data)

    const { name, category, price, description, ingredients } = parsedData;

    const diskStorage = new DiskStorage()
    const image = await diskStorage.saveFile(imageFileName)

    const food_id = await knex('foods').insert({
      user_id,
      image,
      name,
      category,
      price,
      description
    })

    if (ingredients) {
      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          food_id: food_id[0],
          ingredient
        }
      })

      if (ingredientsInsert.length) {
        await knex('ingredients').insert(ingredientsInsert)
      }
    }

    res.json({ food_id: food_id })
  }

  async update(req, res) {
    const { id } = req.params
    const parsedData = JSON.parse(req.body.data)
    const { name, category, price, description, oldIngredients, ingredients } = parsedData
    const imageFoodFile = req.file.filename

    const food = await knex('foods').where({ id }).first()

    if (!food) {
      throw new AppError('Inválido')
    }

    const diskStorage = new DiskStorage()
    if (req.file) {
      if (food.imageFoodFile) {
        await diskStorage.deleteFile(food.imageFoodFile)
      }
      const image = await diskStorage.saveFile(imageFoodFile)

      await knex('foods').where({ id }).update({
        image,
        name,
        category,
        price,
        description
      })
    }


    const existingIngredients = await knex('ingredients').where({ food_id: id }).select('*')

    if (JSON.stringify(existingIngredients) !== JSON.stringify(oldIngredients)) {
      // Coletando os IDs dos ingredientes registrados na comida presentes no banco de dados.
      const existingIngredientsIds = existingIngredients.map(ingredient => ingredient.id)
      // Coletando os IDs dos ingredientes registrado na comida informados pelo frontend.
      const oldIngredientsIds = oldIngredients.map(ingredient => ingredient.id)

      // Realizando um filtro comparativo que irá retornar apenas os IDs que não forem encontrados na tabela do banco de dados.
      const removedIngredientsId = existingIngredientsIds.filter(id => !oldIngredientsIds.includes(id))
      // Deletando da tabela ingredientes os IDs que foram deletados pelo frontend.
      if (removedIngredientsId.length) {
        await knex('ingredients').whereIn('id', removedIngredientsId).del()
      }
    }

    if (JSON.stringify(existingIngredients) !== JSON.stringify(ingredients)) {
      const existingIngredientsIds = existingIngredients.map(ingredient => ingredient.id)
      const ingredientsIds = ingredients.map(ingredient => ingredient.id)

      const addedIngredientsIds = existingIngredientsIds.filter(id => !ingredientsIds.includes(id))
      if (addedIngredientsIds.length) {
        const ingredientsInsert = ingredients.map(ingredient => {
          return {
            food_id: id[0],
            ingredient
          }
        })

        if (ingredientsInsert.length) {
          await knex('ingredients').insert(ingredientsInsert)
        }
      }
    }

    res.json(`Update was successful`)
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