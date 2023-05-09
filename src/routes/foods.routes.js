const { Router } = require('express')
const FoodsController = require('../controllers/FoodsController')
const uploadConfig = require('../config/upload')
const multer = require('multer')

const upload = multer(uploadConfig.MULTER)

const ensureAuth = require('../middleware/ensureAuth')
const foodsRoutes = Router()
// foodsRoutes.use(ensureAuth)

const foodsController = new FoodsController()

foodsRoutes.post('/:user_id', upload.single('image'), foodsController.create)
foodsRoutes.put('/:id', upload.single('image'), foodsController.update)
foodsRoutes.get('/', foodsController.index)
foodsRoutes.get('/:id', foodsController.get)
foodsRoutes.delete('/:id', foodsController.delete)

module.exports = foodsRoutes