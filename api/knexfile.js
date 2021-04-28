// Update with your config settings.

require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_DEV,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds/development" },
  },

  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_TEST,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds/test" },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds/production" },
  },
};
