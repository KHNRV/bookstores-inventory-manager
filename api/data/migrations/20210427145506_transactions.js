exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments().primary();
    table
      .integer("book_id")
      .notNullable()
      .references("books.id")
      .onDelete("CASCADE");
    table
      .integer("store_id")
      .notNullable()
      .references("stores.id")
      .onDelete("CASCADE");
    table.integer("change").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transactions");
};
