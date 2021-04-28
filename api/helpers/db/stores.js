module.exports = (knex) => ({
  index() {
    knex.select().from("stores");
  },

  create() {},
  read() {},
  update() {},
  destroy() {},
});
