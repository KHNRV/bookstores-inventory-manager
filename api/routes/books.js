const books = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  books.get("/", authenticateToken, async (req, res, next) => {
    const result = await db.books.index();
    res.send(result);
  });

  books.post("/", authenticateToken, async (req, res, next) => {});
  books.get("/:isbn_13", authenticateToken, async (req, res, next) => {
    const isbn_13 = req.params.isbn_13;
    const result = await db.books.read().where.isbn_13(isbn_13);
    res.send(result);
  });
  books.put("/:id", authenticateToken, async (req, res, next) => {});
  books.delete("/:id", authenticateToken, async (req, res, next) => {});

  return books;
};
