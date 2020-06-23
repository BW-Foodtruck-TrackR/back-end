exports.up = function (knex) {
    return knex.schema.createTable("trucks", (tbl) => {
        tbl.increments();
        tbl.string("truckName", 128).notNullable();
        tbl.float("image");
        tbl.string("cuisineType", 128).notNullable();
        tbl.integer("menuItem")
            .unsigned()
            .references("menu.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.integer("currentLocation")
            .unsigned()
            .references("truckCurrentLocation.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("trucks");
};
