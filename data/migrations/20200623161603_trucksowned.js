exports.up = function (knex) {
    return knex.schema.table("truckCurrentLocation", (tbl) => {
        tbl.integer("truckID")
            .unsigned()
            .references("trucks.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.table("truckCurrentLocation", (tbl) => {
        tbl.dropColumn("truckID");
    });
};
