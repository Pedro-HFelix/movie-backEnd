const { Router } = require('express')
const usersRoutes = require('./users.routes')
const movieRoutes = require('./movie.routes')

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/notes', movieRoutes)

module.exports = routes
