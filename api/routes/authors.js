const authors = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  authors.get("/", authenticateToken, async (req, res, next) => {});

  authors.post("/", authenticateToken, async (req, res, next) => {});
  authors.get("/:id", authenticateToken, async (req, res, next) => {});
  authors.put("/:id", authenticateToken, async (req, res, next) => {});
  authors.delete("/:id", authenticateToken, async (req, res, next) => {});

  return authors;
};
