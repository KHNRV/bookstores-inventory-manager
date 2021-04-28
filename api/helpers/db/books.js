module.exports = (knex) => ({
  index() {
    return knex.select().from("books");
  },

  async create(newBook) {
    const newBookId = await knex("books").insert(newBook, "id");
    const stores = await knex.select().from("stores");
    stores.forEach(async (store) => {
      console.log({
        book_id: newBookId[0],
        store_id: store.id,
        change: 0,
      });
      await knex
        .insert({
          book_id: newBookId[0],
          store_id: store.id,
          change: 0,
        })
        .into("transactions");
    });
    return newBookId;
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
    return knex("books").where("isbn_13", isbn_13).del("id");
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
