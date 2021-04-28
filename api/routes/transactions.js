const transactions = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  transactions.get("/", authenticateToken, async (req, res, next) => {
    const result = await db.transactions.index();
    res.send(result);
  });

  transactions.post("/", authenticateToken, async (req, res, next) => {
    const newTransaction = req.body;
    const { book_id, store_id } = newTransaction;
    const isbn_13 = db.books.get.isbn_13.from.id(book_id);
    try {
      const projectedStock = await db.inventories.read(isbn_13, store_id);
      projectedStock.rows[0].stock += newTransaction.change;

      if (projectedStock.rows[0].stock >= 0) {
        const response = await db.transactions.create(newTransaction);
        res.send(response);
      } else {
        throw {
          type: "ERROR",
          message: "Stock too low for this operation to succeed",
          projectedStock: projectedStock.rows[0].stock,
        };
      }
    } catch (error) {
      res.status(403).send(error);
    }
  });
  transactions.get("/:id", authenticateToken, async (req, res, next) => {});
  transactions.put("/:id", authenticateToken, async (req, res, next) => {});
  transactions.delete("/:id", authenticateToken, async (req, res, next) => {});
  return transactions;
};
