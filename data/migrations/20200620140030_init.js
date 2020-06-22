exports.up = function (knex) {
    return knex.schema
        .createTable("userType", (tbl) => {
            tbl.increments();
            tbl.integer("userType").notNullable();
        })
        .createTable("Users", (tbl) => {
            tbl.increments();
            tbl.string("username", 128).notNullable().unique().index();
            tbl.string("password", 256).notNullable();
            tbl.string("currentLocation");
            tbl.integer("userOrOperator")
                .unsigned()
                .references("userType.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.integer("favoriteTrucks")
                .unsigned()
                .references("TruckOperators.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.string("trucksOwned")
                .index()
                .unsigned()
                .references("TruckOperators.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
        })
        .createTable("TruckOperators", (tbl) => {
            tbl.increments();
            tbl.string("username", 128).notNullable().unique().index();
            tbl.string("password", 256).notNullable();
            tbl.string("trucksOwned")
                .index()
                .unsigned()
                .references("TruckOperators.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
            tbl.integer("userOrOperator")
                .unsigned()
                .references("userType.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("TruckOperators")
        .dropTableIfExists("Users")
        .dropTableIfExists("userType");
};
