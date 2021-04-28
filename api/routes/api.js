const express = require("express");
const api = express.Router();
const books = require("./books");
const stores = require("./stores");
const authors = require("./authors");
const inventories = require("./inventories");
const transactions = require("./transactions");

module.exports = (db, auth) => {
  api.use("/books", books(db, auth));
  api.use("/stores", stores(db, auth));
  api.use("/authors", authors(db, auth));
  api.use("/inventories", inventories(db, auth));
  api.use("/transactions", transactions(db, auth));

  return api;
};
