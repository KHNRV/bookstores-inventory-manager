module.exports = (knex) => ({
  index() {
    return knex.select().from("inventories");
  },

  create() {},
  read() {},
  update() {},
  destroy() {},
});
