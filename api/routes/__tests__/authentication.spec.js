const app = require("../../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const { generateAccessToken } = require("../../helpers/authentication");

const username = process.env.DB_USER;
const token = generateAccessToken(username);

describe("Authentication", () => {
  it("GET    >> / - without jwt", async (done) => {
    request
      .get("/")
      .expect("Content-Type", "text/plain; charset=utf-8")
      .expect(401, done);
  });
  it("GET    >> / - with proper jwt", async (done) => {
    request
      .get("/")
      .set("Authorization", `${username} ${token}`)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200, done);
  });
  xit("GET    >> / - with invalid jwt", async (done) => {
    const res = await request
      .get("/")
      .set("Authorization", `${username} ${token}`);
    expect(0).toEqual(0);

    done();
  });
});
