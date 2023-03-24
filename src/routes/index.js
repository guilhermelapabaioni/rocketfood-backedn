const {Router} = require('express')
const usersRoutes = require('./usersRoutes')

const routes = Router()

routes.use('/users', usersRoutes)

module.exports = routes
