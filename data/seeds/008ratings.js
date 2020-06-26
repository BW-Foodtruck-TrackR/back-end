exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("foodRatings")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("foodRatings").insert([
                { menuID: 1, rating: 5 },
                { menuID: 1, rating: 4 },
                { menuID: 3, rating: 5 },
                { menuID: 1, rating: 3 },
                { menuID: 2, rating: 2 },
                { menuID: 1, rating: 4 },
                { menuID: 3, rating: 5 },
                { menuID: 1, rating: 3 },
                { menuID: 2, rating: 2 },
                { menuID: 2, rating: 4 },
            ]);
        });
};
