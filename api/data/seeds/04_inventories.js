exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("inventories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("inventories").insert([
        { book_id: 1, store_id: 1, stock: 9 },
        { book_id: 1, store_id: 2, stock: 3 },
        { book_id: 1, store_id: 3, stock: 1 },
        { book_id: 2, store_id: 1, stock: 4 },
        { book_id: 2, store_id: 2, stock: 0 },
        { book_id: 2, store_id: 3, stock: 1 },
        { book_id: 3, store_id: 1, stock: 0 },
        { book_id: 3, store_id: 2, stock: 4 },
        { book_id: 3, store_id: 3, stock: 5 },
        { book_id: 4, store_id: 1, stock: 3 },
        { book_id: 4, store_id: 2, stock: 1 },
        { book_id: 4, store_id: 3, stock: 2 },
      ]);
    });
};
