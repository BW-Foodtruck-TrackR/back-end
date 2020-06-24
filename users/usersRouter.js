const express = require("express");
const router = express();
const tokenRequired = require("../auth/tokenRequired");
const db = require("./usersModel");

router.get("/", tokenRequired, (req, res) => {
    return db.getUsers().then((users) => {
        console.log(users);
        res.status(200).json(users);
    });
});

module.exports = router;
