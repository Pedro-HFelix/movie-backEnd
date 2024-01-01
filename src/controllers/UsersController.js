const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require("../database/knex")


class UsersController {

  async create(request, response) {
    const { name, email, password} = request.body;

    const checkUserExists = await knex('users').select('userName').where('email', email).first();

    if (checkUserExists) {
      throw new AppError('his email is already in use.');
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({
      userName: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).json({ message: 'User created successfully' });
  }

  async update(request, response) {
    const { name, email, password, old_password, avatar } = request.body;
    const { id } = request.params;
  
    const user = await knex('users').where('id', id).first();
  
    if (!user) {
      throw new AppError('User not found');
    }
  
    const userWithUpdatedEmail = await knex('users').where('email', email).first();
  
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('This email is already in use.');
    }
  
    const updatedUser = {
      userName: name || user.userName,
      email: email || user.email,
    };
  
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
  
      if (!checkOldPassword) {
        throw new AppError('The old password does not match.');
      }
  
      updatedUser.password = await hash(password, 8) || user.password;
    } else if (password && !old_password) {
      throw new AppError('You must provide the old password to set a new password');
    }
  
    await knex('users').where('id', id).update({
      ...updatedUser,
      avatar,
      updated_at: knex.fn.now(),
    });
  
    return response.status(200).json({ message: 'User updated successfully' });
  }
  
  async findUserByEmail(request, response) {
    const { email } = request.params;

    const user = await knex('users').select('userName', 'email', 'avatar').where('email', email).first();

    if (!user) {
      throw new AppError('User not found');
    }

    return response.status(200).json(user);
  }  
  
  async findUserById(request, response) {
    const { id } = request.params;
    const user = await knex('users').select('userName', 'email', 'avatar').where('id', id).first();

    if (!user) {
      throw new AppError('User not found');
    }

    return response.status(200).json(user);
  }  

  async deleteUser(request, response){
    const { id } = request.params;

    const rowsAffected = await knex('users').where('id', id).del();

    if (!rowsAffected) {
      throw new AppError('User not found');
    }

    return response.status(200).json({message: "User deleted"});
  }
}

module.exports = new UsersController();;