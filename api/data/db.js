const pg = require("pg");
pg.types.setTypeParser(20, "text", parseInt);
const knex = require("knex");

const knexfile = require("../knexfile");

const env = process.env.NODE_ENV || "development";
const configOptions = knexfile[env];

module.exports = knex(configOptions);
