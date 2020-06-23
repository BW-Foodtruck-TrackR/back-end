exports.up = function (knex) {
    return knex.schema.createTable("Recipes", (tbl) => {
        tbl.increments("RecipeID");
        tbl.string("Recipe").notNullable().index();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Recipes");
};
