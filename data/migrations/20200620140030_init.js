exports.up = function (knex) {
    knex.schema
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

exports.down = function (knex) {};
