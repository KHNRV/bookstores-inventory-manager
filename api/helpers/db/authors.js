module.exports = (knex) => ({
  index() {
    return knex.select().from("authors");
  },

  create() {},
  read() {},
  update() {},
  destroy() {},
});
