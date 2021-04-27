exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("transactions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("transactions").insert([
        { book_id: 1, store_id: 1, change: 9 },
        { book_id: 1, store_id: 2, change: 3 },
        { book_id: 1, store_id: 3, change: 1 },
        { book_id: 2, store_id: 1, change: 4 },
        { book_id: 2, store_id: 2, change: 0 },
        { book_id: 2, store_id: 3, change: 1 },
        { book_id: 3, store_id: 1, change: 0 },
        { book_id: 3, store_id: 2, change: 4 },
        { book_id: 3, store_id: 3, change: 5 },
        { book_id: 4, store_id: 1, change: 3 },
        { book_id: 4, store_id: 2, change: 1 },
        { book_id: 4, store_id: 3, change: 2 },
      ]);
    });
};
