const knex = require('knex');
const config = require('../../../knexfile');

async function migrationsRun() {
    const db = knex(config.development);
  
    try {
      await db.migrate.latest();
  
      console.log('Migrations executed successfully');
    } catch (error) {
      console.error('Error executing migrations:', error);
    } finally {
      await db.destroy();
    }
  }

  module.exports = migrationsRun;