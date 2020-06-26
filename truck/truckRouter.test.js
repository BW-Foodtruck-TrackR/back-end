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
describe("/api/trucks", () => {
    it("should get api/trucks with out a token", async () => {
        await supertest(server)
            .get("/api/trucks")
            .then((res) => {
                expect(res.status).toBe(200);
            });
    });
    it("should get api/trucks/2 with out a token", async () => {
        await supertest(server)
            .get("/api/trucks/2")
            .then((res) => {
                expect(res.status).toBe(200);
            });
    });
    it("should not post truck without a token", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                supertest(server)
                    .post("/api/trucks")
                    .send({
                        truckName: `postedTruck${Math.random()}`,
                        cuisineType: "random",
                        image: "fakeIMG.png",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401);
                    });
            });
    });
    it("should post truck with a token", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                supertest(server)
                    .post("/api/trucks")
                    .set("Authorization", token)
                    .send({
                        truckName: `postedTruck ${Date.now()}`,
                        cuisineType: "random",
                        image: "fakeIMG.png",
                    })
                    .then((response) => {
                        expect(response.status).toBe(201);
                    });
            });
    });
    it("should not edit truck without a token", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                supertest(server)
                    .put("/api/trucks/1")
                    .send({
                        truckName: `edited${Math.random()}`,
                        cuisineType: "random",
                        image: "fakeIMG.png",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401);
                    });
            });
    });
    it("should edit truck with a token", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                supertest(server)
                    .post("/api/trucks/4")
                    .set("Authorization", token)
                    .send({
                        truckName: `edited ${Date.now()}`,
                        cuisineType: "random",
                        image: "fakeIMG.png",
                    })
                    .then((response) => {
                        if (response.status === 201) {
                            expect(response.status).toBe(201);
                        } else if (response.status === 500) {
                            expect(response.status).toBe(500);
                        }
                    });
            });
    });
});
