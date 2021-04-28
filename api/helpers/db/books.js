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
  destroy(isbn_13) {
    return knex("books").where("isbn_13", isbn_13).del(["id"]);
  },
  get: {
    id: {
      from: {
        isbn_13(isbn_13) {
          return knex
            .select("id")
            .from("books")
            .where("isbn_13", isbn_13)
            .first();
        },
      },
    },
    isbn_13: {
      from: {
        id(id) {
          return knex.select("isbn_13").from("books").where("id", id).first();
        },
      },
    },
  },
});
