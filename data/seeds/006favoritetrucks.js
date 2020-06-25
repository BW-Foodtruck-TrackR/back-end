exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("favoriteTrucks")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("favoriteTrucks").insert([
                { truckID: 3, userID: 1 },
                { truckID: 2, userID: 1 },
            ]);
        });
};
