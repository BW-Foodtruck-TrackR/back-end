const express = require("express");
const router = express();

const db = require("./menuModel");

router.get("/", (req, res) => {
    return db.getMenuItems().then((food) => {
        console.log(food);
        res.status(200).json(food);
    });
});

module.exports = router;
