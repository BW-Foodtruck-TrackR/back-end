exports.up = function (knex) {
    return knex.schema
        .createTable("userType", (tbl) => {
            tbl.increments();
            tbl.string("userType").notNullable();
        })
        .createTable("truckCurrentLocation", (tbl) => {
            tbl.increments();
            tbl.time("departureTime").notNullable().index();
            tbl.string("currentLocation", 256).notNullable().index();
        })
        .createTable("menu", (tbl) => {
            tbl.increments();
            tbl.string("itemName").notNullable().index();
            tbl.string("description").notNullable();
            tbl.float("photos");
            tbl.decimal("price").notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("menu")
        .dropTableIfExists("truckCurrentLocation")
        .dropTableIfExists("userType");
};
