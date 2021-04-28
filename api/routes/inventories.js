const inventories = require("express").Router();

module.exports = (db, { authenticateToken }) => {
  inventories.get("/", authenticateToken, async (req, res, next) => {
    const response = await db.inventories.index();
    res.send(response.rows);
  });

  inventories.post("/", authenticateToken, async (req, res, next) => {});
  inventories.get(
    "/:isbn_13/:store_id",
    authenticateToken,
    async (req, res, next) => {
      const { isbn_13, store_id } = req.params;

      const response = await db.inventories.read(isbn_13, store_id);

      res.send(response.rows);
    }
  );
  inventories.put("/:id", authenticateToken, async (req, res, next) => {});
  inventories.delete("/:id", authenticateToken, async (req, res, next) => {});
  return inventories;
};
