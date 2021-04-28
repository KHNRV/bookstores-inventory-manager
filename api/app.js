const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const auth = require("./helpers/authentication");
const db = require("./helpers/db/index");
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: process.env.WS_PORT + 1 || 3002 });
const inventoryWatcher = require("./helpers/inventoryWatcher")(db, wss);

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter(db, auth));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
