exports.up = function (knex) {
    return knex.schema.table("menu", (tbl) => {
        tbl.integer("truckID")
            .unsigned()
            .references("trucks.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    knex.schema.dropColumn("menu.truckID");
};
