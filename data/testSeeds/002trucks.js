exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("trucks")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("trucks").insert([
                {
                    truckName: "taco truck",
                    image: "img.png",
                    cuisineType: "tacos",
                },
                {
                    truckName: "food truck",
                    image: "img.jpeg",
                    cuisineType: "food",
                },
                {
                    truckName: "nacho truck",
                    image: "img2.png",
                    cuisineType: "nacho",
                },
            ]);
        });
};
