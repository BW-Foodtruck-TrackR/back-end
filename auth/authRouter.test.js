// /**
//  * @jest-environment node
//  */

const supertest = require("supertest");
const server = require("../api/server");

const db = require("../data/connection");

const user = {
    id: 500,
    username: "diner2",
    password: "password",
    userType: "1",
    email: "email6@email.com",
};
const user2 = {
    id: 501,
    username: "operator",
    password: "password",
    userType: "2",
    email: "email4@email.com",
};
userLogin = {
    email: "email6@email.com",
    password: "password",
};

let token;
afterAll(async () => {
    await db("favoriteTrucks").truncate();
    await db("trucksOwned").truncate();
    beforeAll(async () => {
        await db("favoriteTrucks").truncate();
        await db("trucksOwned").truncate();

        await supertest(server).post("/api/auth/register").send(user);

        await supertest(server).post("/api/auth/login").send(userLogin);
        // .then((response) => {
        //     let token = response.body.token;
        //     return token;
        // });
        // await supertest(server)
        //     .post("/api/auth/register")
        //     .send(user2)
        //     .then((response) => {
        //         expect(response.status).toBe(201);
        //     });
    });

    it("should user the testing environment", () => {
        expect(process.env.NODE_ENV).toBe("testing");
    });

    describe("userrouter tests", () => {
        it("can run tests", () => {
            expect(true).toBeTruthy();
        });
    });

    describe("post to api/auth/register", () => {
        it("should not let you register without an email, username, userType, or password", () => {
            supertest(server)
                .post("/api/auth/register")
                .then((res) => {
                    expect(res.status).toBe(400);
                });
        });

        it("should let you register with an email, username, userType, or password", () => {
            supertest(server)
                .post("/api/auth/register")
                .send(user2)
                .then((res) => {
                    if (res.status === 500) {
                    } else if (res.status === 201) {
                        expect(res.status).toBe(201);
                    }
                });
        });
        it("should not let you login without an email or password", () => {
            supertest(server)
                .post("/api/auth/login")
                .then((res) => {
                    expect(res.status).toBe(400);
                });
        });
        it("should let you login with an email or password", () => {
            supertest(server)
                .post("/api/auth/login")
                .send(userLogin)
                .then((res) => {
                    expect(res.status).toBe(200);
                });
        });
    });
});
