const app = require("../../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const { generateAccessToken } = require("../../helpers/authentication");
const db = require("../../data/db");

const username = process.env.DB_USER;
const token = generateAccessToken(username);

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

describe("Transaction", () => {
  it("GET    >> /api/transactions", async (done) => {
    const expectedResults = [
      {
        id: 1,
        book_id: 1,
        store_id: 1,
        change: 9,
      },
      {
        id: 2,
        book_id: 1,
        store_id: 2,
        change: 3,
      },
      {
        id: 3,
        book_id: 1,
        store_id: 3,
        change: 1,
      },
      {
        id: 4,
        book_id: 2,
        store_id: 1,
        change: 4,
      },
      {
        id: 5,
        book_id: 2,
        store_id: 2,
        change: 0,
      },
      {
        id: 6,
        book_id: 2,
        store_id: 3,
        change: 1,
      },
      {
        id: 7,
        book_id: 3,
        store_id: 1,
        change: 0,
      },
      {
        id: 8,
        book_id: 3,
        store_id: 2,
        change: 4,
      },
      {
        id: 9,
        book_id: 3,
        store_id: 3,
        change: 5,
      },
      {
        id: 10,
        book_id: 4,
        store_id: 1,
        change: 3,
      },
      {
        id: 11,
        book_id: 4,
        store_id: 2,
        change: 1,
      },
      {
        id: 12,
        book_id: 4,
        store_id: 3,
        change: 2,
      },
    ];

    const res = await request
      .get("/api/transactions")
      .set("Authorization", `${username} ${token}`);
    expect(res.body).toEqual(expectedResults);
    done();
  });

  it("POST   >> /api/transactions | Enough in stock", async (done) => {
    const newTransaction = {
      book_id: 3,
      store_id: 3,
      change: -5,
    };

    const res = await request
      .post(`/api/transactions/`)
      .send(newTransaction)
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toEqual([{ id: 13 }]);
    done();
  });

  it("POST   >> /api/transactions | Not enough in stock", async (done) => {
    const newTransaction = {
      book_id: 3,
      store_id: 3,
      change: -6,
    };

    const res = await request
      .post(`/api/transactions/`)
      .send(newTransaction)
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", /json/)
      .expect(403);

    expect(res.body).toEqual({
      message: "Stock too low for this operation to succeed",
      projectedStock: -1,
      type: "ERROR",
    });
    done();
  });

  // xit("GET    >> /api/books/:isbn_13", async (done) => {
  //   const expectedResults = {
  //     author_id: 1,
  //     id: 1,
  //     isbn_13: "9780446675536",
  //     title: "Gone with the Wind",
  //   };

  //   const res = await request
  //     .get(`/api/books/${expectedResults.isbn_13}`)
  //     .set("Authorization", `${username} ${token}`);
  //   // ...
  //   expect(res.body).toEqual(expectedResults);
  //   done();
  // });

  // xit("PUT    >> /api/books/:id", async (done) => {
  //   done();
  // });

  // xit("DELETE >> /api/books/:id", async (done) => {
  //   done();
  // });
});
