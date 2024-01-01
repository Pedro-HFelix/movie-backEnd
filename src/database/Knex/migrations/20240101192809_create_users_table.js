// migrations/20240101234567_create_users_table.js

exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.text("userName");
      table.text("email");
      table.text("password").unique();
      table.text("avatar");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  