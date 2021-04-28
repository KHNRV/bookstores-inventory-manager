const knex = require("../../data/db");

module.exports = {
  authors: require("./authors")(knex),
  books: require("./books")(knex),
  inventories: require("./inventories")(knex),
  stores: require("./stores")(knex),
  transactions: require("./transactions")(knex),
};
