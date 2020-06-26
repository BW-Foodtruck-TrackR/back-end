exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("userType")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("userType").insert([
                { userType: "user" },
                { userType: "operator" },
            ]);
        });
};
