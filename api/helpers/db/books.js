module.exports = (knex) => ({
  index() {
    return knex.select().from("books");
  },

  create() {},
  read() {},
  update() {},
  destroy() {},
});
