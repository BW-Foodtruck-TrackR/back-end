exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("trucksOwned")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("trucksOwned").insert([
                { truckID: 1, userID: 2 },
                { truckID: 2, userID: 2 },
                { truckID: 3, userID: 2 },
            ]);
        });
};
