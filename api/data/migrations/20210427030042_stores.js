exports.up = function (knex) {
  return knex.schema.createTable("stores", (table) => {
    table.increments().primary();
    table.string("name").notNullable();
    table.string("city").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("stores");
};
