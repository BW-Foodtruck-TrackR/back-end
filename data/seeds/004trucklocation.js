exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("truckCurrentLocation")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("truckCurrentLocation").insert([
                {
                    departureTime: "19:30:00",
                    location: "Main St.",
                    truckID: 1,
                },
                {
                    departureTime: "20:00:00",
                    location: "South Main St.",
                    truckID: 2,
                },
                {
                    departureTime: "16:00:00",
                    location: "Main St.",
                    truckID: 3,
                },
            ]);
        });
};
