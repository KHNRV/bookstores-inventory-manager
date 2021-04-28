const books = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  books.get("/", authenticateToken, async (req, res, next) => {
    const response = await db.books.index();
    res.send(response);
  });

  books.post("/", authenticateToken, async (req, res, next) => {
    const newBook = req.body;
    try {
      const response = await db.books.create(newBook);
      res.send(response);
    } catch (error) {
      res.status(403).send(error);
    }
  });
  books.get("/:isbn_13", authenticateToken, async (req, res, next) => {
    const isbn_13 = req.params.isbn_13;
    const response = await db.books.read().where.isbn_13(isbn_13);
    res.send(response);
  });
  books.put("/:id", authenticateToken, async (req, res, next) => {});
  books.delete("/:id", authenticateToken, async (req, res, next) => {});

  return books;
};
