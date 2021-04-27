exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments().primary();
    table.string("title").notNullable();
    table.string("isbn_13").unique();
    table.integer("author_id").notNullable().references("authors.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
