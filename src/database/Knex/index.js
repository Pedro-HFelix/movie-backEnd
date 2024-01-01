const knex = require('knex');
const config = require('../../../knexfile');

const Knex = knex(config.development)
module.exports = Knex;