exports.up = function (knex) {
    return knex.schema
        .createTable("Users", (tbl) => {
            tbl.increments();
            tbl.string("username", 128).notNullable().unique().index();
            tbl.string("password", 256).notNullable();
            tbl.string("currentLocation");
        })
        .createTable("TruckOperators", (tbl) => {
            tbl.increments();
            tbl.string("username", 128).notNullable().unique().index();
            tbl.string("password", 256).notNullable();
            tbl.string("trucksOwned").index();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("TruckOperators")
        .dropTableIfExists("Users");
};
