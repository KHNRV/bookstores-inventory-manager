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

describe("Books", () => {
  it("GET    >> /api/books", async (done) => {
    const expectedResults = [
      {
        author_id: 1,
        id: 1,
        isbn_13: "9780446675536",
        title: "Gone with the Wind",
      },
      { author_id: 2, id: 2, isbn_13: "9781551111803", title: "Jane Eyre" },
      {
        author_id: 3,
        id: 3,
        isbn_13: "9780553213102",
        title: "Pride and Prejudice",
      },
      { author_id: 3, id: 4, isbn_13: "9780141439587", title: "Emma" },
    ];

    const res = await request
      .get("/api/books")
      .set("Authorization", `${username} ${token}`);

    expect(res.body).toEqual(expectedResults);
    done();
  });

  it("POST   >> /api/books", async (done) => {
    const newBook = {
      title: "The Professor",
      isbn_13: "9781582870953",
      author_id: 2,
    };

    const res = await request
      .post(`/api/books/`)
      .send(newBook)
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toEqual([5]);
    done();
  });

  it("GET    >> /api/books/:isbn_13", async (done) => {
    const expectedResults = {
      author_id: 1,
      id: 1,
      isbn_13: "9780446675536",
      title: "Gone with the Wind",
    };

    const res = await request
      .get(`/api/books/${expectedResults.isbn_13}`)
      .set("Authorization", `${username} ${token}`);
    // ...
    expect(res.body).toEqual(expectedResults);
    done();
  });

  it("DELETE >> /api/books/:id", async (done) => {
    const res = await request
      .delete(`/api/books/9780446675536`)
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});
