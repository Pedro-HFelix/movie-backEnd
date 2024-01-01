const AppError = require('../utils/AppError')
const knex = require("../database/knex");

class MoviesController {

  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    if (rating > 5 || rating < 0) {
      throw new AppError('Invalid rating');
    }

    const checkUserExists = await knex('users').select('userName').where('id', user_id).first();
    if (!checkUserExists) {
      throw new AppError("User not found.");
    }

    const [note_id] = await knex('movie_notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const insertTags = tags.map(tag => ({
      user_id,
      note_id,
      name: tag
    }));
    await knex('movie_tags').insert(insertTags);

    return response.status(201).json({ message: 'Movie_notes created successfully' });
  }

  async update(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id } = request.params;

    if (rating > 5 || rating < 0) {
      throw new AppError('Invalid rating');
    }

    const checkNoteExists = await knex('movie_notes').where('id', id).first();
    if (!checkNoteExists) {
      throw new AppError("Note not found.");
    }

    
    await knex('movie_notes')
      .where({ id })
      .update({
        title,
        description,
        rating,
        updated_at: knex.fn.now(),
      });

    const updateTags = tags.map(tag => ({
      note_id: id,
      name: tag,
    }));

    await knex.transaction(async (tag) => {
      await tag('movie_tags').where({ note_id : id }).del();

      //new tags
      await tag('movie_tags').insert(updateTags);
    });

    return response.status(200).json({ message: 'Movie_notes updated successfully' });

  }

  async findNoteById(request, response) {
    const { id } = request.params;

    const note = await knex("movie_notes").where({ id }).first();

    if (!note) {
      return response.status(404).json({ error: "Note not found" });
    }

    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name");

    return response.status(200).json({
      ...note,
      tags,
    });
  }
  async findMovieByTag(request, response) {
    const { tag } = request.params;

    const note = await knex("movie_notes")
      .select("movie_notes.id", "title", "description", "rating")
      .join("movie_tags", "movie_notes.id", "=", "movie_tags.note_id")
      .where("movie_tags.name", "like", `%${tag}%`)
      .first();

    if (!note) {
      return response.status(404).json({ error: "Note not found" });
    }

    const tags = await knex("movie_tags")
      .select("name")
      .where({ note_id: note.id })
      .orderBy("name");

    return response.status(200).json({
      ...note,
      tags
    });
  }

  async deleteMovie(request, response) {
    const { id } = request.params;

    const rowsAffected = await knex('movie_notes').where('id', id).del();

    if (!rowsAffected) {
      throw new AppError('Movie note not found');
    }

    return response.status(200).json({ message: "Movie note deleted" });

  }
}

module.exports = new MoviesController();;