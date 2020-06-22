exports.up = function (knex) {
    return knex.schema.createTable("Menu", (tbl) => {
        tbl.increments();
        tbl.string("itemName", 128).notNullable();
        tbl.string("description", 256).notNullable();
        tbl.float("photos");
        tbl.decimal("price").notNullable();
        tbl.float("ratings");
        tbl.integer("averageRating");
        tbl.integer("truckID")
            .unsigned()
            .references("TruckOperators.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Menu");
};
