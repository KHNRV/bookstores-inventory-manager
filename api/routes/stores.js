const stores = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  stores.get("/", authenticateToken, async (req, res, next) => {});

  stores.post("/", authenticateToken, async (req, res, next) => {});
  stores.get("/:id", authenticateToken, async (req, res, next) => {});
  stores.put("/:id", authenticateToken, async (req, res, next) => {});
  stores.delete("/:id", authenticateToken, async (req, res, next) => {});
  return stores;
};
