exports.up = function (knex) {
    return knex.schema
        .createTable("foodRatings", (tbl) => {
            tbl.increments();
            tbl.integer("menuID")
                .unsigned()
                .references("menu.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.integer("rating");
        })
        .createTable("truckRatings", (tbl) => {
            tbl.increments();
            tbl.integer("truckID")
                .unsigned()
                .references("trucks.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.integer("rating");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("truckRatings")
        .dropTableIfExists("foodRatings");
};
