exports.up = function (knex) {
    return knex.schema
        .createTable("userType", (tbl) => {
            tbl.increments();
            tbl.string("userType").notNullable();
        })
        .createTable("truckCurrentLocation", (tbl) => {
            tbl.increments();
            tbl.datetime("departureTime").notNullable().index();
            tbl.float("location").notNullable().index();
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
