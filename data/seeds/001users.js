exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("Users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("Users").insert([
                {
                    username: "name1",
                    password: "password",
                    currentLocation: "here",
                },
                {
                    username: "name2",
                    password: "password",
                    currentLocation: "there",
                },
            ]);
        });
};
