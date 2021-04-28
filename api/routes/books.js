const books = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  books.get("/", authenticateToken, async (req, res, next) => {
    const result = await db.books.index();
    res.send(result);
  });

  books.post("/", authenticateToken, async (req, res, next) => {});
  books.get("/:id", authenticateToken, async (req, res, next) => {});
  books.put("/:id", authenticateToken, async (req, res, next) => {});
  books.delete("/:id", authenticateToken, async (req, res, next) => {});

  return books;
};
