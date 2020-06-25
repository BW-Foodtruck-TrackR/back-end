const db = require("../data/connection");
module.exports = {
    getUsers,
    findUser,
    findByUser,
    addUser,
    findByUserId,
    getOperators,
    getConsumers,
    getFavoriteTrucks,
    getOwnedTrucks,
    getUsersFavoriteTrucks,
    getOperatorsOwnedTrucks,
};

function getUsers() {
    return db("users").join("userType", "users.userType", "userType.id");
}
function getOperators() {
    return db("users")
        .join("userType", "users.userType", "userType.id")
        .where("users.userType", "2");
}
function getConsumers() {
    return db("users")
        .join("userType", "users.userType", "userType.id")
        .where("users.userType", "1");
}

function findUser() {
    return db("users").select("id", "username").orderBy("id");
}

function findByUser(filter) {
    return db("users").where("email", filter).orderBy("id");
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
    return db("users")
        .join("userType", "users.userType", "userType.id")
        .where("users.id", id)
        .first();
}

function getFavoriteTrucks() {
    return db("favoriteTrucks")
        .join("users", "favoriteTrucks.userID", "users.id")
        .join("trucks", "favoriteTrucks.truckID", "trucks.id")
        .join("userType", "users.userType", "userType.id");
}
function getOwnedTrucks() {
    return db("trucksOwned")
        .join("users", "trucksOwned.userID", "users.id")
        .join("trucks", "trucksOwned.truckID", "trucks.id")
        .join("userType", "users.userType", "userType.id");
}
function getUsersFavoriteTrucks(id) {
    return db("favoriteTrucks")
        .where("users.id", id)
        .join("users", "favoriteTrucks.userID", "users.id")
        .join("trucks", "favoriteTrucks.truckID", "trucks.id")
        .join("userType", "users.userType", "userType.id");
}
function getOperatorsOwnedTrucks(id) {
    return db("trucksOwned")
        .where("users.id", id)
        .join("users", "trucksOwned.userID", "users.id")
        .join("trucks", "trucksOwned.truckID", "trucks.id")
        .join("userType", "users.userType", "userType.id");
}
