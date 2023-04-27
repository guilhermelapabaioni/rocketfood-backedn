const { Router } = require('express')
const FoodsController = require('../controllers/FoodsController')
const ensureAuth = require('../middleware/ensureAuth')

const foodsRoutes = Router()
// foodsRoutes.use(ensureAuth)

const foodsController = new FoodsController()

foodsRoutes.post('/:user_id', foodsController.create)
foodsRoutes.put('/:id', foodsController.update)
foodsRoutes.delete('/:id', foodsController.delete)
foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.get)

module.exports = foodsRoutes