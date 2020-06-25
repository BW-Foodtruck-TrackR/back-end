const db = require("../data/connection");
module.exports = {
    getTrucks,
    findTruck,
    findByTruck,
    addTruck,
    findByTruckId,
    updateTruck,
    removeTruck,
    getRatings,
};

function getTrucks() {
    return db("trucks")
        .join(
            "truckCurrentLocation",
            "trucks.id",
            "truckCurrentLocation.truckID"
        )
        .orderBy("trucks.id");
}
function getRatings() {
    return db("truckRatings").join(
        "trucks",
        "truckRatings.truckID",
        "trucks.id"
    );
}

function findTruck() {
    return db("trucks").select("id", "truckName").orderBy("id");
}

function findByTruck(filter) {
    return db("trucks")
        .where(filter)
        .orderBy("id")
        .join(
            "truckCurrentLocation",
            "trucks.id",
            "truckCurrentLocation.truckID"
        );
}

async function addTruck(truck) {
    try {
        const [id] = await db("trucks").insert(truck, "id");

        return findByTruckId(id);
    } catch (error) {
        throw error;
    }
}
function addTruckETA(eta, id) {
    findByTruckId(id);
}

function findByTruckId(id) {
    return (
        db("trucks")
            // .join(
            //     "truckCurrentLocation",
            //     "trucks.id",
            //     "truckCurrentLocation.truckID"
            // )
            .where({ "trucks.id": id })
            .first()
    );
}

function updateTruck(changes, id) {
    return db("trucks").where({ id }).first().update(changes);
}
function removeTruck(id) {
    return db("trucks").where({ id }).first().del();
}
