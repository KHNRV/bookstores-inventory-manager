module.exports = (knex) => ({
  index() {
    return knex.select().from("transactions");
  },

  create() {},
  read() {},
  update() {},
  destroy() {},
});
