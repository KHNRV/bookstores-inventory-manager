const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;

      next();
    });
  },
};
