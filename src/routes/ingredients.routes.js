const Router = require('express')
const IngredientsCotroller = require('../controllers/IngredientsController')

const ingredientsRoutes = Router()
const ingredientsController = new IngredientsCotroller()

ingredientsRoutes.get('/', ingredientsController.index)
ingredientsRoutes.get('/:id', ingredientsController.get)

module.exports = ingredientsRoutes