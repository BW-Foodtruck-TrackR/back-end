const db = require("../../data/connection");
module.exports = {
    getUsers,
};

function getUsers() {
    return db("Users");
}
