exports.up = function (knex) {
    return knex.schema
        .createTable("favoriteTrucks", (tbl) => {
            tbl.increments();
            tbl.integer("truckID")
                .unsigned()
                .references("trucks.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.integer("userID")
                .unsigned()
                .references("users.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
        })
        .createTable("trucksOwned", (tbl) => {
            tbl.increments();
            tbl.integer("truckID")
                .unsigned()
                .references("trucks.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.integer("userID")
                .unsigned()
                .references("users.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("trucksOwned")
        .dropTableIfExists("favoriteTrucks");
};
