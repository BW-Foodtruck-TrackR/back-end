const db = require("../data/connection");
module.exports = {
    getMenuItems,
    findByMenuItemId,
    updateMenuItem,
    addMenuItem,
};

function getMenuItems() {
    return db("menu")
        .join("trucks", "menu.truckID", "trucks.id")
        .select(
            "menu.id",
            "menu.itemName",
            "menu.description",
            "menu.photos",
            "menu.price",
            "trucks.truckName",
            "menu.truckID"
        );
}

function findMenuItem() {
    return db("menu").select("id", "truckName").orderBy("id");
}

function findByMenuItem(filter) {
    return db("menu").where(filter).orderBy("id");
}

async function addMenuItem(menuItem) {
    try {
        const [id] = await db("menu").insert(menuItem, "id");

        return findByMenuItemId(id);
    } catch (error) {
        throw error;
    }
}

function findByMenuItemId(id) {
    return db("menu").where({ id }).first();
}

function updateMenuItem(changes, id) {
    return db("menu").where({ id }).first().update(changes);
}
function removeMenuItem(id) {
    return db("menu").where({ id }).first().del();
}
