const express = require('express');
const moviesController = require('../controllers/MoviesController');
const moviesRoutes = express.Router();


moviesRoutes.post('/:user_id', moviesController.create);

moviesRoutes.get('/:id', moviesController.findNoteById);

moviesRoutes.get('/tag/:tag', moviesController.findMovieByTag);

moviesRoutes.put('/:id', moviesController.update);

moviesRoutes.delete('/:id', moviesController.deleteMovie);


module.exports = moviesRoutes;