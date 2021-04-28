const transactions = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  transactions.get("/", authenticateToken, async (req, res, next) => {
    const result = await db.transactions.index();
    res.send(result);
  });

  transactions.post("/", authenticateToken, async (req, res, next) => {});
  transactions.get("/:id", authenticateToken, async (req, res, next) => {});
  transactions.put("/:id", authenticateToken, async (req, res, next) => {});
  transactions.delete("/:id", authenticateToken, async (req, res, next) => {});
  return transactions;
};
