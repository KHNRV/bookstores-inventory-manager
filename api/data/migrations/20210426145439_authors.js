exports.up = function (knex) {
  return knex.schema.createTable("authors", (table) => {
    table.increments().primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("authors");
};
