module.exports = (knex) => ({
  index() {
    return knex.select().from("books");
  },

  create(newBook) {
    return knex("books").insert(newBook, ["id"]);
  },
  read() {
    return {
      where: {
        isbn_13(isbn_13) {
          return knex.select().from("books").where("isbn_13", isbn_13).first();
        },
      },
    };
  },
  update() {},
  destroy() {},
});
