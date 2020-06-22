const express = require("express");
const router = express();

const db = require("../allModel/allModel");

router.get("/", (req, res) => {
    return db.getUsers().then((users) => {
        console.log(users);
        res.status(200).json(users);
    });
});

module.exports = router;
