const db = require("../data/connection");
module.exports = {
    getTrucks,
    findTruck,
    findByTruck,
    addTruck,
    findByTruckId,
    updateTruck,
    removeTruck,
};

function getTrucks() {
    return db("trucks");
}

function findTruck() {
    return db("trucks").select("id", "truckName").orderBy("id");
}

function findByTruck(filter) {
    return db("trucks").where(filter).orderBy("id");
}

async function addTruck(truck) {
    try {
        const [id] = await db("trucks").insert(truck, "id");

        return findByTruckId(id);
    } catch (error) {
        throw error;
    }
}

function findByTruckId(id) {
    return db("trucks").where({ id }).first();
}

function updateTruck(changes, id) {
    return db("trucks").where({ id }).first().update(changes);
}
function removeTruck(id) {
    return db("trucks").where({ id }).first().del();
}
