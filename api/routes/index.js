const express = require("express");
const { authenticateToken } = require("../helpers/authentication");
const router = express.Router();

/* GET home page. */
router.get("/", authenticateToken, (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
