module.exports = (knex) => ({
  index() {
    return knex.select().from("transactions");
  },

  create(newTransaction) {
    return knex.insert(newTransaction, "id").into("transactions");
  },

  read() {},
  update() {},
  destroy() {},
});
