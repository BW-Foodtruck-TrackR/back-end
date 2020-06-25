exports.up = function (knex) {
    return knex.schema.createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
        tbl.string("email", 256).notNullable().unique().index();
        tbl.integer("userType")
            .unsigned()
            .references("userType.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.string("currentLoaction");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
