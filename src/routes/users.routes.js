const {Router} = require('express')
const UsersController = require('../controllers/UsersController')
const ensureAuth = require('../middleware/ensureAuth')

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', ensureAuth, usersController.update)
usersRoutes.get('/', usersController.get)

module.exports = usersRoutes