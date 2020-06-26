exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("truckCurrentLocation")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("truckCurrentLocation").insert([
                {
                    departureTime: "19:30:00",
                    currentLocation: "Main St.",
                    truckID: 1,
                    departureDate: "2020-06-30",
                },
                {
                    departureTime: "20:00:00",
                    currentLocation: "South Main St.",
                    truckID: 2,
                    departureDate: "2020-06-30",
                },
                {
                    departureTime: "16:00:00",
                    currentLocation: "Main St.",
                    truckID: 3,
                    departureDate: "2020-06-30",
                },
            ]);
        });
};
