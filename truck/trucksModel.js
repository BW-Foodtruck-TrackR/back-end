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
    findCuisineType,
    getHigherRatings,
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
    return db("truckRatings")
        .join("trucks", "truckRatings.truckID", "trucks.id")
        .orderBy("rating", "DESC");
}
function getHigherRatings(number) {
    return (
        db("truckRatings")
            .where("rating", ">=", number)
            // .join("trucks", "truckRatings.truckID", "trucks.id")
            .orderBy("rating", "DESC")
    );
}

function findTruck() {
    return db("trucks").select("id", "truckName").orderBy("id");
}
function findCuisineType(filter) {
    return db("trucks").where({ cuisineType: filter });
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

function findByTruckId(id) {
    return db("trucks")
        .join(
            "truckCurrentLocation",
            "trucks.id",
            "truckCurrentLocation.truckID"
        )
        .where({ "trucks.id": id })
        .first();
}

function updateTruck(changes, id) {
    return db("trucks").where({ id }).first().update(changes);
}
function removeTruck(id) {
    return db("trucks").where({ id }).first().del();
}
