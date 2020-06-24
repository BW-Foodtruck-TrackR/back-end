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
router.get("/operator", tokenRequired, (req, res) => {
    return db.getOperators().then((users) => {
        console.log(users);
        res.status(200).json(users);
    });
});
router.get("/users", tokenRequired, (req, res) => {
    return db.getConsumers().then((users) => {
        console.log(users);
        res.status(200).json(users);
    });
});

module.exports = router;
