const inventories = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  inventories.get("/", authenticateToken, async (req, res, next) => {});

  inventories.post("/", authenticateToken, async (req, res, next) => {});
  inventories.get("/:id", authenticateToken, async (req, res, next) => {});
  inventories.put("/:id", authenticateToken, async (req, res, next) => {});
  inventories.delete("/:id", authenticateToken, async (req, res, next) => {});
  return inventories;
};
