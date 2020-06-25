exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("truckRatings")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("truckRatings").insert([
                { truckID: 1, rating: 5 },
                { truckID: 1, rating: 4 },
                { truckID: 3, rating: 5 },
                { truckID: 1, rating: 3 },
                { truckID: 2, rating: 2 },
                { truckID: 1, rating: 4 },
                { truckID: 3, rating: 5 },
                { truckID: 1, rating: 3 },
                { truckID: 2, rating: 2 },
                { truckID: 2, rating: 4 },
            ]);
        });
};
