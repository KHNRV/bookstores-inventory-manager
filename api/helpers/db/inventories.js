module.exports = (knex) => ({
  index() {
    return knex.raw(
      ` SELECT books.isbn_13, stores.id AS store_id ,  sum(transactions.change) AS stock
        FROM stores, books, transactions
        WHERE transactions.store_id = stores.id
        AND transactions.book_id = books.id
        GROUP BY stores.id, books.isbn_13, books.title`
    );
  },

  create() {},
  read(isbn_13, store_id) {
    return knex.raw(
      ` SELECT books.isbn_13, stores.id AS store_id ,  sum(transactions.change) AS stock
        FROM stores, books, transactions
        WHERE transactions.store_id = stores.id
        AND transactions.book_id = books.id
        AND books.isbn_13 = ?
        AND stores.id = ?
        GROUP BY stores.id, books.isbn_13, books.title`,
      [isbn_13, store_id]
    );
  },
  update() {},
  destroy() {},
});
