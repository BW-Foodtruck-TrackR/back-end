const db = require("../data/connection");
const supertest = require("supertest");
const server = require("../api/server");
const { isMainThread } = require("worker_threads");

it("should user the testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
});

describe("GET / of server.js", () => {
    // afterEach(async () => {
    //     await db("users").truncate();
    // });

    it("Should test the home slash of the server", async () => {
        supertest(server)
            .get("/")
            .then((res) => {
                expect(res.body).toStrictEqual({
                    Message:
                        "Congrats on loading up the home slash of the server. If you are a developer, you may be looking for /api/login",
                });
            });
    });
});
describe("POST /api/users/register", () => {
    it("should not let you register without a username/password", async () => {
        supertest(server)
            .post("/api/auth/register")
            .then((res) => {
                expect(res.body).toStrictEqual({
                    error: "Need username and password",
                });
                expect(res.body.error).toBe("Need username and password");

                // expect(req.body).toBe({});
            });
    });
    it("register, fails as its not running on node?", async () => {
        await supertest(server)
            .post("/api/users/register")
            .send({ username: "testing", password: "password" });
        let allThem = await supertest(server)
            .get("/api/users")
            .set(
                "Authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im5ldyIsImlhdCI6MTU5MjU5MzEyOCwiZXhwIjoxNTkyNjE0NzI4fQ.J7eg33ixSqb7dx82xfYRjNA13WonNAQFCWC4ja7BB6o"
            );

        expect(allThem.body).toStrictEqual([{ id: 1, username: "testing" }]);
    });
});
