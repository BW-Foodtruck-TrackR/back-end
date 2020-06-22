const db = require("../../data/connection");
module.exports = {
    getUsers,
    findUser,
    findByUser,
    addUser,
    findByUserId,
};

function getUsers() {
    return db("Users");
}

function findUser() {
    return db("users").select("id", "username").orderBy("id");
}

function findByUser(filter) {
    return db("users").where(filter).orderBy("id");
}

async function addUser(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findByUserId(id);
    } catch (error) {
        throw error;
    }
}

function findByUserId(id) {
    return db("users").where({ id }).first();
}
