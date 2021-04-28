const app = require("../../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const { generateAccessToken } = require("../../helpers/authentication");
const db = require("../../data/db");

const username = process.env.DB_USER;
const token = generateAccessToken(username);

beforeAll(async () => {
  await db.migrate.latest();
});

it("GET    >> /api/books", async (done) => {
  // Sends GET Request to /test endpoint
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
  // ...
  expect(res.body).toEqual(expectedResults);
  done();
});

xit("POST   >> /api/books", async (done) => {
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

xit("PUT    >> /api/books/:id", async (done) => {
  done();
});

xit("DELETE >> /api/books/:id", async (done) => {
  done();
});
