exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.text("userName");
    table.text("email");
    table.text("password").unique();
    table.text("avatar");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable("users");