const { Router } = require('express')
const FoodsController = require('../controllers/FoodsController')
const FoodsAvatarController = require('../controllers/FoodAvatarController')
const uploadConfig = require('../config/upload')
const multer = require('multer')

const ensureAuth = require('../middleware/ensureAuth')
const foodsRoutes = Router()
// foodsRoutes.use(ensureAuth)

const foodsController = new FoodsController()
const foodsAvatarController = new FoodsAvatarController()
const upload = multer(uploadConfig.MULTER)

foodsRoutes.post('/:user_id', foodsController.create)
foodsRoutes.put('/:id', foodsController.update)
foodsRoutes.delete('/:id', foodsController.delete)
foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.get)

foodsRoutes.patch('/food/avatar', upload.single('avatar'), foodsAvatarController.update)

module.exports = foodsRoutes