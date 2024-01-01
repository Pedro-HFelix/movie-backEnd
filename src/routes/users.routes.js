const express = require('express');
const usersController = require('../controllers/usersController');
const usersRoutes = express.Router();


usersRoutes.post('/', usersController.create);

usersRoutes.get('/:id', usersController.findUserById);

usersRoutes.get('/email/:email', usersController.findUserByEmail);

usersRoutes.put('/:id', usersController.update);

usersRoutes.delete('/:id', usersController.deleteUser);


module.exports = usersRoutes;