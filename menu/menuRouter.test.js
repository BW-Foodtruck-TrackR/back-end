/**
 * @jest-environment node
 */

const supertest = require("supertest");
const server = require("../api/server");
const newUser = { email: "testing", password: "password" };
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
beforeAll(async () => {
    await db("favoriteTrucks").truncate();
    await db("trucksOwned").truncate();

    await supertest(server).post("/api/auth/register").send(user);

    await supertest(server)
        .post("/api/auth/login")
        .send(userLogin)
        .then((response) => {
            let token = response.body.token;

            supertest(server)
                .post("/api/menu")
                .set("Authorization", token)
                .send({
                    itemName: "taco",
                    description: "taco meat in taco shell",
                    price: 1.5,
                });
        });
});
it("should user the testing environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
});
describe("/api/menu", () => {
    // afterEach(async () => {
    //     await db("menu").truncate();
    // });

    it("should get api/menu with out a token", async () => {
        await supertest(server)
            .get("/api/menu")
            .then((res) => {
                expect(res.status).toBe(200);
            });
    });
    it("should get api/menu/2 with out a token", async () => {
        await supertest(server)
            .get("/api/menu/2")
            .then((res) => {
                expect(res.status).toBe(200);
            });
    });

    it("should not post with a token", async () => {
        let menu = await supertest(server)
            .post("/api/menu")
            .send({
                itemName: "Posted Food",
                description: "this food has been posted.",
                price: "2.11",
            })
            .set("Authorization", "notAuthorized")
            .then((res) => {
                expect(res.status).toBe(401);
                expect(res.status).not.toBe(201);
            });
    });
    it("should post menu item with a token", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                supertest(server)
                    .post("/api/menu")
                    .set("Authorization", token)
                    .send({
                        truckName: `new food posted ${Date.now()}`,
                        cuisineType: "random",
                        img: "fakeIMG.png",
                    })
                    .then((response) => {
                        expect(response.status).toBe(201);
                    });
            });
    });

    it("should not edit with a token", async () => {
        let menu = await supertest(server)
            .put("/api/menu/50")
            .send({
                itemName: "Editing Food",
                description: "this food has been notedited.",
                price: "2.11",
            })
            .set("Authorization", "notAuthorized")
            .then((res) => {
                expect(res.status).toBe(401);
                expect(res.status).not.toBe(201);
            });
    });
    it("should edit menu with a token", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                // supertest(server)
                //     .post("/api/menu")
                //     .set("Authorization", token)
                //     .send({
                //         itemName: "new Food",
                //         description: "this food has been not edited.",
                //         price: "2.11",
                //     });
                supertest(server)
                    .post("/api/menu/1")
                    .set("Authorization", token)
                    .send({
                        itemName: "Editing Food",
                        description: "this food has been edited.",
                        price: "2.11",
                    })
                    .then((response) => {
                        expect(response.status).toBe(201);
                        expect(response.status).not.toBe(404);
                    });
            });
    });

    it("should not delete with out a token", async () => {
        let menu = await supertest(server)
            .delete("/api/menu/1")

            .set("Authorization", "notAuthorized")
            .then((res) => {
                expect(res.status).toBe(401);
                expect(res.status).not.toBe(201);
            });
    });

    it("should get menu ratings", async () => {
        await supertest(server)
            .post("/api/auth/login")
            .send(userLogin)
            .then((response) => {
                let token = response.body.token;
                supertest(server)
                    .get("/api/menu/ratings")
                    .set("Authorization", token)
                    .then((response) => {
                        expect(response.status).toBe(200);
                    });
            });
    });
});
