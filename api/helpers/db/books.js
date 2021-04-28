module.exports = (knex) => ({
  index() {
    return knex.select().from("books");
  },

  create() {},
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
