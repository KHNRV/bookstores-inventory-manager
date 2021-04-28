<h1 align="center">Welcome to bookstores-inventory-manager 👋</h1>
<p>
  <a href="./docs" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> Dummy bookstores inventory manager built on NodeJS, ExpressJS, Knex and PostrgreSQL. Tested with Jest.

## Install

1. Clone this repository, `cd` into the `/api` folder and execute the following install command

   ```sh
   npm install
   ```

2. Create two new databases in PostgreSQL with the same username and password

   1. `bookstore-dev`
   2. `bookstore-test`
2. Create a `.env` file at the root of `/api` using the following model:

   ```sh
   # PORT USED BY EXPRESS
   PORT=3001
   
   # DATABASES CONNECTION INFORMATION
   NODE_ENV=development
   
   DB_HOST=127.0.0.1
   DB_USER=
   DB_PASSWORD=
   DB_NAME_DEV=bookstore-dev
   DB_NAME_TEST=bookstore_test
   
   # AUTHENTICATION
   TOKEN_SECRET=
   USERNAME=admin
   PASSWORD=admin
   ```

3. Populate the database with the following command

   ```sh
   npm run db:reset
   ```

4. Launch the app using `npm run dev`

## Run tests

```sh
npm test
```

## Author

👤 **Kevin Nicolas**

* Website: https://kevinnicolas.com
* Github: [@KHNRV](https://github.com/KHNRV)
* LinkedIn: [@kevinnicolasr](https://linkedin.com/in/kevinnicolasr)


