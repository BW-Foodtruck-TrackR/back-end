exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    username: "diner",
                    password: "password",
                    userType: "1",
                    email: "email@email.com",
                },
                {
                    username: "operator",
                    password: "password",
                    userType: "2",
                    email: "email2@email.com",
                },
            ]);
        });
};
