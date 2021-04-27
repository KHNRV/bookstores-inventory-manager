exports.up = function (knex) {
  return knex.schema.createTable("inventories", (table) => {
    table.increments().primary();
    table.integer("book_id").notNullable().references("books.id");
    table.integer("store_id").notNullable().references("stores.id");

    table.unique(["book_id", "store_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("inventories");
};
