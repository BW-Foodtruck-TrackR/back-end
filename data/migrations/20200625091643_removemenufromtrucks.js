exports.up = function (knex) {
    return knex.schema.table("trucks", (tbl) => {
        tbl.dropColumn("menuItems");
    });
};

exports.down = function (knex) {
    return knex.schema.table("trucks", (tbl) => {
        tbl.string("menuItems");
    });
};
