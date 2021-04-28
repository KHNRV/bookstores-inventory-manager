const app = require("../../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const { generateAccessToken } = require("../../helpers/authentication");
const db = require("../../data/db");

const username = process.env.DB_USER;
const token = generateAccessToken(username);

beforeEach(async () => {
  try {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  } catch (error) {
    console.log(error);
  }
});

describe("Transaction", () => {
  it("GET    >> /api/inventories", async (done) => {
    const expectedResults = [
      {
        isbn_13: "9780553213102",
        store_id: 2,
        stock: 4,
      },
      {
        isbn_13: "9780141439587",
        store_id: 1,
        stock: 3,
      },
      {
        isbn_13: "9780553213102",
        store_id: 1,
        stock: 0,
      },
      {
        isbn_13: "9780141439587",
        store_id: 3,
        stock: 2,
      },
      {
        isbn_13: "9780446675536",
        store_id: 2,
        stock: 3,
      },
      {
        isbn_13: "9780446675536",
        store_id: 3,
        stock: 1,
      },
      {
        isbn_13: "9781551111803",
        store_id: 3,
        stock: 1,
      },
      {
        isbn_13: "9781551111803",
        store_id: 1,
        stock: 4,
      },
      {
        isbn_13: "9780553213102",
        store_id: 3,
        stock: 5,
      },
      {
        isbn_13: "9780141439587",
        store_id: 2,
        stock: 1,
      },
      {
        isbn_13: "9780446675536",
        store_id: 1,
        stock: 9,
      },
      {
        isbn_13: "9781551111803",
        store_id: 2,
        stock: 0,
      },
    ];

    const res = await request
      .get("/api/inventories")
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toEqual(expectedResults);
    done();
  });

  it("GET    >> /api/inventories/:isbn_13/:store_id", async (done) => {
    const expectedResults = [
      {
        isbn_13: "9780553213102",
        store_id: 1,
        stock: 0,
      },
    ];

    const res = await request
      .get(
        `/api/inventories/${expectedResults[0].isbn_13}/${expectedResults[0].store_id}`
      )
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toEqual(expectedResults);
    done();
  });
});
