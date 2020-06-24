exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("menu")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("menu").insert([
                {
                    itemName: "taco",
                    description: "taco meat in taco shell",
                    price: 1.5,
                    truckID: 1,
                },
                {
                    itemName: "spcied food",
                    description: "cooked food with spices",
                    price: 1.5,
                    truckID: 3,
                },
                {
                    itemName: "chicken taco",
                    description: "chicken meat in taco shell",
                    price: 1.5,
                    truckID: 1,
                },
            ]);
        });
};
