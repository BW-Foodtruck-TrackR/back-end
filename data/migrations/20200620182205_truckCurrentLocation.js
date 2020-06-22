exports.up = function (knex) {
    return knex.schema.createTable("CurrentLocationOfTruck", (tbl) => {
        tbl.increments();
        tbl.string("location").index();
        tbl.string("departureTime");
        tbl.integer("truckID")
            .unsigned()
            .references("TruckOperators.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("CurrentLocationOfTruck");
};
