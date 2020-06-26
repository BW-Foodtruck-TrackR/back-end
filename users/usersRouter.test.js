/**
 * @jest-environment node
 */

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

userLogin = {
    email: "email6@email.com",
    password: "password",
};
beforeAll(async () => {
    await db("favoriteTrucks").truncate();
    await db("trucksOwned").truncate();

    await supertest(server).post("/api/auth/register").send(user);

    await supertest(server).post("/api/auth/login").send(userLogin);
    // .then((response) => {
    //     let token = response.body.token;
    //     return token;
    // });
});
it("should user the testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
});

it("should get user by id", async () => {
    await supertest(server)
        .post("/api/auth/login")
        .send(userLogin)
        .then((response) => {
            let token = response.body.token;
            supertest(server)
                .get("/api/users/3")

                .set("Authorization", token)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.status).not.toBe(201);
                });
        });
});
it("should get users favorite trucks by id", async () => {
    await supertest(server)
        .post("/api/auth/login")
        .send(userLogin)
        .then((response) => {
            let token = response.body.token;
            supertest(server)
                .get("/api/users/1/favTrucks")

                .set("Authorization", token)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.status).not.toBe(201);
                });
        });
});
it("should get users owned trucks by id", async () => {
    await supertest(server)
        .post("/api/auth/login")
        .send(userLogin)
        .then((response) => {
            let token = response.body.token;
            supertest(server)
                .get("/api/users/1/ownedTrucks")

                .set("Authorization", token)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.status).not.toBe(201);
                });
        });
});
it("should get users owned trucks by id", async () => {
    await supertest(server)
        .post("/api/auth/login")
        .send(userLogin)
        .then((response) => {
            let token = response.body.token;
            supertest(server)
                .get("/api/users/users")

                .set("Authorization", token)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.status).not.toBe(201);
                });
        });
});
it("should get users owned trucks by id", async () => {
    await supertest(server)
        .post("/api/auth/login")
        .send(userLogin)
        .then((response) => {
            let token = response.body.token;
            supertest(server)
                .get("/api/users/operator")

                .set("Authorization", token)
                .then((response) => {
                    expect(response.status).toBe(200);
                    expect(response.status).not.toBe(201);
                });
        });
});
